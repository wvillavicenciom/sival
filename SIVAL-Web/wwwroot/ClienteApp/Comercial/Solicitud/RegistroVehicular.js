'use strict';

AppSIVAL.controller("RegistroVehicular", ['$scope', 'Message', 'MsgData', 'Call', 'Moment', '$http', 'Loading', '$q',
    function ($scope, Message, MsgData, Call, Moment, $http, Loading, $q, TaGeneric) {

        $scope.NameController = "/Comercial/Solicitud";
        $scope.GenericController = "/Seguridad/Generico";
        $scope.ClienteController = "/Administracion/Cliente";
        $scope.idModulo = 99;
        $scope.idSubModulo = 1;
        $scope.idOpcion = 1;

        //variables para habilitar o desabilitar permisos
        $scope.HabilitaVer = false;
        $scope.HabilitaNuevo = false;
        $scope.HabilitaActualizar = false;
        $scope.HabilitaEliminar = false;
        $scope.HabilitaExportar = false;

        $scope.vgTituloSolicitud = "";
        $scope.rbtPlan = 0;

        $scope.oListaModelo = [{ id: 0, nombre: "<--Selecciones-->" }];
        $scope.oListaProvincia = [{ id: 0, nombre: "<--Selecciones-->" }];
        $scope.oListaDistrito = [{ id: 0, nombre: "<--Selecciones-->" }];
        $scope.oListaMarca = [{ id: 0, nombre: "<--Selecciones-->" }];
        $scope.oListaModelo = [{ id: 0, nombre: "<--Selecciones-->" }];

        $scope.ddlProvincia = $scope.oListaProvincia[0];
        $scope.ddlDistrito = $scope.oListaDistrito[0];
        $scope.ddlMarca = $scope.oListaMarca[0];
        $scope.ddlModelo = $scope.oListaModelo[0];


        $scope.vUltPorcNormal = 0.0;
        $scope.vUltCalificacion = 0;
        $scope.vVarDeudaT1 = 0;
        $scope.vVarDeudaT2 = 0;
        $scope.vVarLineaDisponibleT1 = 0;
        $scope.vCargaActual = 0;
        $scope.vPorcVarCarga = 0;
        $scope.vCargaT1 = 0;
        $scope.vDiasAtraso6M = 0;
        $scope.vDiasAtraso12M = 0;


        //inicializando valores de los gráficos
        var date = moment(); //Get the current date
        var fecha_1 = date.add(-1, "M").format("YYYY-MM");
        var fecha_2 = date.add(-2, "M").format("YYYY-MM");
        var fecha_3 = date.add(-3, "M").format("YYYY-MM");
        var fecha_4 = date.add(-4, "M").format("YYYY-MM");
        var fecha_5 = date.add(-5, "M").format("YYYY-MM");
        var fecha_6 = date.add(-6, "M").format("YYYY-MM");
        var fecha_7 = date.add(-7, "M").format("YYYY-MM");
        var fecha_8 = date.add(-8, "M").format("YYYY-MM");
        var fecha_9 = date.add(-9, "M").format("YYYY-MM");
        var fecha_10 = date.add(-10, "M").format("YYYY-MM");
        var fecha_11 = date.add(-11, "M").format("YYYY-MM");
        var fecha_12 = date.add(-12, "M").format("YYYY-MM");

        var Periodos = [
            fecha_1,
            fecha_2,
            fecha_3,
            fecha_4,
            fecha_5,
            fecha_6,
            fecha_7,
            fecha_8,
            fecha_9,
            fecha_10,
            fecha_11,
            fecha_12
        ];

        var PeriodosDeudas = [
            fecha_1,
            fecha_2,
            fecha_3,
            fecha_4,
            fecha_5,
            fecha_6,
            fecha_7,
            fecha_8,
            fecha_9,
            fecha_10,
            fecha_11
        ];

        var PeriodosClasificacion = [
            fecha_1,
            fecha_2,
            fecha_3,
            fecha_4,
            fecha_5,
            fecha_6,
            fecha_7,
            fecha_8,
            fecha_9,
            fecha_10,
            fecha_11,
            fecha_12
        ];

        var dataDeudas = {
            labels: PeriodosDeudas,
            datasets: [{
                label: 'Total',
                borderColor: '#31B404',
                data: [0, 0, 0, 0, 0, 0, 0]
            }, {
                label: 'Vehicular',
                borderColor: '#8258FA',
                data: [0, 0, 0, 0, 0, 0, 0]
            },
            {
                label: 'Consumo',
                borderColor: '#FAAC58',
                data: [0, 0, 0, 0, 0, 0, 0]
            },
            {
                label: 'Hipotecario',
                borderColor: '#2E9AFE',
                data: [0, 0, 0, 0, 0, 0, 0]
            }, {
                label: 'Linea Disponible',
                borderColor: '#BDBDBD',
                data: [0, 0, 0, 0, 0, 0, 0]
            }, {
                label: 'Castigo',
                borderColor: '#B40404',
                data: [0, 0, 0, 0, 0, 0, 0]
            }, {
                label: 'Refinanciado',
                borderColor: '#1C1C1C',
                data: [0, 0, 0, 0, 0, 0, 0]
            }]
        };

        var dataClasificacion = {
            labels: PeriodosClasificacion,
            datasets: [{
                label: 'NOR',
                backgroundColor: '#04B404',
                borderColor: '#04B404',
                data: [100, 100, 100, 100, 100, 100, 50]
            }, {
                label: 'CPP',
                backgroundColor: '#0080FF',
                borderColor: '#0080FF',
                data: [0, 0, 0, 0, 0, 0, 0]
            },
            {
                label: 'DEF',
                backgroundColor: '#A4A4A4',
                borderColor: '#A4A4A4',
                data: [0, 0, 0, 0, 0, 0, 0]
            },
            {
                label: 'DUD',
                backgroundColor: '#000000',
                borderColor: '#000000',
                data: [0, 0, 0, 0, 0, 0, 0]
            }, {
                label: 'PER',
                backgroundColor: '#FF0000',
                borderColor: '#FF0000',
                data: [0, 0, 0, 0, 0, 0, 0]
            }]
        };

        var dataClasificacionEmpresas = {
            labels: Periodos,
            datasets: [{
                label: 'Max Clasificación',
                borderColor: '#31B404',
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            }, {
                label: 'Empresas con Deuda',
                borderColor: '#8258FA',
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            }]
        };

        var dataCargaMensual = {
            labels: Periodos,
            datasets: [{
                label: 'Carga Mensual',
                borderColor: '#31B404',
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            }]
        };

        var configDeudas = {
            type: 'line',
            data: dataDeudas,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top'
                    },
                    title: {
                        display: true,
                        text: 'Evolución de Deudas'
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Periodo'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Deudas'
                        },
                        min: 0
                    }
                }

            }
        };

        var configClasificacion = {
            type: 'line',
            data: dataClasificacion,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top'
                    },
                    title: {
                        display: true,
                        text: 'Evolución de clasificación'
                    }
                }
            },
        };

        var configClasificacionEmpresas = {
            type: 'line',
            data: dataClasificacionEmpresas,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top'
                    },
                    title: {
                        display: true,
                        text: 'Evolución de Clasificación & Empresas con Deuda'
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Periodo'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Clasificación & Empresas'
                        },
                        min: 0
                    }
                }

            }
        };

        var configCargaMensual = {
            type: 'line',
            data: dataCargaMensual,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top'
                    },
                    title: {
                        display: true,
                        text: 'Evolución de Carga Mensual'
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Periodo'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Carga Mensual'
                        },
                        min: 0
                    }
                }

            }
        };

        var mcDeudas = new Chart(
            document.getElementById('mcDeudas'),
            configDeudas
        );

        var mcClasificacion = new Chart(
            document.getElementById('mcClasificacion'),
            configClasificacion
        );

        var mcClasificacionEmpresas = new Chart(
            document.getElementById('mcClasificacionEmpresas'),
            configClasificacionEmpresas
        );

        var mcCargaMensual = new Chart(
            document.getElementById('mcCargaMensual'),
            configCargaMensual
        );

        /*
        var myDiagram = new go.Diagram('myDiagramDiv', {
            // have mouse wheel events zoom in and out instead of scroll up and down
            'toolManager.mouseWheelBehavior': go.WheelMode.Zoom,
            // support double-click in background creating a new node
            'clickCreatingTool.archetypeNodeData': { text: 'new node' },
            linkReshapingTool: new CurvedLinkReshapingTool(),
            // enable undo & redo
            'undoManager.isEnabled': true
        });
        */

        $(document).ready(function () {


            Call.Get($scope.GenericController + "/TipoDocumentoCombo", null, $scope.EstablecerTipoDocumento);
            Call.Get($scope.GenericController + "/CategoriaLaboralCombo", null, $scope.EstablecerCategoriaLaboral);
            Call.Get($scope.GenericController + "/DepartamentoCombo", null, $scope.EstablecerDepartamento);
            //Call.Get("/Administracion/MarcaModelo/ListarMarcaCombo", null, $scope.EstablecerMarca);
            Call.Get($scope.GenericController + "/SeguroBienCombo", null, $scope.EstablecerSeguroBien);
            Call.Get($scope.GenericController + "/PlazoVehicularCombo", null, $scope.EstablecerPlazos);
            Call.Get($scope.GenericController + "/ResultadoEvaluacionCombo", null, $scope.EstablecerResultadoEvaluacion);
            Call.Get($scope.GenericController + "/MotivoRechazoCombo", null, $scope.EstablecerMotivoEvaluacion);
            Call.Get($scope.GenericController + "/ResultadoEvaluacionCombo", null, $scope.EstablecerResultadoValidacion);
            Call.Get($scope.GenericController + "/MotivoRechazoCombo", null, $scope.EstablecerMotivoValidacion);
            Call.Get($scope.GenericController + "/TipoDocumentoAdjuntoCombo", null, $scope.EstablecerTipoDocumentoAdjunto);

            //Call.PostAjax(false, '/Seguridad/Usuario/ObtnerPerfil', null, $scope.EstablecerPerfil);

            $scope.ddlModelo = $scope.oListaModelo[0];


            var strParametro = location.search.replace('?', '');
            var arParametros = strParametro.split('&');

            if (arParametros.length > 0) {
                var vIdSolicitud = arParametros[0].split("=")[1];
                $scope.id_solicitud_sel = vIdSolicitud;

                $scope.vgTituloSolicitud = " - Solicitud N° " + vIdSolicitud;

                //Si esque existe el trato se obtiene los datos de la cotización ya registrada
                if (vIdSolicitud > 0) {

                    Loading.LoadingShow("Cargando datos de la solicitud, por favor espere!");

                    $scope.ddlTipoDocumento_Disable = true;
                    $scope.txtDocumento_Disable = true;

                    var parEdit = { pIdSolicitud: vIdSolicitud }

                    setTimeout(Call.Get($scope.NameController + "/Obtener", parEdit, $scope.btnEditar), 4000);
                }
            }
            else {
                $scope.id_solicitud_sel = null;
            }

            console.log("vgPerfil");
            console.log(vgPerfil);

            if (vgPerfil == null || vgPerfil == 0) {
                $scope.BloqueoTotal();
            }

            $scope.inicializar_flujograma();


        });

        $scope.EstablecerPerfil = function (response) {

            console.log("Perfil-X");
            console.log(response);

            if (response == null || response.dato == null) {
                $scope.CerrarSession();

            } else {
                $scope.vgUser = response.dato;
                vgPerfil = response.dato_b;
            }

        }

        $scope.CerrarSession = function () {

            console.log("Cerrando Sessión");

            Call.PostAjax(false, '/Seguridad/Usuario/CerrarSession', null, null, null);

            Call.Redirect(vgUrlLogin);

        }

        $scope.btnEvaluar = function () {

            //var parametros = {
            //    pUsuario: $scope.txtUsuario == undefined ? '' : $scope.txtUsuario,
            //    pClave: $scope.txtClave == undefined ? '' : $scope.txtClave
            //};
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
            //Call.Get($scope.NameController + '/ValidarInicio', parametros, $scope.EstablecerLogin);
            Call.Redirect(vgUrlSolicitudRegistro);
        }

        $scope.btnCambioMarca = function () {

            $scope.id_marca_sel = $scope.ddlMarca.id;

            //Call.Get("/Administracion/MarcaModelo/ListarModeloCombo", { pIdMarca: $scope.id_marca_sel }, $scope.EstablecerModelo);

        }

        $scope.btnCambioDepartamento = function () {

            $scope.id_marca_sel = $scope.ddlMarca.id;

            Call.Get($scope.GenericController + "/ProvinciaCombo", { pIdDepartamento: $scope.ddlDepartamento.id }, $scope.EstablecerProvincia);

        }

        $scope.btnCambioProvincia = function () {

            Call.Get($scope.GenericController + "/DistritoCombo", { pIdDepartamento: $scope.ddlDepartamento.id, pIdProvincia: $scope.ddlProvincia.id }, $scope.EstablecerDistrito);

        }

        $scope.btnCambioSeguro = function () {

            angular.forEach($scope.oListaSeguro, function (item) {
                if (item.id == $scope.ddlSeguro.id) {
                    $scope.txtTasaSeguro = item.valor * 100.00;
                }
            });

        }

        $scope.EstablecerTipoDocumento = function (response) {

            $scope.oListaTipoDocumento = response;
            $scope.ddlTipoDocumento = $scope.oListaTipoDocumento[0];

        }

        $scope.EstablecerCategoriaLaboral = function (response) {

            $scope.oListaCategoriaLaboral = response;
            $scope.ddlCategoriaLaboral = $scope.oListaCategoriaLaboral[0];

        }

        $scope.EstablecerDepartamento = function (response) {

            $scope.oListaDepartamento = response;
            $scope.ddlDepartamento = $scope.oListaDepartamento[0];

        }

        $scope.EstablecerMarca = function (response) {

            $scope.oListaMarca = response;
            $scope.ddlMarca = $scope.oListaMarca[0];

        }

        $scope.EstablecerModelo = function (response) {

            $scope.oListaModelo = response;
            $scope.ddlModelo = $scope.oListaModelo[0];

        }

        $scope.EstablecerModeloEditar = function (response) {

            $scope.oListaModelo = response;
            angular.forEach($scope.oListaModelo, function (item) {
                if (item.id == $scope.id_marca_modelo_sel) {
                    $scope.ddlModelo = item;
                }
            });
        }

        $scope.EstablecerPlazos = function (response) {

            $scope.oListaPlazo = response;
            $scope.ddlPlazo = $scope.oListaPlazo[0];

        }

        $scope.EstablecerSeguroBien = function (response) {

            $scope.oListaSeguro = response;
            $scope.ddlSeguro = $scope.oListaSeguro[0];
        }

        $scope.EstablecerResultadoEvaluacion = function (response) {

            $scope.oListaResultadoEvaluacion = response;
            $scope.ddlResultadoEvaluacion = $scope.oListaResultadoEvaluacion[0];
        }

        $scope.EstablecerResultadoValidacion = function (response) {

            $scope.oListaResultadoValidacion = response;
            $scope.ddlResultadoValidacion = $scope.oListaResultadoValidacion[0];
        }

        $scope.EstablecerMotivoEvaluacion = function (response) {

            $scope.oListaMotivoEvaluacion = response;
            $scope.ddlMotivoEvaluacion = $scope.oListaMotivoEvaluacion[0];

        }

        $scope.EstablecerMotivoValidacion = function (response) {

            $scope.oListaMotivoValidacion = response;
            $scope.ddlMotivoValidacion = $scope.oListaMotivoValidacion[0];

        }

        $scope.EstablecerProvincia = function (response) {

            $scope.oListaProvincia = response;
            $scope.ddlProvincia = $scope.oListaProvincia[0];

        }

        $scope.EstablecerDistrito = function (response) {

            $scope.oListaDistrito = response;
            $scope.ddlDistrito = $scope.oListaDistrito[0];

        }

        $scope.EstablecerProvinciaEditar = function (response) {

            $scope.oListaProvincia = response;

            angular.forEach($scope.oListaProvincia, function (item) {
                if (item.id == $scope.id_provincia_sel) {
                    $scope.ddlProvincia = item;
                }
            });

        }

        $scope.EstablecerDistritoEditar = function (response) {

            $scope.oListaDistrito = response;

            angular.forEach($scope.oListaDistrito, function (item) {
                if (item.id == $scope.id_distrito_sel) {
                    $scope.ddlDistrito = item;
                }
            });
        }

        $scope.btnEstablecerPlazos = function (response) {

            $scope.oListaPlazosSolicitud = response;
        }

        $scope.EstablecerTipoDocumentoAdjunto = function (response) {

            $scope.oListaTipoDocumentoAdjunto = response;
            $scope.ddlTipoDocumentoAdj = $scope.oListaTipoDocumentoAdjunto[0];
        }



        $scope.btnEditar = function (response){

            if (response != null) {

                console.log("Datos Encontrados");
                console.log(response);

                $scope.etapa_solicitud_sel = response.i007_etapa_solicitud;

                //PESTAÑA DATOS
                angular.forEach($scope.oListaTipoDocumento, function (item) {
                    if (item.id == response.i002_tipo_documento) {
                        $scope.ddlTipoDocumento = item;
                    }
                });

                angular.forEach($scope.oListaCategoriaLaboral, function (item) {
                    if (item.id == response.i003_categoria_laboral) {
                        $scope.ddlCategoriaLaboral = item;
                    }
                });

                $scope.txtDocumento = response.documento;
                $scope.txtApellidoPaterno = response.apellido_paterno;
                $scope.txtApellidoMaterno = response.apellido_materno;
                $scope.txtNombres = response.nombres;

                var vNacimiento = Moment.formatASP_DDMMYYYY(response.fecha_nacimiento);
                var vFechaNacimiento = new Date(Moment.formatToDate(vNacimiento, "DD/MM/YYYY"));
                $scope.txtFechaNacimiento = vFechaNacimiento;

                $scope.txtIngresoBruto = response.mto_ingreso_bruto;

                var vFechaIngLaboral = Moment.formatASP_DDMMYYYY(response.fecha_ingreso_laboral);
                var vFechaIngresoLaboral = new Date(Moment.formatToDate(vFechaIngLaboral, "DD/MM/YYYY"));
                $scope.txtFechaIngresoLaboral = vFechaIngresoLaboral;


                $scope.txtTelefono = response.telefono;
                $scope.txtCorreo = response.correo;

                $scope.id_departamento_sel = response.id_departamento == null ? 0 : response.id_departamento ;
                $scope.id_provincia_sel = response.id_provincia == null ? 0 : response.id_provincia;
                $scope.id_distrito_sel = response.id_distrito == null ? 0 : response.id_distrito;

                angular.forEach($scope.oListaDepartamento, function (item) {
                    if (item.id == $scope.id_departamento_sel) {
                        $scope.ddlDepartamento = item;
                    }
                });

                Call.Get($scope.GenericController + "/ProvinciaCombo", { pIdDepartamento: $scope.id_departamento_sel }, $scope.EstablecerProvinciaEditar);
                Call.Get($scope.GenericController + "/DistritoCombo", { pIdDepartamento: $scope.id_departamento_sel, pIdProvincia: $scope.id_provincia_sel }, $scope.EstablecerDistritoEditar);

                $scope.txtDireccion = response.direccion;
                $scope.txtReferencia = response.referencia;


                //PESTAÑA DE OFERTAS
                $scope.txtPrecioBien = response.mto_precio_bien;
                $scope.txtInicialBien = response.mto_inicial_bien;
                $scope.txtTasaSeguro = response.porc_seguro_bien * 100.00;
                $scope.txtTasaSeguro_desem = response.porc_seguro_bien * 100.00;
                $scope.txtTEA = response.tea*100;
                $scope.lbPrecioBienMin = response.mto_precio_bien_min;
                $scope.lbPrecioBienMax = response.mto_precio_bien_max;
                $scope.lbPorcInicialBienMin = response.porc_inicial_bien_min;
                $scope.lbPorcInicialBienMax = response.porc_inicial_bien_max;

                angular.forEach($scope.oListaSeguro, function (item) {
                    if (item.id == response.i008_seguro_bien) {
                        $scope.ddlSeguro = item;
                        $scope.ddlSeguro_desem = item;
                    }
                });

                //listado los plazos
                Call.Get($scope.NameController + "/ListarPlazos", { pIdSolicitud: $scope.id_solicitud_sel }, $scope.btnEstablecerPlazos)


                //PESTAÑA DE DESEMBOLSO
                $scope.txtTasaSeguroBien_desem = response.porc_tasa_seguro_bien;
                $scope.txtPrecioBien_desem = response.mto_precio_bien;
                $scope.txtInicialBien_desem = response.mto_inicial_bien;
                $scope.txtFinanciado_desem = response.mto_financiar;
                $scope.txtTEA_desem = response.tea*100.00;
                $scope.txtCuota_desem = response.mto_cuota;
                $scope.txtFechaInicio_desem = response.fecha_inicio_cronograma;

                angular.forEach($scope.oListaPlazo, function (item) {
                    $("#dvPlazo_" + response.plazo).removeClass("bg-success");
                    if (item.nombre == response.plazo) {
                        $scope.ddlPlazo = item;
                        $("#dvPlazo_60").addClass("bg-success");
                    } else {
                        if (item.nombre != "<--SELECCIONE-->") {
                            var dvNombre = "#dvPlazo_" + item.nombre;
                            $(dvNombre).addClass("bg-light");
                        }                        
                    }
                });

                

                $scope.id_marca_sel = response.id_marca;
                $scope.id_marca_modelo_sel = response.id_marca_modelo;
                angular.forEach($scope.oListaMarca, function (item) {
                    if (item.id == $scope.id_marca_sel) {
                        $scope.ddlMarca = item;
                    }
                });
                //listado de modelo               
                //Call.Get("/Administracion/MarcaModelo/ListarModeloCombo", { pIdMarca: $scope.id_marca_sel }, $scope.EstablecerModeloEditar);


                //LISTANDO CRONOGRAMA

                //PESTAÑA DE DOCUMENTOS
                angular.forEach($scope.oListaResultadoValidacion, function (item) {
                    if (item.id == response.i004_resultado_eval_validador) {
                        $scope.ddlResultadoValidacion = item;
                    }
                });

                angular.forEach($scope.oListaMotivoValidacion, function (item) {
                    if (item.id == response.i005_motivo_eval_validador) {
                        $scope.ddlMotivoValidacion = item;
                    }
                });
                $scope.txtComentarioValidacion = response.comentario_eval_validador;

                //PESTAÑA EVALUACIÓN
                $scope.txtRMI = response.rmi;
                $scope.txtRCI = response.rci;
                $scope.txtRSFI = response.rsfi;
                $scope.txtRTI = response.rti;
                $scope.txtCargaInterna = response.mto_carga_interna;
                $scope.txtCargaExterna = response.mto_carga_externa;

                $scope.txtNumeroSolicitudes = response.cant_solicitudes_mes;
                $scope.txtNumeroSolicitudesAPR = response.cant_solicitudes_apr_mes;
                $scope.txtNumeroSolicitudesRCH = response.cant_solicitudes_rch_mes;

                $scope.txtOperaciones = response.cant_operaciones;
                $scope.txtAtrasoActual = response.dias_atraso_actual;
                $scope.txtDeudaInterna = response.mto_deuda_interna;
                $scope.txtUltimoIngreso = response.mto_ult_ingreso;


                angular.forEach($scope.oListaResultadoEvaluacion, function (item) {
                    if (item.id == response.i004_resultado_eval_analista) {
                        $scope.ddlResultadoEvaluacion = item;
                    }
                });

                angular.forEach($scope.oListaMotivoEvaluacion, function (item) {
                    if (item.id == response.i005_motivo_eval_analista) {
                        $scope.ddlMotivoEvaluacion = item;
                    }
                });

                $scope.txtComentarioEvaluacion = response.comentario_eval_analista;
                $scope.txtFechaUltimaEvaluacion = response.fecha_ult_evaluacion;


                //LISTANDO LOS DOCUMENTOS
                //$scope.CargarDocumentos($scope.id_solicitud_sel);               
                //Call.Get($scope.NameController + "/ListarDocumentos", { pIdSolicitud: $scope.id_solicitud_sel }, $scope.EstablecerDocumentos);


                //listando datos del sistema financiero
                //Call.Get($scope.ClienteController + "/ListarDeudasRCC", { pTipoPersona: 1, pTipoDocumento: 1, pDocumento: response.documento }, $scope.EstablecerDatosSF);

                //cargando historico de evaluaciones
                //$scope.btnListarHistoricoValidacion();

                //cuando la etapa de la solicitud es de rechazo fd o de anulado
                if (response.i007_etapa_solicitud == 35 || response.i007_etapa_solicitud == 40 || response.i007_etapa_solicitud == 41 || response.i007_etapa_solicitud == 42) {
                    $scope.BloqueoTotal();
                }
                //para bloquean cuando está en validación de documentos
                else if ((response.i007_etapa_solicitud == 36) && (vgPerfil == 69)) {
                    $scope.BloqueoEnValidacion();
                }

                //para bloquean cuando está en evaluación
                else if ((response.i007_etapa_solicitud == 37) && (vgPerfil == 68)) {
                    $scope.BloqueoEnEvaluación();
                }

                else if ((response.i007_etapa_solicitud == 36 || response.i007_etapa_solicitud == 37) && (vgPerfil == 66 || vgPerfil == 67)) {
                    $scope.BloqueoTotal();
                }

                else if ((response.i007_etapa_solicitud == 33 || response.i007_etapa_solicitud == 38 || response.i007_etapa_solicitud == 39) && (vgPerfil == 66 || vgPerfil == 67)) {
                    $scope.BloqueoEnRegistro();
                }
                else {
                    $scope.BloqueoTotal();
                }

                

                setTimeout(function () {
                    //habilitando el botón de avanzar
                    if ((response.i007_etapa_solicitud == 33 || response.i007_etapa_solicitud == 34) && (vgPerfil == 66 || vgPerfil == 67)) {

                        var pSolicitudRQ = $scope.ObtenerEntidad();
                        //Validando Datos de cliente
                        var vValidoDatosCliente = $scope.ValidarDatosClientes(pSolicitudRQ);
                        var vValidoDatosOfertas = $scope.ValidarDatosOfertas(pSolicitudRQ);
                        var vValidoDatosDesembolso = $scope.ValidarDatosDesembolso(pSolicitudRQ);

                        if (vValidoDatosCliente == "" && vValidoDatosOfertas == "" && vValidoDatosDesembolso == "") {
                            $scope.btnAvanzar_Disable = false;
                        } else {
                            $scope.btnAvanzar_Disable = true;
                        }
                    } 
                }, 3000);

                setTimeout(function () {
                    $("#dvPlazo_" + response.plazo).addClass("bg-success");                    
                }, 2000);
                                        
                Message.AlertSuccess("Solicitud Encontrada", "vamos a cargar los datos de la solicitud");

            }

            Loading.LoadingClose();            
        }

        $scope.btnEscogerPlazo = function (pPlazo) {
            console.log("Plazo Seleccionado : " + pPlazo);

            if (($scope.etapa_solicitud_sel == 33 || $scope.etapa_solicitud_sel == 34) && (vgPerfil == 66 || vgPerfil == 67)) {
                angular.forEach($scope.oListaPlazo, function (item) {
                    if (item.nombre != "<--SELECCIONE-->") {
                        $("#dvPlazo_" + item.nombre).removeClass("bg-success");
                    }
                });

                $("#dvPlazo_" + pPlazo).addClass("bg-success");
            }            
        }

        $scope.EstablecerDatosSF = function (response) {

            console.log("Deudas SF");
            console.log(response);

            var vPeriodos = [];
            var vnor = [];
            var vcpp = [];
            var vdef = [];
            var vdud = [];
            var vper = [];

            var vtotal = [];
            var vvehicular = [];
            var vconsumo = [];
            var vhipotecario = [];
            var vlinea_disponible = [];
            var vcastigo = [];
            var vrefinanciado = [];
            var vjudicial = [];

            var vCalificaciones = [];
            var vEmpresas = [];
            var vCargaMensual = [];


            angular.forEach(response, function (value, key) {
                vPeriodos.push(value.periodo);
                vnor.push(value.porc_nor);
                vcpp.push(value.porc_cpp);
                vdef.push(value.porc_def);
                vdud.push(value.porc_dud);
                vper.push(value.porc_per);

                vtotal.push(value.total);
                vvehicular.push(value.vehicular);
                vconsumo.push(value.consumo);
                vhipotecario.push(value.hipotecario);
                vlinea_disponible.push(value.linea_disponible);
                vcastigo.push(value.castigo);
                vrefinanciado.push(value.refinanciado);
                vjudicial.push(value.judicial);

                vCalificaciones.push(value.clasificacion_max);
                vEmpresas.push(value.empresas_deuda);
                vCargaMensual.push(value.carga_mensual);
            });


            var pDatosDeudas = {
                periodos: vPeriodos,
                total: vtotal,
                vehicular: vvehicular,
                consumo: vconsumo,
                hipotecario: vhipotecario,
                linea_disponible: vlinea_disponible,
                castigo: vcastigo,
                refinanciado: vrefinanciado,
                judicial: vjudicial
            };
            /*backgroundColor: '#31B404',  */
            dataDeudas = {
                labels: pDatosDeudas.periodos,
                datasets: [{
                    label: 'Total',
                    borderColor: '#31B404',                                       
                    data: pDatosDeudas.total
                }, {
                    label: 'Vehicular',
                        borderColor: '#8258FA',
                        data: pDatosDeudas.vehicular
                },
                {
                    label: 'Consumo',
                    borderColor: '#FAAC58',
                    data: pDatosDeudas.consumo
                },
                {
                    label: 'Hipotecario',
                    borderColor: '#2E9AFE',
                    data: pDatosDeudas.hipotecario
                },
                    {
                    label: 'Linea Disponible',
                    borderColor: '#BDBDBD',
                    data: pDatosDeudas.linea_disponible
                    },
                {
                    label: 'Castigo',
                    borderColor: '#B40404',
                    data: pDatosDeudas.castigo
                },
                {
                    label: 'Refinanciado',
                    borderColor: '#1C1C1C',
                    data: pDatosDeudas.refinanciado
                    }
                ]
            };

            configDeudas = {
                type: 'line',
                data: dataDeudas,
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top'
                        },
                        title: {
                            display: true,
                            text: 'Evolución de Deudas'
                        }
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Periodo'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Deudas'
                            },
                            min: 0
                        }
                    }
                }
            };            


            //Grafico de deudas
            mcDeudas.destroy();

            document.getElementById('mcDeudas').style.height = "15vh";
            mcDeudas = new Chart(
                document.getElementById('mcDeudas'),
                configDeudas
            );


            //Gráficos de porcentaje de calificación
            dataClasificacion = {
                labels: vPeriodos,
                datasets: [{
                    label: 'NOR',
                    borderColor: '#04B404',
                    backgroundColor: '#04B404',
                    data: vnor
                }, {
                    label: 'CPP',
                    borderColor: '#0080FF',
                    backgroundColor: '#0080FF',
                    data: vcpp
                },
                {
                    label: 'DEF',
                    borderColor: '#A4A4A4',
                    backgroundColor: '#A4A4A4',
                    data: vdef
                },
                {
                    label: 'DUD',
                    borderColor: '#000000',
                    backgroundColor: '#000000',
                    data: vdud
                }, {
                    label: 'PER',
                    borderColor: '#FF0000',
                    backgroundColor: '#FF0000',
                    data: vper
                }]
            };

            configClasificacion = {
                type: 'bar',
                data: dataClasificacion,
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top'
                        },
                        title: {
                            display: true,
                            text: 'Evolución de clasificación'
                        }
                    }, scales: {
                        x: {
                            stacked: true,
                        },
                        y: {
                            stacked: true
                        }
                    }
                },
            };

            /*configClasificacion = {
                type: 'line',
                data: dataClasificacion,
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top'
                        },
                        title: {
                            display: true,
                            text: 'Evolución de clasificación'
                        }
                    }
                },
            };*/

            mcClasificacion.destroy();

            document.getElementById('mcClasificacion').style.height = "15vh";
            mcClasificacion = new Chart(
                document.getElementById('mcClasificacion'),
                configClasificacion
            );





            //Clasificación & Empresas
            dataClasificacionEmpresas = {
                labels: vPeriodos,
                datasets: [{
                    label: 'Calificación',
                    borderColor: '#31B404',
                    data: vCalificaciones
                }, {
                    label: 'Empresas',
                    borderColor: '#8258FA',
                    data: vEmpresas
                }]
            };

            configClasificacionEmpresas = {
                type: 'line',
                data: dataClasificacionEmpresas,
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top'
                        },
                        title: {
                            display: true,
                            text: 'Evolución de Calificación & Empresas (#)'
                        }
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Periodo'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: '#'
                            },
                            min: 0
                        }
                    }

                }
            };

            mcClasificacionEmpresas.destroy();

            document.getElementById('mcClasificacionEmpresas').style.height = "15vh";
            mcClasificacionEmpresas = new Chart(
                document.getElementById('mcClasificacionEmpresas'),
                configClasificacionEmpresas
            );



            //Carga Mensual
            var dataCargaMensual = {
                labels: Periodos,
                datasets: [{
                    label: 'Carga Mensual',
                    borderColor: '#31B404',
                    data: vCargaMensual
                }]
            };

            configCargaMensual = {
                type: 'line',
                data: dataCargaMensual,
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top'
                        },
                        title: {
                            display: true,
                            text: 'Evolución de Carga Mensual'
                        }
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Periodo'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Carga Mensual'
                            },
                            min: 0
                        }
                    }

                }
            };

            mcCargaMensual.destroy();

            document.getElementById('mcCargaMensual').style.height = "15vh";
            mcCargaMensual = new Chart(
                document.getElementById('mcCargaMensual'),
                configCargaMensual
            );


            //mostrando los indicadores
            var vUltPorcNormal = null;
            var vUltClasificacion = null;
            var vstrUltClasificacion = null;
            var vVarDeudaT1 = null;
            var vVarDeudaT2 = null;
            var vVarLineaDisponibleT1 = null;
            var vCargaActual = null;
            var vVarCargaT1 = null;
            var vCargaT1 = null;
            var vDiasAtraso1M = null;
            var vDiasAtraso6M = null;
            var vDiasAtraso12M = null;


            if (response.length > 0) {
                vUltPorcNormal = response[0].porc_nor; 
                vUltClasificacion = response[0].clasificacion_max;
                vVarDeudaT1 = response[0].var_total_t1;
                vVarDeudaT2 = response[0].var_total_t2;
                vVarLineaDisponibleT1 = response[0].var_linea_disponible_t1;
                vCargaActual = response[0].carga_mensual;
                vVarCargaT1 = response[0].var_carga_mensual_t1;
                vCargaT1 = response[0].carga_mensual_t1;
                vDiasAtraso1M = response[0].dias_atraso_1m;
                vDiasAtraso6M = response[0].dias_atraso_6m;
                vDiasAtraso12M = response[0].dias_atraso_12m;
            }           


            //asignando los colores o valores
            if (vUltPorcNormal >= 100.00) {
                $("#hfUltPorcNormal").addClass("text-success");
            } else {
                $("#hfUltPorcNormal").addClass("text-danger");
            }

            switch (vUltClasificacion) {
                case 0: 
                    $("#hfUltCalificacion").addClass("text-success");
                    vstrUltClasificacion = "Normal"; break;                
                case 1: 
                    $("#hfUltCalificacion").addClass("text-primary");
                    vstrUltClasificacion = "CPP"; break;             
                case 2: 
                    $("#hfUltCalificacion").addClass("text-warning");
                    vstrUltClasificacion = "Deficiente"; break;               
                case 3: 
                    $("#hfUltCalificacion").addClass("text-danger");
                    vstrUltClasificacion = "Dudoso"; break;
                case 4:
                    $("#hfUltCalificacion").addClass("text-danger");
                    vstrUltClasificacion = "Pérdida"; break;
                default:
                    $("#hfUltCalificacion").addClass("text-secondary");
                    vstrUltClasificacion = "N/A"; break;
            }

            if (vVarDeudaT1 <= 0.00) {
                $("#hfVarDeudaT1").addClass("text-success");
            } else {
                $("#hfVarDeudaT1").addClass("text-danger");
            }
            
            if (vVarDeudaT2 <= 0.00) {
                $("#hfVarDeudaT2").addClass("text-success");
            } else {
                $("#hfVarDeudaT2").addClass("text-danger");
            }

            if (vVarLineaDisponibleT1 <= 0.00) {
                $("#hfVarLineaDisponibleT1").addClass("text-success");
            } else {
                $("#hfVarLineaDisponibleT1").addClass("text-danger");
            }


            if (vCargaActual > 300.00) {
                $("#hfCargaActual").addClass("text-danger");
            } else {
                $("#hfCargaActual").addClass("text-success");
            }

            if (vVarCargaT1 <= 0.00) {
                $("#hVarfCargaActualT1").addClass("text-success");
            } else {
                $("#hVarfCargaActualT1").addClass("text-danger");
            }


            if (vDiasAtraso1M <= 0) {
                $("#hfDiasAtraso1M").addClass("text-success");
            } else if (vDiasAtraso1M <= 15) {
                $("#hfDiasAtraso1M").addClass("text-warning");
            } else {
                $("#hfDiasAtraso1M").addClass("text-danger");
            }

            if (vDiasAtraso6M <= 0) {
                $("#hfDiasAtraso6M").addClass("text-success");
            } else if (vDiasAtraso6M <= 15) {
                $("#hfDiasAtraso6M").addClass("text-warning");
            } else {
                $("#hfDiasAtraso6M").addClass("text-danger");
            }

            if (vDiasAtraso12M <= 0) {
                $("#hfDiasAtraso12M").addClass("text-success");
            } else if (vDiasAtraso12M <= 15) {
                $("#hfDiasAtraso12M").addClass("text-warning");
            } else {
                $("#hfDiasAtraso12M").addClass("text-danger");
            }


            $scope.vUltPorcNormal = vUltPorcNormal;
            $scope.vUltCalificacion = vstrUltClasificacion;
            $scope.vVarDeudaT1 = vVarDeudaT1;
            $scope.vVarDeudaT2 = vVarDeudaT2;
            $scope.vVarLineaDisponibleT1 = Math.round(vVarLineaDisponibleT1, 2);
            $scope.vCargaActual = Math.round(vCargaActual, 2);
            $scope.vPorcVarCarga = Math.round(vVarCargaT1, 2);
            $scope.vCargaT1 = Math.round(vCargaT1, 2);
            $scope.vDiasAtraso1M = vDiasAtraso1M;
            $scope.vDiasAtraso6M = vDiasAtraso6M;
            $scope.vDiasAtraso12M = vDiasAtraso12M;

        }

        $scope.CargarDocumentos = function (pid_solicitud) {

            Call.Get($scope.NameController + "/ListarDocumentos", { pIdSolicitud: pid_solicitud }, $scope.EstablecerDocumentos);

        }        

        $scope.EstablecerDocumentos = function (response) {

            console.log("Datos Encontrados");
            console.log(response);


            var taSolicitudes;

            if ($.fn.dataTable.isDataTable('#taSolicitudDocumentos')) {
                $('#taSolicitudDocumentos').dataTable().fnClearTable();
                $('#taSolicitudDocumentos').dataTable().fnAddData(response);
            } else {
                taSolicitudes = $('#taSolicitudDocumentos').DataTable({
                    data: response,
                    responsive: true,
                    searching: false,
                    select: true,
                    buttons: [
                        'copy', 'excel', 'pdf'
                    ],
                    columns: [
                        { data: 'id_solicitud_documento' },
                        { data: 'nombre' },
                        { data: 'tipo_documento' },
                        { data: 'estado_documento' },
                        {
                            /*targets: -1,*/
                            data: null,
                            defaultContent: '<a class="edit""><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2 align-middle"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg></a>' +                               
                                '<a class="delete" > <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash align-middle"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></a>' +
                                '<a class="donwload""><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg></a>'
                                
                        }
                    ]
                });


                $('#taSolicitudDocumentos tbody').on('click', 'a.edit', function () {
                    var data = taSolicitudes.row($(this).parents('tr')).data();
                    $scope.btnEditarDocumento(data);
                });

                $('#taSolicitudDocumentos tbody').on('click', 'a.delete', function () {
                    var data = taSolicitudes.row($(this).parents('tr')).data();
                    Message.Confirm("Eliminar", "¿Desea eliminar el resgistro?", $scope.btnEliminarDireccion, null, data);
                });

                $('#taSolicitudDocumentos tbody').on('click', 'a.donwload', function () {
                    var data = taSolicitudes.row($(this).parents('tr')).data();
                    Message.Confirm("Descargar", "¿Desea descargar el documento?", $scope.btnDescargaDocumento, null, data);
                });
            }

        }

        $scope.ObtenerEntidad = function () {

            //PESTAÑA DATOS
            var vIdTipoDocumento = $scope.ddlTipoDocumento.id;
            var vDocumento = $scope.txtDocumento;
            var vApellidoPaterno = $scope.txtApellidoPaterno;
            var vApellidoMaterno = $scope.txtApellidoMaterno;
            var vNombres = $scope.txtNombres;
            var vFechaNacimiento = $scope.txtFechaNacimiento;
            var vIdCategoriaLaboral = $scope.ddlCategoriaLaboral.id;
            var vIngresoBruto = $scope.txtIngresoBruto;
            var vFechaIngresoLaboral = $scope.txtFechaIngresoLaboral;
            var vTelefono = $scope.txtTelefono;
            var vCorreo = $scope.txtCorreo;
            var vIdDepartamento = $scope.ddlDepartamento.id;
            var vIdProvincia = $scope.ddlProvincia.id;
            var vIdDistrito = $scope.ddlDistrito.id;
            var vDireccion =  $scope.txtDireccion;
            var vReferencia = $scope.txtReferencia;

            //PESTAÑA OFERTAS
            var vPrecioBien = $scope.txtPrecioBien;
            var vInicialBien = $scope.txtInicialBien;
            var vIdSeguroBien = $scope.ddlSeguro.id;
            var vPorcSeguroBien = $scope.txtTasaSeguroBien;
            var vTEA = $scope.txtTEA/100.00;
            
            //PESTAÑA DESEMBOLSO
            var vIdMarca = $scope.ddlMarca.id;
            var vIdModelo = $scope.ddlModelo.id;
            
            //var vMtoFinanciado = $scope.txtFinanciado_desem;
            //var vMtoCuota = $scope.txtCuota_desem;
            //var vFechaInicio = $scope.txtFechaInicio_desem;


            var oEntidad = {
                id_solicitud: $scope.id_solicitud_sel,
                id_tipo_documento: vIdTipoDocumento,
                documento: vDocumento,
                apellido_paterno: vApellidoPaterno,
                apellido_materno: vApellidoMaterno,
                nombres: vNombres,
                fecha_nacimiento: vFechaNacimiento,
                id_categoria_laboral: vIdCategoriaLaboral,
                mto_ingreso_bruto: vIngresoBruto,
                fecha_ingreso_laboral: vFechaIngresoLaboral,
                telefono: vTelefono,
                correo: vCorreo,
                id_departamento: vIdDepartamento,
                id_provincia: vIdProvincia,
                id_distrito: vIdDistrito,
                direccion: vDireccion,
                referencia: vReferencia,
                precio_bien: vPrecioBien,
                inicial_bien: vInicialBien,
                id_seguro_bien: vIdSeguroBien,
                porc_seguro_bien: vPorcSeguroBien,
                tea: vTEA,
                id_marca: vIdMarca,
                id_marca_modelo: vIdModelo                
            }

            return oEntidad;

            /*
                //PESTAÑA DE OFERTAS
                $scope.txtPrecioBien = response.mto_precio_bien;
                $scope.txtInicialBien = response.mto_inicial_bien;
                $scope.txtTEA = response.tea;
                $scope.lbPrecioBienMin = response.mto_precio_bien_min;
                $scope.lbPrecioBienMax = response.mto_precio_bien_max;
                $scope.lbPorcInicialBienMin = response.porc_inicial_bien_min;
                $scope.lbPorcInicialBienMax = response.porc_inicial_bien_max;

                //listado los plazos
                Call.Get($scope.NameController + "/ListarPlazos", { pIdSolicitud: $scope.id_solicitud_sel }, $scope.btnEstablecerPlazos)


                //PESTAÑA DE DESEMBOLSO
                $scope.txtTasaSeguroBien_desem = response.porc_tasa_seguro_bien;
                $scope.txtPrecioBien_desem = response.mto_precio_bien;
                $scope.txtInicialBien_desem = response.mto_inicial_bien;
                $scope.txtFinanciado_desem = response.mto_financiar;
                $scope.txtTEA_desem = response.tea * 100.00;
                $scope.txtCuota_desem = response.mto_cuota;
                $scope.txtFechaInicio_desem = response.fecha_inicio_cronograma;

                angular.forEach($scope.oListaPlazo, function (item) {
                    if (item.nombre == response.plazo) {
                        $scope.ddlPlazo = item;
                    }
                });

                //LISTANDO CRONOGRAMA

                //PESTAÑA DE DOCUMENTOS


                //PESTAÑA EVALUACIÓN
                $scope.txtRMI = response.rmi;
                $scope.txtRCI = response.rci;
                $scope.txtRSFI = response.rsfi;
                $scope.txtRTI = response.rti;
                $scope.txtCargaInterna = response.mto_carga_interna;
                $scope.txtCargaExterna = response.mto_carga_externa;

                $scope.txtNumeroSolicitudes = response.cant_solicitudes_mes;
                $scope.txtNumeroSolicitudesAPR = response.cant_solicitudes_apr_mes;
                $scope.txtNumeroSolicitudesRCH = response.cant_solicitudes_rch_mes;

                $scope.txtOperaciones = response.cant_operaciones;
                $scope.txtAtrasoActual = response.dias_atraso_actual;
                $scope.txtDeudaInterna = response.mto_deuda_interna;
                $scope.txtUltimoIngreso = response.mto_ult_ingreso;


                angular.forEach($scope.oListaResultadoEvaluacion, function (item) {
                    if (item.id == response.i004_resultado_evaluacion) {
                        $scope.ddlResultadoEvaluacion = item;
                    }
                });

                angular.forEach($scope.oListaMotivoEvaluacion, function (item) {
                    if (item.id == response.i005_motivo_eval_analista) {
                        $scope.ddlMotivoEvaluacion = item;
                    }
                });

                $scope.txtComentarioEvaluacion = response.comentario_eval_analista;
                $scope.txtFechaUltimaEvaluacion = response.fecha_ult_evaluacion;
            */


            
        }

        $scope.btnGuardar = function () {            

            var pSolicitudRQ = $scope.ObtenerEntidad();

            //console.log("Entidad");
            //console.log(pSolicitudRQ);


            //Validando Datos de cliente
            var vValidoDatosCliente = $scope.ValidarDatosClientes(pSolicitudRQ);

            if (vValidoDatosCliente != "") {
                Message.AlertError("Error", vValidoDatosCliente);
                return;
            }


            //validando datos de la pestaña de Ofertas
            var vValidoDatosOfertas = $scope.ValidarDatosOfertas(pSolicitudRQ);

            if (vValidoDatosOfertas != "") {
                Message.AlertError("Error", vValidoDatosOfertas);
                return;
            }


            //VALIDANDO LA PESTAÑA DE DESEMBOLSO
            var vValidoDatosDesembolso = $scope.ValidarDatosDesembolso(pSolicitudRQ);

            if (vValidoDatosDesembolso != "") {
                Message.AlertError("Error", vValidoDatosDesembolso);
                return;
            }

            
            Loading.LoadingShow("Guardando datos de la solicitud, por favor espere!");

            Call.PostAjax(true, $scope.NameController + "/Guardar", pSolicitudRQ, $scope.EstablecerGuardar);

        }

        $scope.ValidarDatosClientes = function (pSolicitudRQ) {
            if (pSolicitudRQ.id_tipo_documento == 0 || pSolicitudRQ.id_tipo_documento == undefined) {
                //Message.AlertError("Error", "Debe seleccionar un tipo de documento!");
                return "Debe seleccionar un tipo de documento!";
            }

            if (pSolicitudRQ.documento == undefined || pSolicitudRQ.documento.length <= 5) {
                //Message.AlertError("Error", "Debe ingresar un documento válido!");
                return "Debe ingresar un documento válido!";
            }

            if (pSolicitudRQ.apellido_paterno == undefined || pSolicitudRQ.apellido_paterno.length < 3) {
                //Message.AlertError("Error", "Debe ingresar un apellido paterno!");
                return "Debe ingresar un apellido paterno!";
            }

            if (pSolicitudRQ.apellido_materno == undefined || pSolicitudRQ.apellido_materno.length < 3) {
                //Message.AlertError("Error", "Debe ingresar un apellido materno!");
                return "Debe ingresar un apellido materno!";
            }

            if (pSolicitudRQ.nombres == undefined || pSolicitudRQ.nombres.length < 3) {
                //Message.AlertError("Error", "Debe ingresar un nombre!");
                return "Debe ingresar un nombre!";
            }

            if (Moment.Valid(pSolicitudRQ.fecha_nacimiento) == false) {
                //Message.AlertError("Error", "Fecha de nacimiento inválida!");
                return "Fecha de nacimiento inválida!";
            }

            if (pSolicitudRQ.id_categoria_laboral == 0 || pSolicitudRQ.id_categoria_laboral == undefined) {
                //Message.AlertError("Error", "Debe seleccionar una categoría laboral!");
                return "Debe seleccionar una categoría laboral!";
            }

            if (pSolicitudRQ.mto_ingreso_bruto == undefined || pSolicitudRQ.mto_ingreso_bruto < 0 || pSolicitudRQ.mto_ingreso_bruto == "") {
                //Message.AlertError("Error", "Debe ingresar un monto de ingreso mayor a  0!");
                return "Debe ingresar un monto de ingreso mayor a  0!";
            }

            if (Moment.Valid(pSolicitudRQ.fecha_ingreso_laboral) == false) {
                //Message.AlertError("Error", "Fecha de de ingreso laboral inválida!");
                return "Fecha de de ingreso laboral inválida!";
            }

            if (pSolicitudRQ.telefono == undefined || pSolicitudRQ.telefono.length < 9) {
                //Message.AlertError("Error", "Debe ingresar un telefono válido!");
                return "Debe ingresar un telefono válido!";
            }

            if (pSolicitudRQ.correo == undefined || pSolicitudRQ.correo.length < 9) {
                //Message.AlertError("Error", "Debe ingresar un correo válido!");
                return "Debe ingresar un correo válido!";
            }

            if (pSolicitudRQ.id_departamento == 0 || pSolicitudRQ.id_departamento == undefined) {
                //Message.AlertError("Error", "Debe seleccionar un departamento!");
                return "Debe seleccionar un departamento!";
            }

            if (pSolicitudRQ.id_provincia == 0 || pSolicitudRQ.id_provincia == undefined) {
                //Message.AlertError("Error", "Debe seleccionar una provincia!");
                return "Debe seleccionar una provincia!";
            }

            if (pSolicitudRQ.id_distrito == 0 || pSolicitudRQ.id_distrito == undefined) {
                //Message.AlertError("Error", "Debe seleccionar un distrito!");
                return "Debe seleccionar un distrito!";
            }

            if (pSolicitudRQ.direccion == undefined || pSolicitudRQ.direccion.length < 9) {
                //Message.AlertError("Error", "Debe ingresar una dirección válida!");
                return "Debe ingresar una dirección válida!";
            }

            if (pSolicitudRQ.referencia == undefined || pSolicitudRQ.referencia.length < 9) {
                //Message.AlertError("Error", "Debe ingresar una referencia!");
                return "Debe ingresar una referencia!";
            }

            return "";
        }

        $scope.ValidarDatosOfertas = function (pSolicitudRQ) {
            if (pSolicitudRQ.precio_bien == undefined || pSolicitudRQ.precio_bien < 0 || pSolicitudRQ.precio_bien == "") {
                //Message.AlertError("Error", "Debe ingresar un Precio del bien en referencia!");
                return "Debe ingresar un Precio del bien en referencia!";
            }

            if (pSolicitudRQ.inicial_bien == undefined || pSolicitudRQ.inicial_bien < 0 || pSolicitudRQ.inicial_bien == "") {
                //Message.AlertError("Error", "Debe ingresar una inicial del bien en referencia!");
                return "Debe ingresar una inicial del bien en referencia!";
            }

            if (pSolicitudRQ.tea == undefined || pSolicitudRQ.tea.length < 0 || pSolicitudRQ.tea == "") {
                //Message.AlertError("Error", "Debe ingresar una TEA");
                return "Debe ingresar una TEA";
            }

            return "";
        }

        $scope.ValidarDatosDesembolso = function (pSolicitudRQ) {

            if (pSolicitudRQ.id_marca == 0 || pSolicitudRQ.id_marca == undefined) {
                //Message.AlertError("Error", "Debe seleccionar una Marca!");
                return "Debe seleccionar una Marca!";
            }

            if (pSolicitudRQ.id_marca_modelo == 0 || pSolicitudRQ.id_marca_modelo == undefined) {
                Message.AlertError("Error", "Debe seleccionar un Modelo!");
                return "Debe seleccionar un Modelo!";
            }

            return "";
        }

        $scope.EstablecerGuardar = function (response) {

            console.log("Respuesta Grabar");
            console.log(response);

            if (response != null) {
                if (response.st == 1) {
                    Message.AlertSuccess("Guardado Exitoso", "Los datos de la solicitud se guardaron correctamente");
                } else {
                    Message.AlertError("Error al Guardar", "Los datos no se guardaron correctamente, vuelva a intentar");
                }
            } else {
                Message.AlertError("Error al Guardar", "Los datos no se guardaron correctamente, vuelva a intentar");
            }
            
            


            Loading.LoadingClose();
        }

        $scope.BloqueoTotal = function () {

            $scope.ddlTipoDocumento_Disable = true;
            $scope.txtDocumento_Disable = true;
            $scope.txtApellidoPaterno_Disable = true;
            $scope.txtApellidoMaterno_Disable = true;
            $scope.txtNombres_Disable = true;
            $scope.txtFechaNacimiento_Disable = true;
            $scope.ddlCategoriaLaboral_Disable = true;
            $scope.txtIngresoBruto_Disable = true;
            $scope.txtFechaIngresoLaboral_Disable = true;
            $scope.txtTelefono_Disable = true;
            $scope.txtCorreo_Disable = true;
            $scope.ddlDepartamento_Disable = true;
            $scope.ddlProvincia_Disable = true;
            $scope.ddlDistrito_Disable = true;
            $scope.txtDireccion_Disable = true;
            $scope.txtReferencia_Disable = true;
            $scope.txtPrecioBien_Disable = true;
            $scope.txtInicialBien_Disable = true;
            $scope.ddlSeguro_Disable = true;
            $scope.txtTasaSeguro_Disable = true;
            $scope.txtTEA_Disable = true;
            $scope.btnSimularPlazos_Disable = true;
            $scope.ddlMarca_Disable = true;
            $scope.ddlModelo_Disable = true;
            $scope.ddlResultadoEvaluacion_Disable = true;
            $scope.ddlMotivoEvaluacion_Disable = true;
            $scope.txtComentarioEvaluacion_Disable = true;
            $scope.ddlResultadoValidacion_Disable = true;
            $scope.ddlMotivoValidacion_Disable = true;
            $scope.txtComentarioValidacion_Disable = true;

            $scope.btnGuardar_Disable = true;
            $scope.btnAvanzar_Disable = true;
            $scope.btnAnular_Disable = true;
            $scope.btnReiniciar_Disable = true;


        }

        $scope.BloqueoEnEvaluación = function () {

            $scope.ddlTipoDocumento_Disable = true;
            $scope.txtDocumento_Disable = true;
            $scope.txtApellidoPaterno_Disable = true;
            $scope.txtApellidoMaterno_Disable = true;
            $scope.txtNombres_Disable = true;
            $scope.txtFechaNacimiento_Disable = true;
            $scope.ddlCategoriaLaboral_Disable = true;
            $scope.txtIngresoBruto_Disable = true;
            $scope.txtFechaIngresoLaboral_Disable = true;
            $scope.txtTelefono_Disable = true;
            $scope.txtCorreo_Disable = true;
            $scope.ddlDepartamento_Disable = true;
            $scope.ddlProvincia_Disable = true;
            $scope.ddlDistrito_Disable = true;
            $scope.txtDireccion_Disable = true;
            $scope.txtReferencia_Disable = true;
            $scope.txtPrecioBien_Disable = true;
            $scope.txtInicialBien_Disable = true;
            $scope.ddlSeguro_Disable = true;
            $scope.txtTasaSeguro_Disable = true;
            $scope.txtTEA_Disable = true;
            $scope.btnSimularPlazos_Disable = true;
            $scope.ddlMarca_Disable = true;
            $scope.ddlModelo_Disable = true;
            //$scope.ddlResultadoEvaluacion_Disable = true;
            //$scope.ddlMotivoEvaluacion_Disable = true;
            //$scope.txtComentarioEvaluacion_Disable = true;
            $scope.ddlResultadoValidacion_Disable = true;
            $scope.ddlMotivoValidacion_Disable = true;
            $scope.txtComentarioValidacion_Disable = true;
            $scope.btnGuardar_Disable = true;
            $scope.btnAnular_Disable = true;
            $scope.btnReiniciar_Disable = true;

        }

        $scope.BloqueoEnValidacion = function () {

            $scope.ddlTipoDocumento_Disable = true;
            $scope.txtDocumento_Disable = true;
            $scope.txtApellidoPaterno_Disable = true;
            $scope.txtApellidoMaterno_Disable = true;
            $scope.txtNombres_Disable = true;
            $scope.txtFechaNacimiento_Disable = true;
            $scope.ddlCategoriaLaboral_Disable = true;
            $scope.txtIngresoBruto_Disable = true;
            $scope.txtFechaIngresoLaboral_Disable = true;
            $scope.txtTelefono_Disable = true;
            $scope.txtCorreo_Disable = true;
            $scope.ddlDepartamento_Disable = true;
            $scope.ddlProvincia_Disable = true;
            $scope.ddlDistrito_Disable = true;
            $scope.txtDireccion_Disable = true;
            $scope.txtReferencia_Disable = true;
            $scope.txtPrecioBien_Disable = true;
            $scope.txtInicialBien_Disable = true;
            $scope.ddlSeguro_Disable = true;
            $scope.txtTasaSeguro_Disable = true;
            $scope.txtTEA_Disable = true;
            $scope.btnSimularPlazos_Disable = true;
            $scope.ddlMarca_Disable = true;
            $scope.ddlModelo_Disable = true;
            $scope.ddlResultadoEvaluacion_Disable = true;
            $scope.ddlMotivoEvaluacion_Disable = true;
            $scope.txtComentarioEvaluacion_Disable = true;
            //$scope.ddlResultadoValidacion_Disable = true;
            //$scope.ddlMotivoValidacion_Disable = true;
            //$scope.txtComentarioValidacion_Disable = true;
            $scope.btnGuardar_Disable = true;
            $scope.btnAnular_Disable = true;
            $scope.btnReiniciar_Disable = true;

        }

        $scope.BloqueoEnRegistro = function () {

            $scope.ddlTipoDocumento_Disable = true;
            $scope.txtDocumento_Disable = true;
            //$scope.txtApellidoPaterno_Disable = true;
            //$scope.txtApellidoMaterno_Disable = true;
            //$scope.txtNombres_Disable = true;
            //$scope.txtFechaNacimiento_Disable = true;
            //$scope.ddlCategoriaLaboral_Disable = true;
            //$scope.txtIngresoBruto_Disable = true;
            //$scope.txtFechaIngresoLaboral_Disable = true;
            //$scope.txtTelefono_Disable = true;
            //$scope.txtCorreo_Disable = true;
            //$scope.ddlDepartamento_Disable = true;
            //$scope.ddlProvincia_Disable = true;
            //$scope.ddlDistrito_Disable = true;
            //$scope.txtDireccion_Disable = true;
            //$scope.txtReferencia_Disable = true;
            //$scope.txtPrecioBien_Disable = true;
            //$scope.txtInicialBien_Disable = true;
            //$scope.ddlSeguro_Disable = true;
            //$scope.txtTasaSeguro_Disable = true;
            //$scope.txtTEA_Disable = true;
            //$scope.btnSimularPlazos_Disable = true;
            //$scope.ddlMarca_Disable = true;
            //$scope.ddlModelo_Disable = true;
            $scope.ddlResultadoEvaluacion_Disable = true;
            $scope.ddlMotivoEvaluacion_Disable = true;
            $scope.txtComentarioEvaluacion_Disable = true;
            $scope.ddlResultadoValidacion_Disable = true;
            $scope.ddlMotivoValidacion_Disable = true;
            $scope.txtComentarioValidacion_Disable = true;
            //$scope.btnGuardar_Disable = true;
            //$scope.btnAnular_Disable = true;
            $scope.btnReiniciar_Disable = true;

        }

        $scope.btnSimularPlazos = function () {

            var vPrecioBien = $scope.txtPrecioBien;
            var vIniciaBien = $scope.txtInicialBien;
            var vIdSeguroBien = $scope.ddlSeguro.id;
            var vPorcSeguroBien = $scope.txtTasaSeguro/100.00;

            var pSolicitudRQ = {
                id_solicitud: $scope.id_solicitud_sel,
                mto_precio_bien: vPrecioBien,
                mto_inicial_bien: vIniciaBien,
                id_seguro_bien: vIdSeguroBien,
                porc_seguro_bien: vPorcSeguroBien
            }


            Loading.LoadingShow("Guardando datos de la solicitud, por favor espere!");

            Call.PostAjax(true, $scope.NameController + "/Simular", pSolicitudRQ, $scope.EstablecerSimular);

        }

        $scope.EstablecerSimular = function (response) {

            console.log("Respuesta Simular");
            console.log(response);

            if (response != null) {
                if (response.st == 1) {
                    //listado los plazos
                    Call.Get($scope.NameController + "/ListarPlazos", { pIdSolicitud: $scope.id_solicitud_sel }, $scope.btnEstablecerPlazos);

                    Message.AlertSuccess("Simulación Exitosa", "La simulación se realizó correctamente correctamente");
                } else {
                    Message.AlertError("Error al Simular", "Los datos no se calcularon correctamente, vuelva a intentar");
                }
            } else {
                Message.AlertError("Error al Simular", "Los datos no se calcularon correctamente, vuelva a intentar");
            }




            Loading.LoadingClose();

        }

        $scope.btnAnular = function () {
            Message.Confirm("Anular", "¿Desea Anular la solicitud?", $scope.btnAnularSolicitud, null, $scope.id_solicitud_sel);
        }

        $scope.btnAnularSolicitud = function (data) {

            var vIdSolicitud = data;

            var pSolicitudRQ = { id_solicitud: vIdSolicitud };

            Loading.LoadingShow("Anulando la solicitud, por favor espere!");
            

            Call.PostAjax(true, $scope.NameController + "/Anular", pSolicitudRQ, $scope.RespuestaAnularSolicitud);
        }

        $scope.RespuestaAnularSolicitud = function (response) {

            Loading.LoadingClose();

            if (response.st == 1) {
                Message.AlertSuccess("Anular Solicitud", "La solicitud se anuló correctamente");
                var parEdit = { pIdSolicitud: $scope.id_solicitud_sel };
                Call.Get($scope.NameController + "/Obtener", parEdit, $scope.btnEditar);
            } else {
                Message.AlertError("Anulación Erronea", "Error al anular la solicitud, vuelva a intentarlo");
            }

        }

        $scope.btnAvanzar = function () {

            //var pSolicitudRQ = $scope.ObtenerEntidad();
            //
            ////Validando Datos de cliente
            //var vValidoDatosCliente = $scope.ValidarDatosClientes(pSolicitudRQ);
            //
            //if (vValidoDatosCliente != "") {
            //    return;
            //}

            if (vgPerfil == 66 || vgPerfil == 67) {
                
                Message.Confirm("Avanzar", "¿Desea Avanzar la solicitud a la siguiente Etapa?", $scope.btnAvanzarSolicitud, null, $scope.id_solicitud_sel);
            }

            if (vgPerfil == 68) {

                $scope.btnGrabarEvaluacion();
            }


            if (vgPerfil == 69) {

                $scope.btnGrabarValidacion();
            }
            
        }

        $scope.btnAvanzarSolicitud = function (data) {

            var vIdSolicitud = data;

            var pSolicitudRQ = { id_solicitud: vIdSolicitud };

            Loading.LoadingShow("Procesando la solicitud, por favor espere!");

            Call.PostAjax(true, $scope.NameController + "/Avanzar", pSolicitudRQ, $scope.RespuestaAvanzarSolicitud);
        }

        $scope.RespuestaAvanzarSolicitud = function (response) {

            Loading.LoadingClose();

            if (response.st == 1) {
                Message.AlertSuccess("Avanzar Solicitud", "La solicitud se Avanzó correctamente a la siguiente etapa");
                var parEdit = { pIdSolicitud: $scope.id_solicitud_sel };
                Call.Get($scope.NameController + "/Obtener", parEdit, $scope.btnEditar);

            } else {
                Message.AlertError("Acción Erronea", "Error al Avanzar la solicitud, vuelva a intentarlo");
            }

        }

        $scope.btnGrabarValidacion = function () {

            var vIdResultado = $scope.ddlResultadoValidacion.id;
            var vIdMotivo = $scope.ddlMotivoValidacion.id;
            var vComentario = $scope.txtComentarioValidacion;

            if (vIdResultado == 0) {
                Message.AlertError("Error", "Debe seleccionar un resultado");
                return;
            }

            if (vIdMotivo == 0) {
                Message.AlertError("Error", "Debe seleccionar un motivo");
                return;
            }

            if ((vComentario == null || vComentario.length <= 10) && vIdMotivo != 0) {
                Message.AlertError("Error", "Debe ingresar un comentario");
                return;
            }


            Message.Confirm("Grabar", "¿Desea grabar la validación de la solicitud?", $scope.btnGrabarValidacionSolicitud, null, $scope.id_solicitud_sel);
        }

        $scope.btnGrabarValidacionSolicitud = function (data) {

            var vIdSolicitud = data;
            var vIdResultado = $scope.ddlResultadoValidacion.id;
            var vIdMotivo = $scope.ddlMotivoValidacion.id;
            var vComentario= $scope.txtComentarioValidacion;

            var pSolicitudRQ = { id_solicitud: vIdSolicitud, id_resultado_validacion: vIdResultado, id_motivo_validacion: vIdMotivo, comentario_validacion: vComentario };

            Loading.LoadingShow("Guardando la validación de la solicitud, por favor espere!");
            
            Call.PostAjax(true, $scope.NameController + "/GuardarValidacion", pSolicitudRQ, $scope.RespuestaGrabarValidacionSolicitud);
        }

        $scope.RespuestaGrabarValidacionSolicitud = function (response) {

            Loading.LoadingClose();

            if (response.st == 1) {
                Message.AlertSuccess("Grabar Solicitud", "La solicitud se guardó correctamente");
                var parEdit = { pIdSolicitud: $scope.id_solicitud_sel };
                Call.Get($scope.NameController + "/Obtener", parEdit, $scope.btnEditar);
            } else {
                Message.AlertError("Grabar Erroneo", "Error al guardad la solicitud, vuelva a intentarlo");
            }

        }

        $scope.btnGrabarEvaluacion = function () {

            var vIdResultado = $scope.ddlResultadoEvaluacion.id;
            var vIdMotivo = $scope.ddlMotivoEvaluacion.id;
            var vComentario = $scope.txtComentarioEvaluacion;

            if (vIdResultado == 0) {
                Message.AlertError("Error", "Debe seleccionar un resultado");
                return;
            }

            if (vIdMotivo == 0) {
                Message.AlertError("Error", "Debe seleccionar un motivo");
                return;
            }

            if ((vComentario == null || vComentario.length <= 10) && vIdMotivo != 0) {
                Message.AlertError("Error", "Debe ingresar un comentario");
                return;
            }

            Message.Confirm("Grabar", "¿Desea grabar la Evaluación de la solicitud?", $scope.btnGrabarEvaluacionSolicitud, null, $scope.id_solicitud_sel);
        }

        $scope.btnGrabarEvaluacionSolicitud = function (data) {

            var vIdSolicitud = data;
            var vIdResultado = $scope.ddlResultadoEvaluacion.id;
            var vIdMotivo = $scope.ddlMotivoEvaluacion.id;
            var vComentario = $scope.txtComentarioEvaluacion;

            var pSolicitudRQ = { id_solicitud: vIdSolicitud, id_resultado_evaluacion: vIdResultado, id_motivo_evaluacion: vIdMotivo, comentario_evaluacion: vComentario };

            Loading.LoadingShow("Guardando evaluación de la solicitud, por favor espere!");
            
            Call.PostAjax(true, $scope.NameController + "/GuardarEvaluacion", pSolicitudRQ, $scope.RespuestaGrabarEvaluacionSolicitud);
        }

        $scope.RespuestaGrabarEvaluacionSolicitud = function (response) {

            Loading.LoadingClose();

            if (response.st == 1) {
                Message.AlertSuccess("Grabar Solicitud", "La solicitud se guardó correctamente");
                var parEdit = { pIdSolicitud: $scope.id_solicitud_sel };
                Call.Get($scope.NameController + "/Obtener", parEdit, $scope.btnEditar);
            } else {
                Message.AlertError("Grabar Erroneo", "Error al guardad la solicitud, vuelva a intentarlo");
            }

        }



        $scope.btnListarHistoricoValidacion = function () {
            //Call.Get($scope.NameController + "/ListarHistoricoEvaluacion", {pIdSolicitud : $scope.id_solicitud_sel}, $scope.EstablecerHistoricoEvaluacion);
        }

        $scope.EstablecerHistoricoEvaluacion = function (response) {

            console.log("Historico");
            console.log(response);
            //this.listUsers = this.listUsers.filter(user => user === condition)
            $scope.oListaHistorico = response;

            $scope.oListaHistoricoValidacion = $scope.oListaHistorico.filter(item => item.i007_etapa_solicitud == 36);
            $scope.oListaHistoricoEvaluacion = $scope.oListaHistorico.filter(item => item.i007_etapa_solicitud == 37);

            console.log("oListaHistoricoValidacion");
            console.log($scope.oListaHistoricoValidacion);

            var taHistoricoValidacion;
            var taHistoricoEvaluacion;

            if ($.fn.dataTable.isDataTable('#taHistoricoValidacion')) {
                $('#taHistoricoValidacion').dataTable().fnClearTable();
                $('#taHistoricoValidacion').dataTable().fnAddData($scope.oListaHistoricoValidacion);
            } else {
                taHistoricoValidacion = $('#taHistoricoValidacion').DataTable({
                    data: $scope.oListaHistoricoValidacion,
                    responsive: true,
                    searching: false,
                    select: true,
                    buttons: [
                        'copy', 'excel', 'pdf'
                    ],
                    columns: [
                        { data: 'fecha_str' },
                        { data: 'resultado' },
                        { data: 'motivo' },
                        { data: 'usuario' },
                        { data: 'descripcion' }
                    ]
                });
            }


            if ($.fn.dataTable.isDataTable('#taHistoricoEvaluacion')) {
                $('#taHistoricoEvaluacion').dataTable().fnClearTable();
                $('#taHistoricoEvaluacion').dataTable().fnAddData($scope.oListaHistoricoEvaluacion);
            } else {
                taHistoricoEvaluacion = $('#taHistoricoEvaluacion').DataTable({
                    data: $scope.oListaHistoricoEvaluacion,
                    responsive: true,
                    searching: false,
                    select: true,
                    buttons: [
                        'copy', 'excel', 'pdf'
                    ],
                    columns: [
                        { data: 'fecha_str' },
                        { data: 'resultado' },
                        { data: 'motivo' },
                        { data: 'usuario' },
                        { data: 'descripcion' }
                    ]
                });
            }



        }


        $scope.btnDescargaDocumento = function (pData) {

            console.log("pData");
            console.log(pData);

            var a = document.createElement("a"); //Create <a>
            a.href = pData.documento;//"data:image/png;base64," + ImageBase64; //Image Base64 Goes here
            a.download = pData.nombre; //File name Here
            a.click(); //Downloaded file

        }

        $scope.btnNuevoDocumento = function () {


            $("#moDocumentos").modal('show');  

        }

        $scope.btnEditarDocumento = function (pData) {

            $("#moDocumentos").modal('show');

            $scope.txtNombreDocumentoAdj = pData.nombre;
            $scope.txtDescripcionDocumentoAdj = pData.descripcion;

            angular.forEach($scope.oListaTipoDocumentoAdjunto, function (item) {
                if (item.id == pData.i010_tipo_documento) {
                    $scope.ddlTipoDocumentoAdj = item;
                }
            });

            $scope.$apply();

        }

        $scope.GrabarAdjunto = function () {

            //console.log("Capturando File");

            var vTipoDocumento = $scope.ddlTipoDocumentoAdj.id;
            var vNombreDocumento = $scope.txtNombreDocumentoAdj;
            var vComentario = $scope.txtDescripcionDocumentoAdj;

            var pAdjuntoObj = {
                id_solicitud_documento: $scope.id_solicitud_documento_sel == null ? 0 : $scope.id_solicitud_documento_sel,
                id_solicitud: $scope.id_solicitud_sel == null ? 0 : $scope.id_solicitud_sel,
                id_tipo_documento: vTipoDocumento,
                nombre: vNombreDocumento,
                comentario: vComentario,
                documento_base64: ""
            }


            if (pAdjuntoObj.id_solicitud == 0 || pAdjuntoObj.id_solicitud == null) {
                Message.AlertError("Error", "No existe solicitud");
                return;
            }

            if (vTipoDocumento == 0) {
                Message.AlertError("Error", "Debe seleccionar un tipo de documento");
                return;
            }

            if (vNombreDocumento == null || vNombreDocumento.length < 5) {
                Message.AlertError("Error", "Debe ingresar un nombre (5 caracteres min)");
                return;
            }

            if (vComentario == null || vComentario.length < 10) {
                Message.AlertError("Error", "Debe ingresar un comentario (10 caracteres min)");
                return;
            }


            var myFile = $('#fiAdjunto').prop('files');
            var file = myFile[0];
            console.log("File");
            console.log(file);

            if (file == null || file.length <= 10) {
                Message.AlertError("Error", "Debe adjuntar un file");
                return;
            }

            console.log("convirtiendo File");

            Loading.LoadingShow("Guardando documento de la solicitud, por favor espere!");

            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;//.replace('data:', '').replace(/^.+,/, '');
                pAdjuntoObj.documento_base64 = base64String;
                $scope.ProcesarImagen(pAdjuntoObj);
            };
            reader.readAsDataURL(file);            
        }

        $scope.ProcesarImagen = function (pAdjuntoObj) {

            //console.log("Imprimiendo File Base64");
            //console.log(pFileBase64);

            //console.log("logitud");
            //console.log(pFileBase64.length);           

            //Call.PostAjax(false, $scope.NameController + "/GrabarDocumentoAdjunto", pAdjuntoObj, $scope.ResponseProcesarImagen);       

        }

        $scope.ResponseProcesarImagen = function (response) {

            Loading.LoadingClose();

            if (response.st == 1) {
                Message.AlertSuccess("Grabar Documento", "El documento se guardó correctamente");
                $scope.CargarDocumentos($scope.id_solicitud_sel);
                $("#moDocumentos").modal('hide');  
            } else {
                Message.AlertError("Grabar Erroneo", "Error al guardar el documento, vuelva a intentarlo");
            }

        }


        $scope.inicializar_flujograma = function () {

            /*
            myDiagram = new go.Diagram('myDiagramDiv', {
                // have mouse wheel events zoom in and out instead of scroll up and down
                'toolManager.mouseWheelBehavior': go.WheelMode.Zoom,
                // support double-click in background creating a new node
                'clickCreatingTool.archetypeNodeData': { text: 'new node' },
                linkReshapingTool: new CurvedLinkReshapingTool(),
                // enable undo & redo
                'undoManager.isEnabled': true
            });*/

            /*
            // when the document is modified, add a "*" to the title and enable the "Save" button
            myDiagram.addDiagramListener('Modified', (e) => {
                var button = document.getElementById('SaveButton');
                if (button) button.disabled = !myDiagram.isModified;
                var idx = document.title.indexOf('*');
                if (myDiagram.isModified) {
                    if (idx < 0) document.title += '*';
                } else {
                    if (idx >= 0) document.title = document.title.slice(0, idx);
                }
            });

            // define the Node template
            myDiagram.nodeTemplate = new go.Node('Auto')
                .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)
                .add(
                    // define the node's outer shape, which will surround the TextBlock
                    new go.Shape('RoundedRectangle', {
                        parameter1: 20, // the corner has a large radius
                        fill: new go.Brush('Linear', { 0: 'rgb(254, 201, 0)', 1: 'rgb(254, 162, 0)' }),
                        stroke: 'black',
                        portId: '',
                        fromLinkable: true,
                        fromLinkableSelfNode: true,
                        fromLinkableDuplicates: true,
                        toLinkable: true,
                        toLinkableSelfNode: true,
                        toLinkableDuplicates: true,
                        cursor: 'pointer'
                    }),
                    new go.TextBlock({
                        font: 'bold 11pt helvetica, bold arial, sans-serif',
                        editable: true // editing the text automatically updates the model data
                    })
                        .bindTwoWay('text', 'text')
                );

            // unlike the normal selection Adornment, this one includes a Button
            myDiagram.nodeTemplate.selectionAdornmentTemplate = new go.Adornment('Spot')
                .add(
                    new go.Panel('Auto')
                        .add(
                            new go.Shape({ fill: null, stroke: 'blue', strokeWidth: 2 }),
                            new go.Placeholder() // this represents the selected Node
                        ),
                    // the button to create a "next" node, at the top-right corner
                    go.GraphObject.build('Button',
                        {
                            alignment: go.Spot.TopRight,
                            click: $scope.addNodeAndLink // this function is defined below
                        }
                    ) // end button
                        .add(
                            new go.Shape('PlusLine', { desiredSize: new go.Size(6, 6) })
                        )
                ); // end Adornment

            // clicking the button inserts a new node to the right of the selected node,
            // and adds a link to that new node
            
            // replace the default Link template in the linkTemplateMap
            myDiagram.linkTemplate = new go.Link({ // the whole link panel
                curve: go.Curve.Bezier,
                reshapable: true
            })
                // don't need to save Link.points, so don't need TwoWay Binding on "points"
                .bindTwoWay('curviness', 'curviness') // but save "curviness" automatically
                .add(
                    new go.Shape({ strokeWidth: 1.5 }), // the link shape
                    new go.Shape({ toArrow: 'standard', stroke: null }), // the arrowhead
                    new go.Panel('Auto')
                        .add(
                            new go.Shape({ // the label background, which becomes transparent around the edges
                                fill: new go.Brush('Radial', { 0: 'rgb(240, 240, 240)', 0.3: 'rgb(240, 240, 240)', 1: 'rgba(240, 240, 240, 0)' }),
                                stroke: null
                            }),
                            new go.TextBlock('transition', { // the label text
                                textAlign: 'center',
                                font: '10pt helvetica, arial, sans-serif',
                                stroke: 'black',
                                margin: 4,
                                editable: true // editing the text automatically updates the model data
                            })
                                .bindTwoWay('text', 'text')
                        )
                );

                */


            // read in the JSON-format data from the "mySavedModel" element
            //$scope.cargar_flujograma();
        }


        $scope.addNodeAndLink =  function (e, obj) {
            var adorn = obj.part;
            e.handled = true;
            var diagram = adorn.diagram;
            diagram.startTransaction('Add State');

            // get the node data for which the user clicked the button
            var fromNode = adorn.adornedPart;
            var fromData = fromNode.data;
            // create a new "State" data object, positioned off to the right of the adorned Node
            var toData = { text: 'new' };
            var p = fromNode.location.copy();
            p.x += 200;
            toData.loc = go.Point.stringify(p); // the "loc" property is a string, not a Point object
            // add the new node data to the model
            var model = diagram.model;
            model.addNodeData(toData);

            // create a link data from the old node data to the new node data
            var linkdata = {
                from: model.getKeyForNodeData(fromData), // or just: fromData.id
                to: model.getKeyForNodeData(toData),
                text: 'transition'
            };
            // and add the link data to the model
            model.addLinkData(linkdata);

            // select the new Node
            var newnode = diagram.findNodeForData(toData);
            diagram.select(newnode);

            diagram.commitTransaction('Add State');

            // if the new node is off-screen, scroll the diagram to show the new node
            diagram.scrollToRect(newnode.actualBounds);
        }

        $scope.cargar_flujograma = function () {

            var jsonData =  { "class": "go.GraphLinksModel", 
                 "nodeKeyProperty": "id", 
            "nodeDataArray": [
                    { "id": 33, "loc": "200 50", "text": "Registro Solicitud" }, 
                    { "id": 34, "loc": "200 100", "text": "Pre-Aprobado" }, 
                    { "id": 35, "loc": "200 200", "text": "Rechazado FD" }, 
                    { "id": 36, "loc": "400 300", "text": "En Validación Documentos" }, 
                { "id": 37, "loc": "400 400", "text": "En Evaluación" },
                { "id": 38, "loc": "200 500", "text": "Validación Documentos Rechazada" },
                { "id": 39, "loc": "200 600", "text": "Evaluación Rechazada" },
                    { "id": 40, "loc": "600 700", "text": "Pendiente Activación" },
                { "id": 41, "loc": "600 800", "text": "Activado" },
                    { "id": 42, "loc": "200 900", "text": "Anulado" }
             ], 
             "linkDataArray": [
                        { "from": 33, "to": 34, "text": "up or timer", "curviness": -20 }, 
                        { "from": 34, "to": 36, "text": "down", "curviness": 20 }, 
                        { "from": 36, "to": 37, "text": "up (moved)\nPOST", "curviness": 20 }, 
                        { "from": 37, "to": 40, "text": "down", "curviness": -20 }, 
                        { "from": 40, "to": 41, "text": "up (no move)" }, 
                        { "from": 41, "to": 42, "text": "timer" }
            ]
            };


            myDiagram.model = go.Model.fromJson(jsonData);// document.getElementById('mySavedModel').value);
        }


    }]);