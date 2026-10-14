'use strict';

AppSIVAL.controller("Profile", ['$scope', 'Message', 'MsgData', 'Call', 'Moment', '$http', 'Loading', '$q',
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

        $scope.oModuloComercialOpciones = [];//[{ url: "/Comercial/Solicitud/Busqueda", nombre: "Búsqueda" }, { url: "/Comercial/Solicitud/Evaluar", nombre: "Evaluar" }];
        $scope.oModuloAdmisionOpciones = [];//[{ url: "/Admision/MesaCredito/Busqueda", nombre: "Búsqueda" }, { url: "/Admision/MesaCredito/Bandeja", nombre: "Bandeja" }];
        $scope.oModuloOperacionesOpciones = [];//[{ url: "/Operaciones/Contrato/Busqueda", nombre: "Búsqueda" }];
        $scope.oModuloConfiguracionOpciones = [];//[{ url: "/Seguridad/Usuario/Busqueda", nombre: "Usuarios" }, { url: "/Seguridad/Configuracion/FiltrosDuros", nombre: "Filtros Duros" }, { url: "/Seguridad/Configuracion/Parametros", nombre: "Parametros" }];

        $(document).ready(function () {

            //Varificar Permisos
            Call.PostAjax(false,'/Seguridad/Usuario/ObtnerPerfil', null, $scope.EstablecerPerfil);

            setInterval($scope.ValidarSession, 50000);           

        });

        $scope.ValidarSession = function () {

            Call.PostAjax(true, '/Seguridad/Usuario/ObtnerPerfil', null, $scope.EstablecerPerfil)
        }

        $scope.EstablecerPerfil = function (response) {

            if (response == null || response.dato == null) {
                $scope.CerrarSession();

            } else {
                $scope.vgUser = response.dato;
                vgPerfil = response.dato_b;
            }

            if (vgPerfil == 4) {
                $scope.urlUsuario = "/Seguridad/Usuario/Busqueda";
            } else {
                $scope.urlUsuario = "#";
            }         
            

            /*
            //var ul = document.getElementById("ulAdmision");
            if (vgPerfil == 68 || vgPerfil == 69) {
                $scope.oModuloAdmisionOpciones = [{ url: "/Admision/MesaCredito/Busqueda", nombre: "Búsqueda" }, { url: "/Admision/MesaCredito/Bandeja", nombre: "Bandeja" }];
                var ul = document.getElementById("ulAdmision");
                ul.classList.add('show');
            }

            if (vgPerfil == 66 || vgPerfil == 67) {
                $scope.oModuloComercialOpciones = [{ url: "/Comercial/Solicitud/Busqueda", nombre: "Búsqueda" }, { url: "/Comercial/Solicitud/Evaluar", nombre: "Evaluar" }];
                var ul = document.getElementById("ulComercial");
                ul.classList.add('show');
            }

            if (vgPerfil == 65) {
                $scope.oModuloComercialOpciones = [{ url: "/Comercial/Solicitud/Busqueda", nombre: "Búsqueda" }, { url: "/Comercial/Solicitud/Evaluar", nombre: "Evaluar" }];
                $scope.oModuloAdmisionOpciones = [{ url: "/Admision/MesaCredito/Busqueda", nombre: "Búsqueda" }, { url: "/Admision/MesaCredito/Bandeja", nombre: "Bandeja" }];
                $scope.oModuloOperacionesOpciones = [{ url: "/Operaciones/Contrato/Busqueda", nombre: "Búsqueda" }];
                $scope.oModuloConfiguracionOpciones = [{ url: "/Seguridad/Usuario/Busqueda", nombre: "Usuarios" }, { url: "/Seguridad/Configuracion/FiltrosDuros", nombre: "Filtros Duros" },
                { url: "/Seguridad/Configuracion/Parametros", nombre: "Parametros" }];
                var ul = document.getElementById("Configuracion");
                //ul.classList.add('show');
            }
            */


            $scope.$apply();
        }


        


        $scope.CerrarSession = function () {

            Call.PostAjax(true, '/Seguridad/Usuario/CerrarSession', null, null, null);

            Call.Redirect(vgUrlLogin);

        }



    }]);