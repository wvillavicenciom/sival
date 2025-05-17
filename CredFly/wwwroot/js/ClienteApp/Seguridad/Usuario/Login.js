'use strict';

AppCollFly.controller("Login", ['$scope', 'Message', 'MsgData', 'Call', 'Moment', '$http', 'Loading', '$q',
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

            //Varificar Permisos
            //Call.Get('/Home/UsuarioPermisoObtner', null, $scope.VerificarPermisos);

        });

        //obteniendo el tamaño del div del contenedor
        var vHeigth = $('body').height(); //del tamaño que ocupa el menu y las detalles
        var vHeigthHeader = $('#header-main').height();
        var vHeigthNavBar = $('#navbar-main').height();
        var total = vHeigth - vHeigthHeader - vHeigthNavBar - 40;

        $scope.btnIngresar = function () {             
          
            var parametros = {
                pUsuario: $scope.txtUsuario == undefined ? '' : $scope.txtUsuario,
                pClave: $scope.txtClave == undefined ? '' : $scope.txtClave
            };

            if ((parametros.pUsuario == '' || parametros.pUsuario.length < 7)) {
                Message.AlertError("Alerta", "Debe ingresar usuario");
                return;
            }

            if ((parametros.pClave == '' || parametros.pClave.length < 7)) {
                Message.AlertError("Alerta", "Debe Ingresar clave");
                return;
            }            

            Loading.LoadingShow("Iniciando Sesión, por favor espere!");
            Call.Get($scope.NameController + '/UsuarioValidarInicio', parametros, $scope.EstablecerLogin);
          
        }

        $scope.EstablecerLogin = function (response) {

            Loading.LoadingClose();


            if (response != null) {
                if (response.st == 1) {
                    Message.AlertSuccess("Mensaje", "Bienvenido!!" + response.dato);
                    Call.Redirect(UrlHome);
                } else {
                    Message.AlertError("Alerta", "Usuario y/o Clave incorrectas");
                }                
            } else {
                Message.AlertError("Alerta", "Usuario y/o Clave incorrectas");
            }

        }




    }]);