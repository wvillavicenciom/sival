'use strict';

AppCredFly.controller("BusquedaUsuarios", ['$scope','Validate', 'Message', 'MsgData', 'Call', 'Moment', '$http', 'Loading', '$q',
    function ($scope, Validate, Message, MsgData, Call, Moment, $http, Loading, $q, TaGeneric) {

        $scope.NameController = "/Seguridad/Usuario";
        $scope.GenericController = "/Seguridad/Generico";


        $scope.oListaTipoDocumento = [];
        $scope.oListaEtapaSolicitud = [];

        $(document).ready(function () {

            Call.Get($scope.GenericController + "/TipoUsuarioCombo", null, $scope.EstablecerTipoUsuario);
            Call.Get($scope.GenericController + "/TipoDocumentoCombo", null, $scope.EstablecerTipoDocumento);           

            $scope.btnBuscar();

        });


        $scope.btnBuscar = function () {

            Loading.LoadingShow("Buscando Datos, por favor espere!");

            Call.Get($scope.NameController + '/ListarBusqueda', null, $scope.EstablecerBusqueda);

        }     

        $scope.EstablecerTipoUsuario = function (response) {

            $scope.oListaTipoUsuario = response;
            $scope.ddlTipoUsuario = $scope.oListaTipoUsuario[0];

        }

        $scope.EstablecerTipoDocumento = function (response) {

            $scope.oListaTipoDocumento = response;
            $scope.ddlTipoDocumento = $scope.oListaTipoDocumento[0];

        }

        $scope.EstablecerBusqueda = function (response) {

            var taUsuarios;

            if ($.fn.dataTable.isDataTable('#taUsuarios')) {
                $('#taUsuarios').dataTable().fnClearTable();
                $('#taUsuarios').dataTable().fnAddData(response);
            } else {
                taUsuarios = $('#taUsuarios').DataTable({
                    data: response,
                    responsive: true,
                    searching: false,
                    select: true,
                    buttons: [
                        'copy', 'excel', 'pdf'
                    ],
                    columns: [
                        { data: 'id_usuario' },
                        { data: 'usuario' },
                        { data: 'tipo_documento' },
                        { data: 'documento' },
                        { data: 'nombres' },
                        { data: 'tipo_usuario' },
                        { data: 'flag_activo' },
                        { data: 'flag_administrador' },
                        {
                            data: null,
                            defaultContent: '<a class="edit""><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2 align-middle"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg></a>' +
                                '<a class="delete" > <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash align-middle"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></a>'
                        }
                    ]
                });


                $('#taUsuarios tbody').on('click', 'a.edit', function () {
                    var data = taUsuarios.row($(this).parents('tr')).data();
                    $scope.btnEditar(data);
                });

                /*$('#taUsuarios tbody').on('click', 'a.update', function () {
                    var data = taUsuarios.row($(this).parents('tr')).data();
                    Message.Confirm("Anular", "¿Desea Anular el usuario?", $scope.btnAnularSolicitud, null, data);

                });*/

                $('#taUsuarios tbody').on('click', 'a.delete', function () {
                    var data = taUsuarios.row($(this).parents('tr')).data();
                    Message.Confirm("Eliminar", "¿Desea eliminar el usuario?", $scope.btnEliminarUsuario, null, data);
                });

            }

            Loading.LoadingClose();
        }

        $scope.ObtenerEntidadUsuario = function () {

            var vid_usuario = $scope.id_usuario_sel;
            var vid_tipo_documento = $scope.ddlTipoDocumento.id;
            var vdocumento = $scope.txtDocumento;
            var vnombres = $scope.txtNombres;
            var vapellido_paterno = $scope.txtApellidoPaterno;
            var vapellido_materno = $scope.txtApellidoMaterno;
            var vid_tipo_usuario = $scope.ddlTipoUsuario.id;
            var vusuario = $scope.txtUsuario;
            var vclave = $scope.txtContrasenia;
            var vflag_activo = $scope.cbkActivo;
            var vflag_administrador = $scope.cbkAdministrador;


            var oEntidad = {
                id_usuario: vid_usuario,
                id_tipo_documento: vid_tipo_documento,
                documento: vdocumento,
                nombres: vnombres,
                apellido_paterno: vapellido_paterno,
                apellido_materno: vapellido_materno,
                id_tipo_usuario: vid_tipo_usuario,
                usuario: vusuario,
                clave: vclave,
                flag_activo: vflag_activo,
                flag_administrador: vflag_administrador
            }

            return oEntidad;

        }

        $scope.btnNuevo = function () {

            $scope.id_usuario_sel = 0;
            $scope.vgTituloModal = "Registro de Nuevo Usuario";
            $scope.BloquearNuevo();
            $("#moEdit").modal('show');  
        }

        $scope.btnEditar = function (pData) {

            $scope.vgTituloModal = "Edición de Usuario";

            $scope.id_usuario_sel = pData.id_usuario;
            $scope.txtDocumento = pData.documento;
            $scope.txtNombres = pData.nombres;
            $scope.txtApellidoPaterno = pData.apellido_paterno;
            $scope.txtApellidoMaterno = pData.apellido_materno;
            $scope.txtUsuario = pData.usuario;
            $scope.cbkActivo = pData.flag_activo;
            $scope.cbkAdministrador = pData.flag_administrador;

            angular.forEach($scope.oListaTipoDocumento, function (item) {
                if (item.id == pData.i002_tipo_documento) {
                    $scope.ddlTipoDocumento = item;
                }
            });

            angular.forEach($scope.oListaTipoUsuario, function (item) {
                if (item.id == pData.i009_tipo_usuario) {
                    $scope.ddlTipoUsuario = item;
                }
            });

            $("#moEdit").modal('show');
            $scope.BloquearEdicion();
            $scope.$apply();
        }

        $scope.btnEliminarUsuario = function (pdata) {

            var oEntidad = { id_usuario: pdata.id_usuario };

            Call.PostAjax(false, $scope.NameController + '/Eliminar', oEntidad, $scope.RespuestaEliminarUsuario);

        }

        $scope.btnGuardar = function () {

            var oEntidad = $scope.ObtenerEntidadUsuario();

            var vValidoDatos = $scope.ValidarDatosGuardar(oEntidad);

            if (vValidoDatos != "") {
                Message.AlertError("Error", vValidoDatos);
                return;
            }


            if ($scope.id_usuario_sel > 0) {
                Message.Confirm("Actualizar", "¿Desea actualizar el usuario?", $scope.btnGrabarUsuario, null, oEntidad);
            } else {
                Message.Confirm("Crear", "¿Desea crear el usuario?", $scope.btnGrabarUsuario, null, oEntidad);
            }


        }

        $scope.ValidarDatosGuardar = function (oEntidad) {
            if (oEntidad.id_tipo_documento == 0 || oEntidad.id_tipo_documento == undefined) {
                return "Debe seleccionar un tipo de documento!";
            }

            if (oEntidad.documento == undefined || oEntidad.documento.length <= 5 || Validate.OnlyNumber(oEntidad.documento) == false) {
                return "Debe ingresar un documento válido!";
            }

            if (oEntidad.nombres == undefined || oEntidad.nombres.length < 3 || Validate.OnlyLetter(oEntidad.nombres) == false) {
                return "Debe ingresar un nombre!";
            }

            if (oEntidad.apellido_paterno == undefined || oEntidad.apellido_paterno.length < 3 || Validate.OnlyLetter(oEntidad.apellido_paterno) == false) {
                return "Debe ingresar un apellido paterno!";
            }

            if (oEntidad.apellido_materno == undefined || oEntidad.apellido_materno.length < 3 || Validate.OnlyLetter(oEntidad.apellido_materno) == false) {
                return "Debe ingresar un apellido materno!";
            }

            if (oEntidad.id_tipo_usuario == 0 || oEntidad.id_tipo_usuario == undefined) {
                return "Debe seleccionar un tipo de usuario!";
            }

            if ($scope.id_usuario_sel == 0) {
                if (oEntidad.usuario == undefined || oEntidad.usuario.length < 6) {
                    return "Debe ingresar un usuario!";
                }

                if (oEntidad.clave == undefined || oEntidad.clave.length < 10) {
                    return "La contraseña no cumple con los requisitos mínimos!";
                }
            }

            return "";
        }

        $scope.btnGrabarUsuario = function (pEntidad) {
          
            var parametros = {
                id_usuario: pEntidad.id_usuario,
                id_tipo_documento: pEntidad.id_tipo_documento,
                documento: pEntidad.documento,
                nombres: pEntidad.nombres,
                apellido_paterno: pEntidad.apellido_paterno,
                apellido_materno: pEntidad.apellido_materno,
                id_tipo_usuario: pEntidad.id_tipo_usuario,
                usuario: pEntidad.usuario,
                clave: pEntidad.clave,
                flag_activo: pEntidad.flag_activo,
                flag_administrador: pEntidad.flag_administrador
            };

            Loading.LoadingShow("Iniciando Sesión, por favor espere!");

            if ($scope.id_usuario_sel > 0) {
                Call.PostAjax(false, $scope.NameController + '/Actualizar', parametros, $scope.RespuestaGuardarUsuario);
            } else {
                Call.PostAjax(false, $scope.NameController + '/Registrar', parametros, $scope.RespuestaGuardarUsuario);
            }


            

        } 

        $scope.RespuestaEliminarUsuario = function (response) {
            if (response.st == 1) {
                Message.AlertSuccess("Eliminar Usuario", "Se eliminó el usuario correctamente");
                $scope.btnBuscar();
            } else {
                Message.AlertError("Eliminar Erroneo", "Error al eliminar el usuario, vuelva a intentarlo");
            }
        }

        $scope.RespuestaGuardarUsuario = function (response) {
            if (response.st == 1) {
                if ($scope.id_usuario_sel > 0) {
                    Message.AlertSuccess("Actualizar Usuario", "Se actualizó el usuario correctamente");
                } else {
                    Message.AlertSuccess("Creación de Usuario", "Se creaó el usuario correctamente");                    
                }                
                $scope.btnBuscar();
                $("#moEdit").modal('hide');                 
            } else {
                Message.AlertError("Eliminar Erroneo", "Error al eliminar el usuario, vuelva a intentarlo");
            }
        }

        $scope.BloquearEdicion = function () {
            $scope.ddlTipoDocumento_Disabled = true;
            $scope.txtDocumento_Disabled = true;
            $scope.txtNombres_Disabled = false;
            $scope.txtApellidoPaterno_Disabled = false;
            $scope.txtApellidoMaterno_Disabled = false;
            $scope.ddlTipoUsuario_Disabled = false;
            $scope.txtUsuario_Disabled = true;
            $scope.txtContrasenia_Disabled = true;
            $scope.cbkActivo_Disabled = false;
            $scope.cbkAdministrador_Disabled = true;
        }

        $scope.BloquearNuevo = function () {
            $scope.ddlTipoDocumento_Disabled = false;
            $scope.txtDocumento_Disabled = false;
            $scope.txtNombres_Disabled = false;
            $scope.txtApellidoPaterno_Disabled = false;
            $scope.txtApellidoMaterno_Disabled = false;
            $scope.ddlTipoUsuario_Disabled = false;
            $scope.txtUsuario_Disabled = false;
            $scope.txtContrasenia_Disabled = false;
            $scope.cbkActivo_Disabled = false;
            $scope.cbkAdministrador_Disabled = true;
        }


    }]);