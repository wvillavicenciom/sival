'use strict';

AppSIVAL.controller("MiPerfil", ['$scope','Validate', 'Message', 'MsgData', 'Call', 'Moment', '$http', 'Loading', '$q',
    function ($scope, Validate, Message, MsgData, Call, Moment, $http, Loading, $q, TaGeneric) {

        $scope.NameController = "/Seguridad/Usuario";
        $scope.GenericController = "/Seguridad/Generico";


        $scope.oListaTipoDocumento = [];
        $scope.oListaEtapaSolicitud = [];

        $(document).ready(function () {

            Loading.LoadingShow("Obteniendo Datos, por favor espere!");

            Call.Get($scope.GenericController + "/TipoUsuarioCombo", null, $scope.EstablecerTipoUsuario);
            Call.Get($scope.GenericController + "/TipoDocumentoCombo", null, $scope.EstablecerTipoDocumento);           
            Call.Get($scope.GenericController + "/TipoUsuarioCombo", null, $scope.EstablecerTipoUsuario);

            setTimeout($scope.btnObtenerDatos, 1500);

        });   

        $scope.EstablecerTipoUsuario = function (response) {

            $scope.oListaTipoUsuario = response;
            $scope.ddlTipoUsuario = $scope.oListaTipoUsuario[0];

        }

        $scope.EstablecerTipoDocumento = function (response) {

            $scope.oListaTipoDocumento = response;
            $scope.ddlTipoDocumento = $scope.oListaTipoDocumento[0];

        }

        $scope.EstablecerTipoUsuario = function (response) {

            $scope.oListaTipoUsuario = response;
            $scope.ddlTipoUsuario = $scope.oListaTipoUsuario[0];

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

        $scope.btnObtenerDatos = function () {

            Call.Get($scope.NameController + "/Obtener", null, $scope.EstablecerDatosUsuario)
        }

        $scope.EstablecerDatosUsuario = function (response) {

            $scope.id_usuario_sel = response.id_usuario;
            $scope.txtDocumento = response.documento;
            $scope.txtNombres = response.nombres;
            $scope.txtApellidoPaterno = response.apellido_paterno;
            $scope.txtApellidoMaterno = response.apellido_materno;
            $scope.txtUsuario = response.usuario;
            $scope.cbkActivo = response.flag_activo;
            $scope.cbkAdministrador = response.flag_administrador;

            angular.forEach($scope.oListaTipoDocumento, function (item) {
                if (item.id == response.i002_tipo_documento) {
                    $scope.ddlTipoDocumento = item;
                }
            });

            angular.forEach($scope.oListaTipoUsuario, function (item) {
                if (item.id == response.i009_tipo_usuario) {
                    $scope.ddlTipoUsuario = item;
                }
            });

            $scope.BloquearEdicion();
            //$scope.$apply();

            Loading.LoadingClose();
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

            Loading.LoadingClose();

            if (response.st == 1) {
                if ($scope.id_usuario_sel > 0) {
                    Message.AlertSuccess("Actualizar Usuario", "Se actualizó el usuario correctamente");
                } else {
                    Message.AlertSuccess("Creación de Usuario", "Se creaó el usuario correctamente");                    
                }              
                                
            } else {
                Message.AlertError("Eliminar Erroneo", "Error al eliminar el usuario, vuelva a intentarlo");
            }
        }

        $scope.BloquearEdicion = function () {
            $scope.ddlTipoDocumento_Disable = true;
            $scope.txtDocumento_Disable = true;
            $scope.txtNombres_Disable = false;
            $scope.txtApellidoPaterno_Disable = false;
            $scope.txtApellidoMaterno_Disable = false;
            $scope.ddlTipoUsuario_Disable = false;
            $scope.txtUsuario_Disable = true;
            $scope.cbkActivo_Disable = false;
            $scope.cbkAdministrador_Disable = true;
        }

        $scope.btnCambiarClave = function () {

            var vIdUsuario = $scope.id_usuario_sel;
            var vUsuario = $scope.txtUsuario;
            var vClave = $scope.txtClave;
            var vClaveRepetir = $scope.txtClaveRepetir;

            if (vIdUsuario == undefined || vIdUsuario == 0) {
                return "Debe ingresar un usuario!";
            }

            if (vUsuario == undefined || vUsuario.length < 6) {
                return "Debe ingresar un usuario!";
            }

            if (vClave == undefined || vClave < 8) {
                return "La contraseña no cumple con los requisitos mínimos!";
            }

            /*if (vClaveRepetir == undefined || vClaveRepetir.length < 8) {
                return "La contraseña repetida no cumple con los requisitos mínimos!";
            }*/

            if (vClave != vClaveRepetir) {
                return "La contraseñas no coinciden!";
            }

            var oEntidad = { id_usuario: vIdUsuario, usuario: vUsuario, clave: vClave };

            Message.Confirm("Modificar", "¿Desea cambiar la contraseña?", $scope.CambiarClave, null, oEntidad);

        }

        $scope.CambiarClave = function (pEntidad) {

            Loading.LoadingShow("Iniciando Sesión, por favor espere!");

            Call.PostAjax(false, $scope.NameController + '/CambiarClave', pEntidad, $scope.RespuestaCambiarClave);  

        }

        $scope.RespuestaCambiarClave = function (response) {

            Loading.LoadingClose();

            if (response.st == 1) {
                Message.AlertSuccess("Cambio Clave", "Se cambio la clave correctamente");

            } else {
                Message.AlertError("Cambio Erroneo", "Error al cambiar la clave, vuelva a intentarlo");
            }
        }


    }]);