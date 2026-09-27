'use strict';

AppCollFly.controller("BusquedaAsignaciones", ['$scope', 'Message', 'MsgData', 'Call', 'Moment', '$http', 'Loading', '$q',
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

            $('#taAsignaciones').DataTable({
                ajax: '../ajax/data/arrays.txt',
            });

        });

        //obteniendo el tamaño del div del contenedor
        var vHeigth = $('body').height(); //del tamaño que ocupa el menu y las detalles
        var vHeigthHeader = $('#header-main').height();
        var vHeigthNavBar = $('#navbar-main').height();
        var total = vHeigth - vHeigthHeader - vHeigthNavBar - 40;

        

        $scope.btnNuevaAsignacion = function () {

            $("#moAsignacion").modal("show");

        }




    }]);