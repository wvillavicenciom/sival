'use strict';

AppSIVAL.controller("Evaluar", ['$scope', 'Message', 'MsgData', 'Call', 'Moment', '$http', 'Loading', '$q',
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

        var colorTextoSA = 'white';
        var colorFondoSA = '#06964E';

        var colorTextoSB = 'white';
        var colorFondoSB = '#36C738';

        var colorTextoSC = 'white';
        var colorFondoSC = '#6B756B';

        var colorTextoSD = 'white';
        var colorFondoSD = '#EB7907';

        var colorTextoSE = 'white';
        var colorFondoSE = '#EB1E07';

        var colorTextoSNA = 'black';
        var colorFondoSNA = '#fce8e6'; 

        var options = {
            series: [50],
            chart: {
                height: 150,
                type: 'radialBar',
            },
            plotOptions: {
                radialBar: {
                    startAngle: -90,
                    endAngle: 90,
                    track: {
                        background: '#e7e7e7',
                        strokeWidth: '97%',
                        margin: 5,
                    },
                    dataLabels: {
                        name: { show: true, color: '#00FF00' },
                        value: {
                            offsetY: -2,
                            fontSize: '32px',
                            formatter: function (val) {
                                return val + ''
                            },
                        },
                    },
                },
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shade: 'light',
                    shadeIntensity: 0.4,
                    inverseColors: false,
                    opacityFrom: 1,
                    opacityTo: 1,
                    stops: [0, 500, 700, 800, 1000],
                },
            },
            stroke: {
                lineCap: 'round',
            },
            labels: [''],
        }

        /*
        var chart = new ApexCharts(document.querySelector('#chart'), options);
        chart.render();
        */

        $(document).ready(function () {

            Call.Get($scope.GenericController + "/TipoDocumentoCombo", null, $scope.EstablecerTipoDocumento);
            Call.Get($scope.GenericController + "/GeneroCombo", null, $scope.EstablecerGenero);
            Call.Get($scope.GenericController + "/ActividadEconomicaCombo", null, $scope.EstablecerActividadEconomica);
            Call.Get($scope.GenericController + "/ConvenioCombo", null, $scope.EstablecerConvenio);
            Call.Get($scope.GenericController + "/DepartamentoCombo", null, $scope.EstablecerDepartamento);

            //$("#moResultado").modal('show'); 
            $("#dvSinEval").fadeIn();
            $("#dvResultado").hide();

            $scope.BloquearControles(false);
        });

        $scope.EstablecerTipoDocumento = function (response) {
            $scope.oListaTipoDocumento = response;
            $scope.ddlTipoDocumento = $scope.oListaTipoDocumento[0];
        }

        $scope.EstablecerGenero = function (response) {
            $scope.oListaGenero = response;
            $scope.ddlGenero = $scope.oListaGenero[0];
        }

        $scope.EstablecerActividadEconomica = function (response) {
            $scope.oListaActividadEconomica = response;
            $scope.ddlActividadEconomica = $scope.oListaActividadEconomica[0];
        }

        $scope.EstablecerConvenio = function (response) {
            $scope.oListaConvenio = response;
            $scope.ddlConvenio = $scope.oListaConvenio[0];
        }

        $scope.EstablecerDepartamento = function (response) {
            $scope.oListaDepartamento = response;
            $scope.ddlDepartamento = $scope.oListaDepartamento[0];
        }

        $scope.btnEvaluar = function () {             
          
            var parametros = {
                pTipoDocumento : $scope.ddlTipoDocumento.id,
                pDocumento: $scope.txtDocumento == undefined ? '' : $scope.txtDocumento,
                pApellidoPaterno: $scope.txtApellidoPaterno == undefined ? '' : $scope.txtApellidoPaterno,
                pApellidoMaterno: $scope.txtApellidoMaterno == undefined ? '' : $scope.txtApellidoMaterno,
                pNombres: $scope.txtNombres == undefined ? '' : $scope.txtNombres,
                pFechaNacimiento: $scope.txtFechaNacimiento == undefined ? '' : $scope.txtFechaNacimiento,
                pGenero : $scope.ddlGenero.id,
                pActividadEconomica: $scope.ddlActividadEconomica.id,
                pConvenio: $scope.ddlConvenio.id,
                pDepartamento: $scope.ddlDepartamento.id,
                pNroCreditos: $scope.txtNroCreditos
            };            

            
            if (parametros.pTipoDocumento == '' || parametros.pTipoDocumento == 0) {
                Message.AlertError("Alerta", "Debe seleccionar tipo de documento");
                return;
            }
            
            if (parametros.pDocumento == '' || parametros.pDocumento.length < 8) {
                Message.AlertError("Alerta", "Debe Ingresar documento");
                return;
            }

            if (parametros.pApellidoPaterno == '' || parametros.pApellidoPaterno.length < 3 || parametros.pApellidoPaterno.length > 50) {
                Message.AlertError("Alerta", "Debe Ingresar Apellido Paterno (50 carac. máx)");
                return;
            }

            if (parametros.pApellidoMaterno == '' || parametros.pApellidoMaterno.length < 3 || parametros.pApellidoMaterno.length > 50) {
                Message.AlertError("Alerta", "Debe Ingresar Apellido Materno (50 carac. máx)");
                return;
            }

            if (parametros.pNombres == '' || parametros.pNombres.length < 5 || parametros.pNombres.length > 50) {
                Message.AlertError("Alerta", "Debe Ingresar Nombres (50 carac. máx)");
                return;
            }

            if (Moment.Valid(parametros.pFechaNacimiento) == false) {
                Message.AlertError("Error", "Fecha de nacimiento inválida!");
                return;
            }

            if (parametros.pGenero == '' || parametros.pGenero == 0) {
                Message.AlertError("Alerta", "Debe seleccionar un género");
                return;
            }

            if (parametros.pActividadEconomica == '' || parametros.pActividadEconomica == 0) {
                Message.AlertError("Alerta", "Debe seleccionar una actividad económica");
                return;
            }

            if (parametros.pConvenio == '' || parametros.pConvenio == 0) {
                Message.AlertError("Alerta", "Debe seleccionar un tipo de convenio");
                return;
            }

            if (parametros.pDepartamento == '' || parametros.pDepartamento == 0) {
                Message.AlertError("Alerta", "Debe seleccionar un departamento");
                return;
            }

            if (parametros.pNroCreditos == '' || parametros.pNroCreditos < 0) {
                Message.AlertError("Alerta", "Debe ingreso un número de créditos");
                return;
            }
            
            Loading.LoadingShow("Vamos Evaluar al Cliente, por favor espere!");
            Call.Get($scope.NameController + '/EvaluarFD', parametros, $scope.EstablecerEvaluar);
            
             
        }

        $scope.EstablecerEvaluar = function (response) {
            if (response != null) {
                //Cuando se pre-aprobó
                if (response.st == 1) {

                    var segmento = response.dato_a;
                    var pd = response.dato_b * 100

                    let colorTexto = '';
                    let colorFondo = '';

                    // Lógica para asignar el color
                    if (segmento === 'A') {
                        colorTexto = colorTextoSA;
                        colorFondo = colorFondoSA;
                    } else if (segmento === 'B') {
                        colorTexto = colorTextoSB;
                        colorFondo = colorFondoSB;
                    }
                    else if (segmento === 'C') {
                        colorTexto = colorTextoSC;
                        colorFondo = colorFondoSC;
                    }
                    else if (segmento === 'D') {
                        colorTexto = colorTextoSD;
                        colorFondo = colorFondoSD;
                    }
                    else if (segmento === 'E') {
                        colorTexto = colorTextoSE;
                        colorFondo = colorFondoSE;
                    }
                    else {
                        colorTexto = colorTextoSNA;
                        colorFondo = colorFondoSNA;
                    }

                    $('#hdSegmento').css({
                        'background-color': colorFondo,
                        'color': colorTexto
                    });

                    $scope.Segmento = segmento;
                    $scope.PDEstimada = parseFloat(pd.toFixed(2)) + "%";

                    $("#resultado_eval").removeClass("text-danger");
                    $("#resultado_eval").addClass("text-success");

                    $("#motivo_eval").removeClass("text-danger");
                    $("#motivo_eval").addClass("text-success");

                    $("#dvResultado").slideDown("fast");
                    $("#dvSinEval").hide();

                    Message.AlertSuccess("Correcto", "La evaluación del cliente fue exitosa!!!!");

                    $scope.BloquearControles(true);

                }
                //Cuando se rechazó
                else if (response.st == 0) {

                    $scope.resultado_eval = response.msg;
                    $scope.motivo_eval = response.dato;

                    $("#resultado_eval").removeClass("text-success");
                    $("#resultado_eval").addClass("text-danger");

                    $("#motivo_eval").removeClass("text-success");
                    $("#motivo_eval").addClass("text-danger");

                    $("#dvResultado").slideDown("fast");
                    $("#dvSinEval").hide();

                    Message.AlertError("Advertencia", "El cliente no cumple los parámetros de aprobación!");                   

                } else {
                    Message.AlertError("Error", "Resultado inconsistente, vuelva a simular!");      
                }
            } else {
                Message.AlertError("Error", "Resultado inconsistente, vuelva a simular!");   
            }
            Loading.LoadingClose();
        }

        $scope.btnCerrar = function () {
            //Call.Redirect("/Seguridad/Usuario/Index");  
        }

        $scope.btnNuevaEvaluacion = function () {

            $scope.ddlTipoDocumento = $scope.oListaTipoDocumento[0];
            $scope.txtDocumento = "";
            $scope.txtApellidoPaterno = "";
            $scope.txtApellidoMaterno = "";
            $scope.txtNombres = "";
            $scope.txtFechaNacimiento = "";
            $scope.ddlGenero = $scope.oListaGenero[0];
            $scope.ddlActividadEconomica = $scope.oListaActividadEconomica[0];
            $scope.ddlConvenio = $scope.oListaConvenio[0];
            $scope.ddlDepartamento = $scope.oListaDepartamento[0];
            $scope.txtNroCreditos = "";


            $("#dvSinEval").fadeIn();
            $("#dvResultado").hide();

            $scope.BloquearControles(false);
        }


        /*
        true : para bloquear los controles
        false : para habilitar controles
        */
        $scope.BloquearControles = function (pValue) {
            $scope.ddlTipoDocumento_Disable = pValue;
            $scope.txtDocumento_Disable = pValue;
            $scope.txtApellidoPaterno_Disable = pValue;
            $scope.txtApellidoMaterno_Disable = pValue;
            $scope.txtNombres_Disable = pValue;
            $scope.txtFechaNacimiento_Disable = pValue;
            $scope.ddlGenero_Disable = pValue;
            $scope.ddlActividadEconomica_Disable = pValue;
            $scope.ddlConvenio_Disable = pValue;
            $scope.ddlDepartamento_Disable = pValue;
            $scope.txtNroCreditos_Disable = pValue;
            $scope.btnEvaluar_Disable = pValue;
        }

    }]);