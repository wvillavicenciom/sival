'use strict';

AppCredFly.controller("BusquedaSolicitudes", ['$scope', 'Message', 'MsgData', 'Call', 'Moment', '$http', 'Loading', '$q',
    function ($scope, Message, MsgData, Call, Moment, $http, Loading, $q, TaGeneric) {

        $scope.NameController = "/Comercial/Solicitud";
        $scope.GenericController = "/Seguridad/Generico";
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


        $scope.oListaTipoDocumento = [];
        $scope.oListaEtapaSolicitud = [];

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

            Call.Get($scope.GenericController + "/TipoDocumentoCombo", null, $scope.EstablecerTipoDocumento);
            Call.Get($scope.GenericController + "/EtapaSolicitudCombo", null, $scope.EstablecerEtapaSolicitud);

            $scope.GenericController

        });

        //obteniendo el tamaño del div del contenedor
        var vHeigth = $('body').height(); //del tamaño que ocupa el menu y las detalles
        var vHeigthHeader = $('#header-main').height();
        var vHeigthNavBar = $('#navbar-main').height();
        var total = vHeigth - vHeigthHeader - vHeigthNavBar - 40;

        $scope.btnBuscar = function () {

            var parametros = {
                pIdSolicitud: $scope.txtIdSolicitud == undefined ? '' : $scope.txtIdSolicitud,
                pTipoDocumento: $scope.ddlTipoDocumento.id,
                pDocumento: $scope.txtDocumento == undefined ? '' : $scope.txtDocumento,
                pApellidoPaterno: $scope.txtApePaterno == undefined ? '' : $scope.txtApePaterno,
                pApellidoMaterno: $scope.txtApeMaterno == undefined ? '' : $scope.txtApeMaterno,
                pNombres: $scope.txtNombres == undefined ? '' : $scope.txtNombres,
                pFechaIni: $scope.txtFechaInicio == undefined ? '' : $scope.txtFechaInicio,
                pFechaFin: $scope.txtFechaFin == undefined ? '' : $scope.txtFechaFin,
                pEtapaSolicitud: $scope.ddlEtapaSolicitud.id
            };
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
            Call.Get($scope.NameController + '/ListarBusqueda', parametros, $scope.EstablecerBusqueda);



        }     

        $scope.EstablecerTipoDocumento = function (response) {

            $scope.oListaTipoDocumento = response;
            $scope.ddlTipoDocumento = $scope.oListaTipoDocumento[0];

        }

        $scope.EstablecerEtapaSolicitud = function (response) {

            $scope.oListaEtapaSolicitud = response;
            $scope.ddlEtapaSolicitud = $scope.oListaEtapaSolicitud[0];

        }

        $scope.EstablecerBusqueda = function (response) {

            //console.log("Datos Encontrados");
            //console.log(response);


            var taSolicitudes;

            if ($.fn.dataTable.isDataTable('#taSolicitudes')) {
                //$('#taSolicitudes').DataTable().destroy();
                $('#taSolicitudes').dataTable().fnClearTable();
                $('#taSolicitudes').dataTable().fnAddData(response);
            } else {
                taSolicitudes = $('#taSolicitudes').DataTable({
                    data: response,
                    responsive: true,
                    searching: false,
                    select: true,
                    buttons: [
                        'copy', 'excel', 'pdf'
                    ],
                    columns: [
                        { data: 'id_solicitud' },
                        { data: 'fecha_solicitud_str' },
                        { data: 'tipo_documento' },
                        { data: 'documento' },
                        { data: 'cliente' },
                        { data: 'etapa' },
                        {
                            /*targets: -1,*/
                            data: null,
                            defaultContent: '<a class="edit""><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2 align-middle"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg></a>' +
                                '<a class="update" ><i class="bi bi-x-octagon" width="24" height="24" ></i></a>' +
                                '<a class="delete" > <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash align-middle"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></a>'
                        }
                    ]
                });


                $('#taSolicitudes tbody').on('click', 'a.edit', function () {

                    var data = taSolicitudes.row($(this).parents('tr')).data();
                    Call.Redirect(vgUrlSolicitudRegistro + "?id=" + data.id_solicitud);

                });

                $('#taSolicitudes tbody').on('click', 'a.update', function () {

                    var data = taSolicitudes.row($(this).parents('tr')).data();
                    Message.Confirm("Anular", "¿Desea Anular la solicitud?", $scope.btnAnularSolicitud, null, data);

                });

                $('#taSolicitudes tbody').on('click', 'a.delete', function () {

                    var data = taSolicitudes.row($(this).parents('tr')).data();
                    Message.Confirm("Eliminar", "¿Desea eliminar la solicitud?", $scope.btnEliminarSolicitud, null, data);

                });

            }

        }

        $scope.btnAnularSolicitud = function (data) {

            var vIdSolicitud = data.id_solicitud;

            var pSolicitudRQ = { id_solicitud: vIdSolicitud };

            
            Call.PostAjax(true, $scope.NameController + "/Anular", pSolicitudRQ, $scope.RespuestaAnularSolicitud);
        }

        $scope.btnEliminarSolicitud = function (data) {

            var vIdSolicitud = data.id_solicitud;

            var pSolicitudRQ = { id_solicitud: vIdSolicitud };


            Call.PostAjax(true, $scope.NameController + "/Eliminar", pSolicitudRQ, $scope.RespuestaEliminarSolicitud);

        }

        $scope.RespuestaAnularSolicitud = function (response) {

            if (response.st == 1) {
                Message.AlertSuccess("Anular Solicitud", "La solicitud se anuló correctamente");
                $scope.btnBuscar();
            } else {
                Message.AlertError("Anulación Erronea", "Error al anular la solicitud, vuelva a intentarlo");
            }

        }

        $scope.RespuestaEliminarSolicitud = function (response) {

            if (response.st == 1) {
                Message.AlertSuccess("Eliminar Solicitud", "La solicitud se anuló correctamente");
                $scope.btnBuscar();
            } else {
                Message.AlertError("Eliminar Erronea", "Error al eliminar la solicitud, vuelva a intentarlo");
            }

        }


    }]);