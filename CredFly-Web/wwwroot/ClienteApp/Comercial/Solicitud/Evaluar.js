'use strict';

AppCredFly.controller("Evaluar", ['$scope', 'Message', 'MsgData', 'Call', 'Moment', '$http', 'Loading', '$q',
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

        $scope.title_form = "Evaluar";
        $scope.rbtPlan = 0;

        

        $(document).ready(function () {

            Call.Get($scope.GenericController + "/TipoDocumentoCombo", null, $scope.EstablecerTipoDocumento);
            Call.Get($scope.GenericController + "/CategoriaLaboralCombo", null, $scope.EstablecerCategoriaLaboral);

            //$("#moResultado").modal('show'); 

        });

        $scope.EstablecerTipoDocumento = function (response) {

            $scope.oListaTipoDocumento = response;
            $scope.ddlTipoDocumento = $scope.oListaTipoDocumento[0];

        }

        $scope.EstablecerCategoriaLaboral = function (response) {

            $scope.oListaCategoriaLaboral = response;
            $scope.ddlCategoriaLaboral = $scope.oListaCategoriaLaboral[0];

        }



        $scope.btnEvaluar = function () {             
          
            var parametros = {
                pTipoDocumento : $scope.ddlTipoDocumento.id,
                pDocumento: $scope.txtDocumento == undefined ? '' : $scope.txtDocumento,
                pFechaNacimiento: $scope.txtFechaNacimiento == undefined ? '' : $scope.txtFechaNacimiento,
                pCategoriaLaboral : $scope.ddlCategoriaLaboral.id,
                pIngresoBruto: $scope.txtIngresoBruto == undefined ? '' : $scope.txtIngresoBruto,
                pFechaIngresoLaboral: $scope.txtFechaIngresoLaboral == undefined ? '' : $scope.txtFechaIngresoLaboral,

            };
            //Int32 pTipoDocumento, String pDocumento, String pFechaNacimiento, Int32 pCategoriaLaboral, Decimal pIngresoBruto, String pFechaIngresoLaboral
            
            if ((parametros.pTipoDocumento == '' || parametros.pTipoDocumento == 0)) {
                Message.AlertError("Alerta", "Debe seleccionar tipo de documento");
                return;
            }
            
            if ((parametros.pDocumento == '' || parametros.pDocumento.length < 8)) {
                Message.AlertError("Alerta", "Debe Ingresar documento");
                return;
            }

            if (Moment.Valid(parametros.pFechaNacimiento) == false) {
                Message.AlertError("Error", "Fecha de nacimiento inválida!");
                return;
            }

            if ((parametros.pCategoriaLaboral == '' || parametros.pCategoriaLaboral == 0)) {
                Message.AlertError("Alerta", "Debe seleccionar categoría laboral");
                return;
            }

            if ((parametros.pIngresoBruto == '' || parametros.pIngresoBruto <= 0)) {
                Message.AlertError("Alerta", "Debe ingreso un monto de ingreso");
                return;
            }

            if (Moment.Valid(parametros.pFechaIngresoLaboral) == false) {
                Message.AlertError("Error", "Fecha de ingreso laboral!");
                return;
            }
            
            Loading.LoadingShow("Vamos Evaluar al Cliente, por favor espere!");
            Call.Get($scope.NameController + '/EvaluarFD', parametros, $scope.EstablecerEvaluar);

            //$("#moResultado").modal('show');  
        }

        $scope.EstablecerEvaluar = function (response) {

            if (response != null) {

                //Cuando se pre-aprobó
                if (response.st == 1) {
                    var vIdSolicitud = response.dato_a;
                    Call.Redirect("/Comercial/Solicitud/RegistroVehicular?id=" + vIdSolicitud);  
                }
                //Cuando se rechazó
                if (response.st == 0) {
                    $scope.txtTipoDocumento_sel = $scope.ddlTipoDocumento.nombre;
                    $scope.txtDocumento_sel = $scope.txtDocumento;
                    $scope.txtFechaNacimiento_sel = $scope.txtFechaNacimiento;
                    $scope.txtCategoriaLaboral_sel = $scope.ddlCategoriaLaboral.nombre;
                    $scope.txtIngresoBruto_sel = $scope.txtIngresoBruto;
                    $scope.txtFechaIngresoLaboral_sel = $scope.txtFechaIngresoLaboral;

                    $scope.txtResultado = response.msg;
                    $scope.txtMotivoRechazo = response.dato;;
                    //Call.Redirect(vgUrlSolicitudRegistro + "?rs=" + vResultado + "&mt=" + vMotivoRechazo);

                    Loading.LoadingClose();
                    $("#moResultado").modal('show');  
                }

            }

        }

        $scope.btnCerrar = function () {
            Call.Redirect("/Seguridad/Usuario/Index");  

        }

        $scope.btnNuevaEvaluacion = function () {
            Call.Redirect("/Comercial/Solicitud/Evaluar");
        }

    }]);