'use strict';

AppCollFly.controller("RegistroCliente", ['$scope', 'Message', 'MsgData', 'Call', 'Moment', '$http', 'Loading', '$q',
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


        $scope.oListaTipoDocumento = [{ id_combo: 0, nombre: "<--Seleccione-->" }, { id_combo: 1, nombre: "DNI" }, { id_combo: 2, nombre: "C.E" }];
        $scope.oListaGenero = [{ id_combo: 0, nombre: "<--Seleccione-->" }, { id_combo: 1, nombre: "Masculino" }, { id_combo: 2, nombre: "Femenino" }];
        $scope.oListaEstadoCivil = [{ id_combo: 0, nombre: "<--Seleccione-->" }, { id_combo: 1, nombre: "Soltero" }, { id_combo: 2, nombre: "Casado" }, { id_combo: 3, nombre: "Divorsiado" }, { id_combo: 4, nombre: "Viudo" }];

        $scope.oListaDepartamento = [{ id_combo: 0, nombre: "<--Seleccione-->" }];
        $scope.oListaProvincia = [{ id_combo: 0, nombre: "<--Seleccione-->" }];
        $scope.oListaDistrito = [{ id_combo: 0, nombre: "<--Seleccione-->" }];

        $scope.oListaMoneda = [{ id_combo: 0, nombre: "<--Seleccione-->" }, { id_combo: 1, nombre: "Soles" }, { id_combo: 2, nombre: "Dólares" }];
        $scope.oListaEstadoOperacion = [{ id_combo: 0, nombre: "<--Seleccione-->" }];


        $scope.ddlTipoDocumento = $scope.oListaTipoDocumento[0];
        $scope.ddlGenero = $scope.oListaGenero[0];
        $scope.ddlEstadoCivil = $scope.oListaEstadoCivil[0];

        $scope.ddlDepartamento = $scope.oListaDepartamento[0];
        $scope.ddlProvincia = $scope.oListaProvincia[0];
        $scope.ddlDistrito = $scope.oListaDistrito[0];

        $scope.ddlMoneda = $scope.oListaMoneda[0];
        $scope.ddlEstadoOperacion = $scope.oListaEstadoOperacion[0];

        $(document).ready(function () {

            //Varificar Permisos
            Call.Get('/Seguridad/Generico/TipoDocumentoCombo', null, $scope.EstablecerListaTipoDocumento);

            //Genero
            Call.Get('/Seguridad/Generico/GeneroCombo', null, $scope.EstablecerListaGenero);

            //EstadoCivil
            Call.Get('/Seguridad/Generico/EstadoCivilCombo', null, $scope.EstablecerListaEstadoCivil);

            //Departamento
            Call.Get('/Seguridad/Generico/DepartamentoCombo', null, $scope.EstablecerListaDepartamento);



            /*$('#taContratos').DataTable({
                ajax: '../ajax/data/arrays.txt',
            });

            $('#taGestiones').DataTable({
                ajax: '../ajax/data/arrays.txt',
            });

            $('#taGestionesAutomaticas').DataTable({
                ajax: '../ajax/data/arrays.txt',
            });
            */


            var strParametro = location.search.replace('?', '');
            var arParametros = strParametro.split('&');

            if (arParametros.length > 0) {
                var vIdCliente = arParametros[0].split("=")[1];
                $scope.ident_cliente_sel = vIdCliente;

                //Si esque existe el trato se obtiene los datos de la cotización ya registrada
                if (vIdCliente > 0) {
                    //Loading.LoadingShow("Cargando datos del trato, por favor espere!");
                    //var parEdit = { pTrato: $scope.ident_trato};
                    //Call.Get($scope.NameController + '/ObtenerTrato', parEdit, $scope.EstablecerEditarTrato);
                    Loading.LoadingShow("Cargando datos del trato, por favor espere!");
                    setTimeout($scope.btnEditar, 2000);
                }


            }

        });

        $scope.btnNuevoContrato = function () {

            $scope.vgTituloModalContrato = "Registro de Contrato"
            $("#moContrato").modal("show");

        }
      
        $scope.btnNuevaGestion = function () {

            $scope.vgTituloModalGestiones = "Registro de Gestión"
            $("#moGestiones").modal("show");

        }

        $scope.btnCargarProvincia = function () {
            var pIdDepartamento = $scope.ddlDepartamento.id;
            var param = { pIdDepartamento: pIdDepartamento };
            //Message.AlertInfo("Información", "Seleccionado " + pIdDepartamento);
            Call.Get('/Seguridad/Generico/ProvinciaCombo', param , $scope.EstablecerListaProvincia);
        }

        $scope.btnCargarDistrito = function () {
            var pIdDepartamento = $scope.ddlDepartamento.id;
            var pIdProvincia = $scope.ddlProvincia.id;
            var param = { pIdDepartamento: pIdDepartamento, pIdProvincia : pIdProvincia };
            //Message.AlertInfo("Información", "Seleccionado Provincia" + pIdProvincia);
            Call.Get('/Seguridad/Generico/DistritoCombo', param, $scope.EstablecerListaDistrito);
        }

        $scope.btnEditar = function () {

            var param = { pIdCliente: $scope.ident_cliente_sel };
            
            Call.Get('/Administracion/Cliente/ClienteObtener', param, $scope.EstablecerDatosCliente);

            
        }

        $scope.btnCargarContratos = function () {
            var param = { pIdCliente: $scope.ident_cliente_sel };

            Call.Get('/Operaciones/Contrato/ContratosListar', param, $scope.EstablecerListaContratos);
        }

        $scope.btnCargarTelefonos = function () {
            var param = { pIdCliente: $scope.ident_cliente_sel };

            Call.Get('/Administracion/Cliente/TelefonoListar', param, $scope.EstablecerListaTelefonos);
        }

        $scope.btnCargarCorreos = function () {
            var param = { pIdCliente: $scope.ident_cliente_sel };

            Call.Get('/Administracion/Cliente/CorreoListar', param, $scope.EstablecerListaCorreos);
        }

        $scope.btnCargarDirecciones = function () {
            var param = { pIdCliente: $scope.ident_cliente_sel };

            Call.Get('/Administracion/Cliente/DireccionListar', param, $scope.EstablecerListaDirecciones);
        }


        $scope.btnCargarGestiones = function () {
            //var param = { pIdCliente: $scope.ident_cliente_sel };
            //
            //Call.Get('/Cobranza/Gestiones/GestionesUsuariosListar', param, $scope.EstablecerListaGestionesUsuarios);
        }

        $scope.btnCargarGestionesAutomaticas = function () {
            //var param = { pIdCliente: $scope.ident_cliente_sel };
            //
            //Call.Get('/Cobranza/Gestiones/GestionesAutomaticasListar', param, $scope.EstablecerListaGestionesAutomaticas);
        }

        $scope.btnCargarConfiguraciones = function () {
            //var param = { pIdCliente: $scope.ident_cliente_sel };
            //
            //Call.Get('/Administracion/Cliente/ClienteObtener', param, $scope.EstablecerConfiguraciones;
        }

        $scope.EstablecerListaTipoDocumento = function (response) {

            $scope.oListaTipoDocumento = response;
            $scope.ddlTipoDocumento = $scope.oListaTipoDocumento[0];

        }

        $scope.EstablecerListaGenero = function (response) {

            $scope.oListaGenero = response;
            $scope.ddlGenero = $scope.oListaGenero[0];
        }

        $scope.EstablecerListaEstadoCivil = function (response) {

            $scope.oListaEstadoCivil = response;
            $scope.ddlEstadoCivil = $scope.oListaEstadoCivil[0];

        }

        $scope.EstablecerListaDepartamento = function (response) {

            $scope.oListaDepartamento = response;
            $scope.ddlDepartamento = $scope.oListaDepartamento[0];
        }
        
        $scope.EstablecerListaProvincia = function (response) {

            $scope.oListaProvincia = response;
            $scope.ddlProvincia = $scope.oListaProvincia[0];
        }

        $scope.EstablecerListaDistrito = function (response) {

            $scope.oListaDistrito = response;
            $scope.ddlDistrito = $scope.oListaDistrito[0];
        }

        //Método para cargar los datos del cliente a editar
        $scope.EstablecerDatosCliente = function (response) {

            $scope.oClienteBE = response;
            //console.log("$scope.oClienteBE");
            //console.log($scope.oClienteBE);

            $scope.LimpiarDatos();

            if (response != null) {
                Message.AlertSuccess("Cliente Encontrado", "vamos a cargar los datos del cliente");
                $scope.txtDocumento = $scope.oClienteBE.documento;
                $scope.txtApellidoPaterno = $scope.oClienteBE.apellido_paterno;
                $scope.txtApellidoMaterno = $scope.oClienteBE.apellido_materno;
                $scope.txtNombres = $scope.oClienteBE.nombres;
                var vNacimiento = Moment.formatASP_DDMMYYYY($scope.oClienteBE.fecha_nacimiento);
                var vFechaNacimiento = new Date(Moment.format(Moment.format(vNacimiento, "DD/MM/YYYY"), "mm-DD-yyyy"));
                $scope.txtFechaNacimiento = vFechaNacimiento;

                angular.forEach($scope.oListaTipoDocumento, function (item) {
                    if (item.id == $scope.oClienteBE.i002_tipo_documento) {
                        $scope.ddlTipoDocumento = item;
                    }
                });

                angular.forEach($scope.oListaGenero, function (item) {
                    if (item.id == $scope.oClienteBE.i011_genero) {
                        $scope.ddlGenero = item;
                    }
                });

                angular.forEach($scope.oListaEstadoCivil, function (item) {
                    if (item.id == $scope.oClienteBE.i012_estado_civil) {
                        $scope.ddlEstadoCivil = item;
                    }
                });

                $scope.btnCargarContratos();
                $scope.btnCargarGestiones();
                $scope.btnCargarGestionesAutomaticas();
                $scope.btnCargarConfiguraciones();
                $scope.btnCargarTelefonos();
                $scope.btnCargarCorreos();
                $scope.btnCargarDirecciones();

                Loading.LoadingClose();

                //$scope.$apply();

            } else {
                Message.AlertError("Error", "error al cargar datos del cliente");
                Loading.LoadingClose();
            }
            
        }

        $scope.EstablecerListaContratos = function (response) {

            var taContratos = $('#taContratos').DataTable({
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
                var data = taContratos.row($(this).parents('tr')).data();
                //alert(data["documento"] + "'s ID is: " + data["id_cliente"]);
                $scope.vgIdContratoSelec = data["id_contrato"];
                var param = { pIdContrato: $scope.vgIdContratoSelec };

                Call.Get('/Operaciones/Contrato/CronogramaListar', param, $scope.EstablecerListaCronograma);

                $("#moContrato").modal('show');
                $scope.MostrarEditarContrato(data);

            });

            taContratos.on('select', function (e, dt, type, indexes) {
                if (type === 'row') {
                    var data = taContratos.rows(indexes).data();

                    if (data.length > 0) {                                               
                        $scope.MostrarPreVistaContrato(data[0]);
                    }
                }
            });

        }

        $scope.MostrarEditarContrato = function (pContrato) {

            $scope.txtCodigoContrato = pContrato.ident_contrato;
            $scope.txtFechaActivacion = Moment.formatASP_DDMMYYYY(pContrato.fecha_activacion);
            $scope.txtPrecioBien = pContrato.mto_precio_bien;
            $scope.txtInicialBien = pContrato.mto_inicial_bien;
            $scope.txtPorcInicial = pContrato.porc_inicial;
            $scope.txtPlazo = pContrato.plazo;
            $scope.txtTEA = pContrato.tea;
            $scope.txtTCEA = pContrato.tcea;
            $scope.txtFinanciamiento = pContrato.mto_financiado;
            $scope.txtGastos = pContrato.mto_gasto;
            $scope.txtFechaPrimerVencimiento = Moment.formatASP_DDMMYYYY(pContrato.fecha_primer_vencimiento);
            $scope.txtFechaVencimiento = Moment.formatASP_DDMMYYYY(pContrato.fecha_vencimiento);
            $scope.txtSaldo = pContrato.mto_saldo;
            $scope.txtCuotasPagadas = pContrato.nro_cuotas_pagadas;
            $scope.txtCuotasPendientes = pContrato.nro_cuotas_pendientes;
            $scope.txtCuotasAtrasadas = pContrato.nro_cuotas_atrasadas;

        }

        $scope.MostrarPreVistaContrato = function (pContrato) {

            $scope.vgContratoSelec = pContrato.ident_contrato;
            $scope.vgIdContratoSelec = pContrato.id_contrato;

            //$scope.CargarCronograma($scope.vgIdContratoSelec);
            console.log(pContrato);

            $scope.laPrecio = pContrato.mto_precio_bien;
            $scope.laInicial = pContrato.mto_inicial_bien;
            $scope.laPorcInicial = pContrato.porc_inicial;
            $scope.laMontoGastos = pContrato.mto_gasto;
            $scope.laFinanciamiento = pContrato.mto_financiado;
            $scope.laFechaActivacion = Moment.formatASP_DDMMYYYY(pContrato.fecha_activacion);
            $scope.laPlazo = pContrato.plazo;
            $scope.laTEA = pContrato.tea;

            $scope.$apply();
        }

        $scope.EstablecerListaCronograma = function (presponse) {

            var taCronograma = $('#taCronograma').DataTable({
                data: presponse,
                responsive: true,
                searching: false,
                select: true,
                buttons: [
                    'copy', 'excel', 'pdf'
                ],
                columns: [
                    { data: 'nro_cuota' },
                    { data: 'fecha_vencimiento' },
                    { data: 'dias' },
                    { data: 'mto_capital' },
                    { data: 'mto_interes' },
                    { data: 'mto_portes' },
                    { data: 'mto_otros' },
                    { data: 'mto_cuota' },
                    { data: 'fecha_pago' },
                    { data: 'mto_mora' },
                    { data: 'mto_total_pagar' }
                ]
            });
        }

        $scope.EstablecerListaTelefonos = function (response) {

            var taTelefonos = $('#taTelefonos').DataTable({
                data: response,
                responsive: true,
                searching: false,
                select: true,
                buttons: [
                    'copy', 'excel', 'pdf'
                ],
                columns: [
                    { data: 'id_telefono' },
                    { data: 'tipo_telefono' },
                    { data: 'numero' },
                    { data: 'operador' },
                    { data: 'activo' },
                    {
                        /*targets: -1,*/
                        data: null,
                        defaultContent: '<a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2 align-middle"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg></a>'
                    }
                ]
            });

        }

        $scope.EstablecerListaCorreos = function (response) {

            var taCorreos = $('#taCorreos').DataTable({
                data: response,
                responsive: true,
                searching: false,
                select: true,
                buttons: [
                    'copy', 'excel', 'pdf'
                ],
                columns: [
                    { data: 'id_correo' },
                    { data: 'tipo' },
                    { data: 'correo' },                    
                    { data: 'activo' },
                    {
                        /*targets: -1,*/
                        data: null,
                        defaultContent: '<a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2 align-middle"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg></a>'
                    }
                ]
            });

        }

        $scope.EstablecerListaDirecciones = function (response) {

            var taDirecciones = $('#taDirecciones').DataTable({
                data: response,
                responsive: true,
                searching: false,
                select: true,
                buttons: [
                    'copy', 'excel', 'pdf'
                ],
                columns: [
                    { data: 'id_direccion' },
                    { data: 'tipo' },
                    { data: 'departamento' },
                    { data: 'provincia' },
                    { data: 'distrito' },
                    { data: 'direccion' },
                    { data: 'activo' },
                    {
                        /*targets: -1,*/
                        data: null,
                        defaultContent: '<a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2 align-middle"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg></a>'
                    }
                ]
            });

        }


        $scope.LimpiarDatos = function () {
            $scope.txtDocumento = "";
            $scope.txtApellidoPaterno = "";
            $scope.txtApellidoMaterno = "";
            $scope.txtNombres = "";
            $scope.txtFechaNacimiento = "";
        }

    }]);