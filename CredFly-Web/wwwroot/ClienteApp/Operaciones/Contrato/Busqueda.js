'use strict';

AppCredFly.controller("BusquedaOperaciones", ['$scope', 'Message', 'MsgData', 'Call', 'Moment', '$http', 'Loading', '$q',
    function ($scope, Message, MsgData, Call, Moment, $http, Loading, $q, TaGeneric) {

        $scope.NameController = "/Operaciones/Contrato";
        $scope.idModulo = 99;
        $scope.idSubModulo = 1;
        $scope.idOpcion = 1;

        //variables para habilitar o desabilitar permisos
        $scope.HabilitaVer = false;
        $scope.HabilitaNuevo = false;
        $scope.HabilitaActualizar = false;
        $scope.HabilitaEliminar = false;
        $scope.HabilitaExportar = false;

        $scope.title_form = "Login";
        $scope.rbtPlan = 0;

        $(document).ready(function () {

            /*
            var parametros = {
                pIdCliente : 0,
                pIdentContrato : $scope.txtIdentContrato,
                pDocumento : $scope.txtDocumento,
                pApellidoPaterno : $scope.txtApellidoPaterno,
                pFechaInicio : $scope.txtFechaInicio,
                pFechaFin : $scope.txtFechaFin
            };

            Call.Get('/Operaciones/Contrato/ContratosListar', parametros, $scope.EstablecerContratos);
            */

        });

        //obteniendo el tamaño del div del contenedor
        var vHeigth = $('body').height(); //del tamaño que ocupa el menu y las detalles
        var vHeigthHeader = $('#header-main').height();
        var vHeigthNavBar = $('#navbar-main').height();
        var total = vHeigth - vHeigthHeader - vHeigthNavBar - 40;

        $scope.btnBuscar = function () {

            //var parametros = {
            //    pUsuario: $scope.txtUsuario == undefined ? '' : $scope.txtUsuario,
            //    pClave: $scope.txtClave == undefined ? '' : $scope.txtClave
            //};
            //
            //if ((parametros.pUsuario == '' || parametros.pUsuario.length < 7)) {
            //    Message.AlertError("Alerta", "Debe ingresar usuario");
            //    return;
            //}
            //
            //if ((parametros.pClave == '' || parametros.pClave.length < 7)) {
            //    Message.AlertError("Alerta", "Debe Ingresar clave");
            //    return;
            //}            
            //
            //Loading.LoadingShow("Iniciando Sesión, por favor espere!");
            //Call.Get($scope.NameController + '/ValidarInicio', parametros, $scope.EstablecerLogin);
            Call.Redirect("/Operaciones/Contrato/RegistroOperacion");
        }
        

        $scope.EstablecerContratos = function (response) {

            var taClientes = $('#taContratos').DataTable({
                data: response,
                responsive: true,
                searching: false,
                select: true,
                buttons: [
                    'copy', 'excel', 'pdf'
                ],
                columns: [
                    { data: 'id_contrato' },
                    { data: 'ident_contrato' },
                    { data: 'mto_precio_bien' },
                    { data: 'mto_inicial_bien' },
                    { data: 'mto_financiado' },
                    { data: 'plazo' },
                    { data: 'tea' },
                    { data: 'mto_financiado' },
                    {
                        /*targets: -1,*/
                        data: null,
                        defaultContent: '<a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2 align-middle"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg></a>'
                    }
                ]/*,
                 columnDefs: [
                     {
                         targets: -1,
                         data: null,
                         defaultContent: '<button>Click!</button>',
                     },
                 ],*/
            });


            $('#taContratos tbody').on('click', 'a', function () {
                var data = taClientes.row($(this).parents('tr')).data();
                //alert(data["documento"] + "'s ID is: " + data["id_cliente"]);
                $scope.vgContratoSelec = data["ident_contrato"];
                $("#moContrato").modal('show');

                $scope.MostrarContrato(data);

                
            });


            /*taClientes.on('select', function (e, dt, type, indexes) {
                if (type === 'row') {
                    var data = taClientes.rows(indexes).data();

                    if (data.length > 0) {

                        $scope.oCliente_Sel = data[0];
                        $scope.MostrarClienteDetalle($scope.oCliente_Sel);
                    }
                }
            });*/

        }

        $scope.MostrarContrato = function (pContrato) {

            $scope.LimpiarDatos();

            $scope.vgContratoSelec = pContrato["ident_contrato"];
            $scope.vgIdContratoSelec = pContrato["id_contrato"];

            $scope.CargarCronograma($scope.vgIdContratoSelec);

            $scope.txtDocumento = "";
            $scope.txtapellidoPaterno = "";
            $scope.txtApellidoMaterno = "";
            $scope.txtNombres = "";
            $scope.txtMontoFechaNacimiento = "";
            $scope.txtMontoPrecio = pContrato.mto_precio_bien;
            $scope.txtMontoInicial = pContrato.mto_inicial_bien;
            $scope.txtPorcInicial = pContrato.porc_inicial;
            $scope.txtMontoGastos = pContrato.mto_gasto;
            $scope.txtMontoFinanciado = pContrato.mto_financiado;
            $scope.txtFechaActivacion = pContrato.fecha_activacion;
            $scope.txtPlazo = pContrato.plazo;
            $scope.txtTEA = pContrato.tea;

            $scope.$apply();
        }

        $scope.LimpiarDatos = function () {

            $scope.txtDocumento = "";
            $scope.txtapellidoPaterno = "";
            $scope.txtApellidoMaterno = "";
            $scope.txtNombres = "";
            $scope.txtMontoFechaNacimiento = "";
            $scope.txtMontoPrecio = "";
            $scope.txtMontoInicial = "";
            $scope.txtPorcInicial = "";
            $scope.txtMontoGastos = "";
            $scope.txtMontoFinanciado = "";
            $scope.txtFechaActivacion = "";
            $scope.txtPlazo = "";
            $scope.txtTEA = "";

            $scope.$apply();
        }

        $scope.CargarCronograma = function (pIdCrontrato) {

            var parametros = {
                pIdContrato: pIdCrontrato,
            };

            Call.Get('/Operaciones/Contrato/CronogramaListar', parametros, $scope.MostrarCronograma);

        }

        $scope.MostrarCronograma = function (response) {



            $scope.oListaCronograma = response;

            var taCronograma = $('#taCronograma').DataTable({
                data: response,
                responsive: true,
                searching: false,
                select: true,
                buttons: [
                    'copy', 'excel', 'pdf'
                ],
                columns: [
                    { data: 'nro_cuota' },
                    { data: 'fecha_vencimiento' },
                    { data: 'mto_capital' },
                    { data: 'mto_interes' },
                    { data: 'mto_desgravamen' },
                    { data: 'mto_portes' },
                    { data: 'mto_otros' },
                    { data: 'mto_cuota' },
                    { data: 'estado' },
                    { data: 'fecha_pago' },
                    { data: 'mto_mora' },
                    { data: 'mto_total_pagar' },
                    { data: 'banco' },
                    { data: 'comentario' },
                    { data: 'comentario_pago' },
                    /*{
                        targets: -1,
                        data: null,
                        defaultContent: '<a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2 align-middle"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg></a>'
                    }*/
                ]/*,
                 columnDefs: [
                     {
                         targets: -1,
                         data: null,
                         defaultContent: '<button>Click!</button>',
                     },
                 ],*/
            });

        }




    }]);