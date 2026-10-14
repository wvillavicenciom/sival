'use strict';

AppSIVAL.controller("BusquedaSolicitudes", ['$scope', 'Message', 'MsgData', 'Call', 'Moment', '$http', 'Loading', '$q',
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
                    stops: [0, 500, 700,800, 1000],
                },
            },
            stroke: {
                lineCap: 'round',
            },
            labels: [''],
        }

        
        //var chart = new ApexCharts(document.querySelector('#chart'), options);
        //chart.render();

        
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



        $(document).ready(function () {

            Call.Get($scope.GenericController + "/TipoDocumentoCombo", null, $scope.EstablecerTipoDocumento);
            //Call.Get($scope.GenericController + "/EtapaSolicitudCombo", null, $scope.EstablecerEtapaSolicitud);

            
        });

        $scope.btnBuscar = function (pTopResultado) {

            var parametros = {
                pIdSolicitud: $scope.txtIdSolicitud == undefined ? '' : $scope.txtIdSolicitud,
                pTipoDocumento: $scope.ddlTipoDocumento.id,
                pDocumento: $scope.txtDocumento == undefined ? '' : $scope.txtDocumento,
                pApellidoPaterno: $scope.txtApePaterno == undefined ? '' : $scope.txtApePaterno,
                pApellidoMaterno: $scope.txtApeMaterno == undefined ? '' : $scope.txtApeMaterno,
                pNombres: $scope.txtNombres == undefined ? '' : $scope.txtNombres,
                pFechaIni: $scope.txtFechaInicio == undefined ? '' : $scope.txtFechaInicio,
                pFechaFin: $scope.txtFechaFin == undefined ? '' : $scope.txtFechaFin,
                pEtapaSolicitud: 0,//$scope.ddlEtapaSolicitud.id
                pTop: pTopResultado
            };
            //Loading.LoadingShow("Iniciando Sesión, por favor espere!");
            Call.Get($scope.NameController + '/ListarBusqueda', parametros, $scope.EstablecerBusqueda);
        }     

        $scope.EstablecerTipoDocumento = function (response) {
            $scope.oListaTipoDocumento = response;
            $scope.ddlTipoDocumento = $scope.oListaTipoDocumento[0];
            $scope.btnBuscar(20);
        }

        $scope.EstablecerEtapaSolicitud = function (response) {
            $scope.oListaEtapaSolicitud = response;
            $scope.ddlEtapaSolicitud = $scope.oListaEtapaSolicitud[0];
        }

        $scope.EstablecerBusqueda = function (response) {

            $scope.cant_registros_busqueda = response.length;

            var taSolicitudes;

            if ($.fn.dataTable.isDataTable('#taSolicitudes')) {
                //$('#taSolicitudes').DataTable().destroy();
                $('#taSolicitudes').dataTable().fnClearTable();
                $('#taSolicitudes').dataTable().fnAddData(response);
            } else {

                // Aseguramos que sea un array e ignoramos cualquier fila que sea "null" o indefinida.
                let dataLimpia = (response || []).filter(fila => fila != null);

                // 2. LIMPIEZA DE HTML: 
                // Borramos cualquier <tr> "fantasma" que haya quedado en tu vista HTML.
                $('#taSolicitudes tbody').empty();

                // 3. DESTRUCCIÓN PREVIA (Opcional pero recomendado):
                // Si estás intentando recargar la tabla con nuevos datos, primero debemos destruirla.
                if ($.fn.DataTable.isDataTable('#taSolicitudes')) {
                    $('#taSolicitudes').DataTable().clear().destroy();
                }

                taSolicitudes = $('#taSolicitudes').DataTable({
                    data: dataLimpia,
                    responsive: true,
                    searching: false,
                    select: true,
                    buttons: [
                        'copy', 'excel', 'pdf'
                    ],
                    columns: [
                        { data: 'id_solicitud', "defaultContent": "" },
                        { data: 'fecha_solicitud_str', "defaultContent": "" },
                        { data: 'tipo_documento', "defaultContent": "" },
                        { data: 'documento', "defaultContent": "" },
                        { data: 'cliente', "defaultContent": "" },
                        { data: 'segmento', "defaultContent": "" },
                        { data: 'pd_estimada', "defaultContent": "" }
                    ],
                    "columnDefs": [
                        {
                            // Indicamos el índice de la columna (empieza en 0, el 2 sería la tercera columna)
                            "targets": 5,
                            "render": function (data, type, row) {
                                // Si DataTables está solicitando el dato para mostrarlo en pantalla ('display')
                                if (type === 'display') {
                                    let colorTexto = '';
                                    let colorFondo = '';

                                    // Lógica para asignar el color
                                    if (data === 'A') {
                                        colorTexto = colorTextoSA;
                                        colorFondo = colorFondoSA;
                                    } else if (data === 'B') {
                                        colorTexto = colorTextoSB;
                                        colorFondo = colorFondoSB;
                                    }
                                    else if (data === 'C') {
                                        colorTexto = colorTextoSC;
                                        colorFondo = colorFondoSC;
                                    }
                                    else if (data === 'D') {
                                        colorTexto = colorTextoSD;
                                        colorFondo = colorFondoSD;
                                    }
                                    else if (data === 'E') {
                                        colorTexto = colorTextoSE;
                                        colorFondo = colorFondoSE;
                                    }
                                    else {
                                        colorTexto = colorTextoSNA;
                                        colorFondo = colorFondoSNA;
                                    }

                                    // Retornamos el valor envuelto en un span con el color
                                    return `<span style="background-color: ${colorFondo}; color: ${colorTexto}; padding: 4px 8px; border-radius: 4px; font-weight: bold;">${data}</span>`;
                                }
                                // Para otros tipos (ordenamiento, búsqueda), devolvemos el dato original sin HTML
                                return data;
                            }
                        }
                    ]
                });

                taSolicitudes.on('select', function (e, dt, type, indexes) {

                    if (type === 'row') {
                        var data = taSolicitudes.rows(indexes).data()[0];

                        $scope.Resultado_Sel = "";
                        $scope.Cliente_sel = "";
                        $scope.TipoDocumento_Sel = "";
                        $scope.Documento_Sel = "";
                        $scope.FechaNacimiento_Sel = "";
                        $scope.Genero_Sel = "";
                        $scope.ActividadEconomica_Sel = "";
                        $scope.Convenio_Sel = "";
                        $scope.Departamento_Sel = "";
                        $scope.NroCreditos_Sel = "";

                        // 1. Seleccionar el elemento HTML por su ID
                        const elementoOffcanvas = document.getElementById('panelDerecho');

                        // 2. Crear la instancia de Bootstrap asociada a ese elemento
                        const miPanelDerecho = new bootstrap.Offcanvas(elementoOffcanvas);

                        // 3. Método para abrir el panel
                        miPanelDerecho.show();
                        /*var score = data.puntaje_score;
                        var color = score < 500 ? '#FF0000' : '#00FF00';
                        chart.updateOptions({
                            series: [score],
                            colors: [color]
                        });*/

                        let colorTexto = '';
                        let colorFondo = '';

                        // Lógica para asignar el color
                        if (data.segmento === 'A') {
                            colorTexto = colorTextoSA;
                            colorFondo = colorFondoSA;
                        } else if (data.segmento === 'B') {
                            colorTexto = colorTextoSB;
                            colorFondo = colorFondoSB;
                        }
                        else if (data.segmento === 'C') {
                            colorTexto = colorTextoSC;
                            colorFondo = colorFondoSC;
                        }
                        else if (data.segmento === 'D') {
                            colorTexto = colorTextoSD;
                            colorFondo = colorFondoSD;
                        }
                        else if (data.segmento === 'E') {
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

                        $scope.Segmento_Sel = data.segmento;
                        var pd = data.pd_estimada * 100;
                        $scope.PDEstimada_Sel = parseFloat(pd.toFixed(2))  + "%";
                        $scope.Cliente_sel = data.cliente;
                        $scope.TipoDocumento_Sel = data.tipo_documento;
                        $scope.Documento_Sel = data.documento;
                        $scope.FechaNacimiento_Sel = data.fecha_nacimiento;
                        $scope.Genero_Sel = data.genero;
                        $scope.ActividadEconomica_Sel = data.actividad_economica;
                        $scope.Convenio_Sel = data.convenio;
                        $scope.Departamento_Sel = data.departamento;
                        $scope.NroCreditos_Sel = data.nro_creditos;
                        $scope.$apply();
                    }


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