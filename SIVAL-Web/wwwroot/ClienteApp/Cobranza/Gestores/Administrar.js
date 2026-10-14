'use strict';

AppCollFly.controller("AdministrarGestores", ['$scope', 'Message', 'MsgData', 'Call', 'Moment', '$http', 'Loading', '$q',
    function ($scope, Message, MsgData, Call, Moment, $http, Loading, $q, TaGeneric) {

        $scope.NameController = "/Cobranza/Gestores";
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

        $scope.oListaTipoDocumento = [{ id_combo: 0, nombre: "<--Seleccione-->" }];

        $scope.ddlTipoDocumento = $scope.oListaTipoDocumento[0];
        $scope.oListaGestores = [];

        $(document).ready(function () {

            $('#taAsignaciones').DataTable({
                ajax: '../ajax/data/arrays.txt',
            });

            Call.Get('/Seguridad/Generico/TipoDocumentoCombo', null, $scope.EstablecerListaTipoDocumento);

            $scope.btnCargarGestores();

        });

        //obteniendo el tamaño del div del contenedor
        var vHeigth = $('body').height(); //del tamaño que ocupa el menu y las detalles
        var vHeigthHeader = $('#header-main').height();
        var vHeigthNavBar = $('#navbar-main').height();
        var total = vHeigth - vHeigthHeader - vHeigthNavBar - 40;


        $scope.btnCargarGestores = function () {

            Call.Get($scope.NameController + '/Listar', null, $scope.EstablecerListaGestores);
        }

        $scope.btnNuevo = function () {

            $("#moGestores").modal("show");

        }

        

        $scope.EstablecerListaTipoDocumento = function (response) {

            $scope.oListaTipoDocumento = response;
            $scope.ddlTipoDocumento = $scope.oListaTipoDocumento[0];

        }

        $scope.btnGuardar = function () {


            var oEntidad = $scope.ObtenerEntidad();

            if (oEntidad.i002_tipo_documento == 0 || oEntidad.i002_tipo_documento == null) {
                Message.AlertError("Error", "Debe seleccionar un tipo de documento!");
                return;
            }

            if (oEntidad.documento == "" || oEntidad.documento == null || oEntidad.documento.length <7 ) {
                Message.AlertError("Error", "Debe ingresar documento!");
                return;
            }

            if (oEntidad.apellido_paterno == "" || oEntidad.apellido_paterno == null || oEntidad.apellido_paterno.length < 3 ) {
                Message.AlertError("Error", "Debe ingresar apellido paterno!");
                return;
            }

            if (oEntidad.apellido_materno == "" || oEntidad.apellido_materno == null || oEntidad.apellido_materno.length < 3 ) {
                Message.AlertError("Error", "Debe ingresar apellido materno!");
                return;
            }

            if (oEntidad.nombres == "" || oEntidad.nombres == null || oEntidad.nombres.length < 3 ) {
                Message.AlertError("Error", "Debe ingresar nombre!");
                return;
            }

            if (oEntidad.usuario == "" || oEntidad.usuario == null || oEntidad.usuario.length < 10 ) {
                Message.AlertError("Error", "Debe ingresar usuario (10 carac. min.)!");
                return;
            }

            if (oEntidad.clave == "" || oEntidad.clave == null || oEntidad.clave.length < 10 ) {
                Message.AlertError("Error", "Debe ingresar clave (10 carac. min.)!");
                return;
            }


            if (oEntidad.id_usuario > 0) {
                Call.PostAjax(true, $scope.NameController + '/Actualizar', oEntidad, $scope.EstablecerActualizarGestor);
            } else {
                Call.PostAjax(true, $scope.NameController + '/Registrar', oEntidad, $scope.EstablecerRegistrarGestor);
            }


        }

        $scope.MostrarEditarGestor = function (data) {

            $scope.id_usuario_sel = data["id_usuario"];

            angular.forEach($scope.oListaTipoDocumento, function (item) {
                if (item.id == data["i002_tipo_documento"]) {
                    $scope.ddlTipoDocumento = item;
                }
            });

            //$scope.ddlTipoDocumento.id;
            $scope.txtDocumento = data["documento"];
            $scope.txtApellidoPaterno = data["apellido_paterno"];
            $scope.txtApellidoMaterno = data["apellido_materno"];
            $scope.txtNombres = data["nombres"];
            $scope.txtUsuario = data["usuario"];
            $scope.txtClave = data["clave"];
            $scope.chkActivo = data["activo"];

            $scope.$apply();

        }

        $scope.ObtenerEntidad = function () {

            var vIdUsuario = $scope.id_usuario_sel;
            var vIdTipoDocumento = $scope.ddlTipoDocumento.id;
            var vDocumento = $scope.txtDocumento;
            var vApellidoPaterno = $scope.txtApellidoPaterno;
            var vApellidoMaterno = $scope.txtApellidoMaterno;
            var vNombre = $scope.txtNombres;
            var vUsuario = $scope.txtUsuario;
            var vClave = $scope.txtClave;
            var vActivo = $scope.chkActivo;


            var oEntidad = {
                id_usuario: vIdUsuario,
                i002_tipo_documento: vIdTipoDocumento,
                documento: vDocumento,
                apellido_paterno: vApellidoPaterno,
                apellido_materno: vApellidoMaterno,
                nombres: vNombre,
                usuario: vUsuario,
                clave: vClave,
                activo : vActivo
            }


            return oEntidad;

        }

        $scope.EstablecerRegistrarGestor = function (response) {

            if (response != null) {
                if (response.st == 1) {
                    Message.AlertSuccess("Correcto", "Gestor registrado correctamente");
                    $scope.btnCargarGestores();
                    Loading.LoadingClose();
                    $("#moGestores").modal("hide");
                } else {
                    Loading.LoadingClose();
                    Message.AlertError("Error", "Error al registrar Gestor");
                }
            } else {
                Loading.LoadingClose();
                Message.AlertError("Error", "Error al registrar Gestor");
            }
        }

        $scope.EstablecerActualizarGestor = function (response) {

            if (response != null) {
                if (response.st == 1) {
                    Message.AlertSuccess("Correcto", "Gestor actualizado correctamente");
                    $scope.btnCargarGestores();
                    Loading.LoadingClose();
                    $("#moGestores").modal("hide");
                } else {
                    Loading.LoadingClose();
                    Message.AlertError("Error", "Error al actualizar Gestor");
                }
            } else {
                Loading.LoadingClose();
                Message.AlertError("Error", "Error al actualizar Gestor");
            }
        }

        $scope.EstablecerListaGestores = function (response) {

            var taGestores;

            if ($.fn.dataTable.isDataTable('#taGestores')) {                
                $('#taGestores').dataTable().fnClearTable();
                $('#taGestores').dataTable().fnAddData(response);
            } else {
                taGestores = $('#taGestores').DataTable({
                    data: response,
                    destroy: true,
                    responsive: true,
                    searching: false,
                    select: true,
                    buttons: [
                        'copy', 'excel', 'pdf'
                    ],
                    columns: [
                        { data: 'id_usuario' },
                        { data: 'documento' },
                        { data: 'apellido_paterno' },
                        { data: 'apellido_materno' },
                        { data: 'nombres' },
                        { data: 'usuario' },
                        { data: 'activo' },
                        {
                            /*targets: -1,*/
                            data: null,
                            defaultContent: '<a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2 align-middle"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg></a>'
                        }
                    ]
                });


                $('#taGestores tbody').on('click', 'a', function () {
                    var data = taGestores.row($(this).parents('tr')).data();
                    $scope.MostrarEditarGestor(data);
                    $("#moGestores").modal('show');

                });

            }


            

            /*taGestores.on('select', function (e, dt, type, indexes) {
                if (type === 'row') {
                    var data = taGestores.rows(indexes).data();

                    if (data.length > 0) {
                        $scope.MostrarPreVistaContrato(data[0]);
                    }
                }
            });*/

        }


    }]);