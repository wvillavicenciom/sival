'use strict';

AppCollFly.controller("BusquedaCliente", ['$scope', 'Message', 'MsgData', 'Call', 'Moment', '$http', 'Loading', '$q',
    function ($scope, Message, MsgData, Call, Moment, $http, Loading, $q, TaGeneric) {

        $scope.NameController = "/Seguridad/Usuario";
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
           var parametros = {
                pUsuario: $scope.txtDocumento
            };


            Loading.LoadingShow(MsgData.Cargando);

            Call.Get('/Administracion/Cliente/ClienteListar', parametros, $scope.EstablecerClientes);

            //$scope.CargarListado();

        });

        //obteniendo el tamaño del div del contenedor
        var vHeigth = $('body').height(); //del tamaño que ocupa el menu y las detalles
        var vHeigthHeader = $('#header-main').height();
        var vHeigthNavBar = $('#navbar-main').height();
        var total = vHeigth - vHeigthHeader - vHeigthNavBar - 40;


        $scope.EstablecerClientes = function (response) {

            //console.log("Clientes Encontrados");
            //console.log(response);

            $scope.oCliente_Sel = response[0];
            
            var taClientes =  $('#taClientes').DataTable({
                 data: response,
                 responsive: true,
                searching: false,
                select: true,
                 buttons: [
                     'copy', 'excel', 'pdf'
                 ],
                 columns: [
                     { data: 'id_cliente' },
                    { data: 'documento' },
                    { data: 'apellido_paterno' },
                     { data: 'apellido_materno' },
                     { data: 'nombres' },
                     { data: 'contratos' },
                     { data: 'mto_financiado' },
                     { data: 'mto_saldo' },
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


            $('#taClientes tbody').on('click', 'a', function () {
                var data = taClientes.row($(this).parents('tr')).data();
                //alert(data["documento"] + "'s ID is: " + data["id_cliente"]);

                Message.Confirm("Confirmar Acción", "¿Desea editar el cliente?", $scope.ConfirEditarAceptar,null, data);

            });


            taClientes.on('select', function (e, dt, type, indexes) {
                if (type === 'row') {
                    var data = taClientes.rows(indexes).data();

                    if (data.length > 0) {

                        $scope.oCliente_Sel = data[0];
                        $scope.MostrarClienteDetalle($scope.oCliente_Sel);
                    }
                }
            });

            Loading.LoadingClose();
        }

        $scope.ConfirEditarAceptar = function (pCliente) {

            if (pCliente != null) {
                var vIdCliente = pCliente["id_cliente"];
                Call.Redirect(vgUrlClienteRegistro + "?id_cliente=" + vIdCliente);
            }
            

        }

        $scope.MostrarClienteDetalle = function (pCliente) {

            $scope.LimpiarDatosDetalle();
            if (pCliente != null) {
                //alert("Cliente" + pCliente.documento);
                $scope.laNombreCompleto = pCliente.apellido_paterno + " " + pCliente.apellido_materno + " " + pCliente.nombres;
                $scope.laDocumento = pCliente.documento;
                $scope.laFechaNacimiento = pCliente.fecha_nacimiento;
                $scope.laTelefono = pCliente.telefono;
                $scope.laEmail = pCliente.email;
                $scope.laEstado = "";
                $scope.laContrato = pCliente.contratos;
                $scope.laFinanciamiento = pCliente.mto_financiado;
                $scope.laSaldo = pCliente.mto_saldo;
                $scope.laCuota = pCliente.mto_cuota;
                $scope.laCuotasMorosas = pCliente.cuotas_morosas;
                $scope.laUltimoVencimiento = pCliente.fecha_ultimo_vencimiento;

                $scope.$apply();
            }


        }

        $scope.LimpiarDatosDetalle = function () {

            $scope.laNombreCompleto = "";
            $scope.laDocumento = "";
            $scope.laFechaNacimiento = "";
            $scope.laTelefono = "";
            $scope.laEmail = "";
            $scope.laEstado = "";
            $scope.laContrato = "";
            $scope.laFinanciamiento = "";
            $scope.laSaldo = "";
            $scope.laCuota = "";
            $scope.laCuotasMorosas = "";
            $scope.laUltimoVencimiento = "";
        }


         /*
        $scope.CargarListado = function () {
         
            $("#jsClientes").jsGrid({
                height: "400px",
                width: "100%",
                autoload: true,
                inserting: true,
                editing: true,
                deleting: true,
                sorting: true,
                paging: true,
                pageIndex: 1,
                pageSize: 15,
                pageButtonCount: 5,
                updateOnResize: true,
                loadIndication: true,
                loadIndicationDelay: 500,
                loadMessage: "Espere, Por favor...",
                loadShading: true,
                noDataContent: "Sin datos",
                deleteConfirm: function (item) {
                    return "¿Desea eliminar el registro?";
                },
                controller: {
                    loadData: function () {
                        var parametros = {
                            pUsuario: $scope.txtDocumento
                        };
                        var config = {
                            params: parametros,
                            headers: { 'Accept': 'application/json' }
                        };
                        var d = $.Deferred();
                        $http.get('/Administracion/Cliente/ClienteListar', config)
                            .then(function (response) {
                                var dt = response.data; //[];
                                d.resolve(dt);
                            }, function (response) {
                                Loading.LoadingClose();
                            });
                        return d.promise();
                    }
                },
                loadIndicator: function (config) {
                    return {
                        show: function () {
                            Loading.LoadingShow(MsgData.Cargando);
                        },
                        hide: function () {
                            Loading.LoadingClose();
                        }
                    };
                },
                fields: [
                    { title: "#", name: "id_cliente", type: "text", width: 30, align: "center", valueType: "number", headercss: "titleCenter", editing: false },
                    { title: "Documento", name: "documento", type: "text", width: 120, align: "left", valueType: "number", headercss: "titleCenter", editing: true },
                    { title: "Ape. Paterno", name: "apellido_paterno", type: "text", align: "center", valueType: "number", headercss: "titleCenter", editing: true },
                    { title: "Ape. Materno", name: "apellido_materno", type: "text", align: "center", valueType: "number", headercss: "titleCenter", editing: true },
                    { title: "Nombres", name: "nombres", type: "checkbox", sorting: false },
                    { title: "Activo", name: "activo", type: "checkbox", sorting: false },
                    { type: "control", editButton: true, deleteButton: true, modeSwitchButton: true }
                ]
            });
            

        }
        */



    }]);