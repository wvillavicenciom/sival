'use strict';

AppSIVAL.controller("Index", ['$scope', 'Message', 'MsgData', 'Call', 'Moment', '$http', 'Loading', '$q',
    function ($scope, Message, MsgData, Call, Moment, $http, Loading, $q, TaGeneric) {

        $scope.NameController = "/Seguridad/Usuario";

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

        //inicializando las variables del gráfico
        Apex.grid = {
            padding: {
                right: 0,
                left: 0
            }
        }

        /*Apex.dataLabels = {
            enabled: false
        };*/

        var randomizeArray = function (arg) {
            var array = arg.slice();
            var currentIndex = array.length, temporaryValue, randomIndex;

            while (0 !== currentIndex) {

                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }

            return array;
        }

        // data for the sparklines that appear below header area
        var sparklineData = [47, 45, 54, 38, 56, 24, 65, 31, 37, 39, 62, 51, 35, 41, 35, 27, 93, 53, 61, 27, 54, 43, 19, 46];

        // the default colorPalette for this dashboard
        var colorPalette = ['#00d869', '#d84500', '#8a867e', '#d11430', '#6b4ed0']

        $scope.spark1 = {
            chart: {
                id: 'sparkline1',
                group: 'sparklines',
                type: 'area',
                height: 150,
                sparkline: {
                    enabled: true
                },
            },
            stroke: {
                curve: 'straight'
            },
            fill: {
                opacity: 1,
            },
            series: [{
                name: 'Solicitudes',
                data: randomizeArray(sparklineData)
            }],
            labels: [...Array(24).keys()].map(n => `2018-09-0${n + 1}`),
            yaxis: {
                min: 0
            },
            xaxis: {
                type: 'datetime',
            },
            colors: ['#0e9d0e'],
            title: {
                text: '$424,652',
                offsetX: 30,
                style: {
                    fontSize: '24px',
                    cssClass: 'apexcharts-yaxis-title'
                }
            },
            subtitle: {
                text: 'Solicitudes Ult 45 Días',
                offsetX: 30,
                style: {
                    fontSize: '14px',
                    cssClass: 'apexcharts-yaxis-title'
                }
            }
        }

        $scope.spark2 = {
            chart: {
                id: 'sparkline2',
                group: 'sparklines',
                type: 'area',
                height: 150,
                sparkline: {
                    enabled: true
                },
            },
            stroke: {
                curve: 'straight'
            },
            fill: {
                opacity: 1,
            },
            series: [{
                name: 'Aprobados',
                data: randomizeArray(sparklineData)
            }],
            labels: [...Array(24).keys()].map(n => `2018-09-0${n + 1}`),
            yaxis: {
                min: 0
            },
            xaxis: {
                type: 'datetime',
            },
            colors: ['#00d869'],
            title: {
                text: '$235,312',
                offsetX: 30,
                style: {
                    fontSize: '24px',
                    cssClass: 'apexcharts-yaxis-title'
                }
            },
            subtitle: {
                text: 'Aprobados Ult 45 Días',
                offsetX: 30,
                style: {
                    fontSize: '14px',
                    cssClass: 'apexcharts-yaxis-title'
                }
            }
        }

        $scope.spark3 = {
            chart: {
                id: 'sparkline3',
                group: 'sparklines',
                type: 'area',
                height: 150,
                sparkline: {
                    enabled: true
                },
            },
            stroke: {
                curve: 'straight'
            },
            fill: {
                opacity: 1,
            },
            series: [{
                name: 'Rechazados',
                data: randomizeArray(sparklineData)
            }],
            labels: [...Array(24).keys()].map(n => `2018-09-0${n + 1}`),
            xaxis: {
                type: 'datetime',
            },
            yaxis: {
                min: 0
            },
            colors: ['#d84500'],
            //colors: ['#5564BE'],
            title: {
                text: '$135,965',
                offsetX: 30,
                style: {
                    fontSize: '24px',
                    cssClass: 'apexcharts-yaxis-title'
                }
            },
            subtitle: {
                text: 'Rechazados Ult 45 Días',
                offsetX: 30,
                style: {
                    fontSize: '14px',
                    cssClass: 'apexcharts-yaxis-title'
                }
            }
        }


        $scope.optionsBar = {
            chart: {
                type: 'bar',
                height: 380,
                width: '100%',
                stacked: true,
            },
            plotOptions: {
                bar: {
                    columnWidth: '45%',
                }
            },
            colors: colorPalette,
            series: [{
                name: "A",
                data: [42, 52, 16, 55, 59, 51, 45, 32, 26, 33, 44, 51, 42, 56],
            }, {
                name: "B",
                data: [6, 12, 4, 7, 5, 3, 6, 4, 3, 3, 5, 6, 7, 4],
                }, {
                    name: "C",
                    data: [6, 12, 4, 7, 5, 3, 6, 4, 3, 3, 5, 6, 7, 4],
                }, {
                    name: "D",
                    data: [6, 12, 4, 7, 5, 3, 6, 4, 3, 3, 5, 6, 7, 4],
                }, {
                    name: "E",
                    data: [6, 12, 4, 7, 5, 3, 6, 4, 3, 3, 5, 6, 7, 4],
                }],
            labels: [...Array(24).keys()].map(n => `2018-09-0${n + 1}`) /*[10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]*/,
            xaxis: {
                labels: {
                    show: true
                },
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false
                },
            },
            yaxis: {
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false
                },
                labels: {
                    style: {
                        colors: '#78909c'
                    }
                }
            },
            title: {
                text: 'Solicitudes del Mes',
                align: 'left',
                style: {
                    fontSize: '18px'
                }
            }, dataLabels: {
                enabled: true,
            }
        }

        //var chartBar = new ApexCharts(document.querySelector('#bar'), optionsBar);
        //chartBar.render();

        $scope.optionDonut = {
            chart: {
                type: 'donut',
                width: '100%',
                height: 400
            },
            dataLabels: {
                enabled: true,
            },
            plotOptions: {
                pie: {
                    customScale: 0.8,
                    donut: {
                        size: '50%',
                    },
                    offsetY: 20,
                },
                stroke: {
                    colors: undefined
                }
            },
            colors: colorPalette,
            title: {
                text: 'Resultados del Mes',
                style: {
                    fontSize: '18px'
                }
            },
            series: [0, 0,0,0,0],
            labels: ['A','B','C','D', 'E'],
            legend: {
                position: 'left',
                offsetY: 80
            }
        }

        //var donut = new ApexCharts(document.querySelector("#donut"), optionDonut);
        //donut.render();


        //declarando las opciones para el gráfico de motivos de rechazo
        $scope.optionsRechazos = {
            series: [
                {
                    name: "Funnel Series",
                    data: [1380, 1100, 990, 880, 740, 548, 330, 200],
                },
            ],
            chart: {
                type: 'bar',
                height: 350,
            },
            plotOptions: {
                bar: {
                    borderRadius: 0,
                    horizontal: true,
                    barHeight: '80%',
                    isFunnel: true,
                },
            },
            colors: colorPalette,
            dataLabels: {
                enabled: true,
                formatter: function (val, opt) {
                    return opt.w.globals.labels[opt.dataPointIndex] + ':  ' + val
                },
                dropShadow: {
                    enabled: true,
                },
            },
            title: {
                text: 'Motivos Rechazo',
                align: 'middle',
            },
            xaxis: {
                categories: [
                    'Sourced',
                    'Screened',
                    'Assessed',
                    'HR Interview',
                    'Technical',
                    'Verify',
                    'Offered',
                    'Hired',
                ],
            },
            legend: {
                show: true,
            },
        };


        var data = { "prices": [7114.25, 7126.6, 7116.95, 7203.7, 7233.75, 7451.0, 7381.15, 7348.95, 7347.75, 7311.25, 7266.4, 7253.25, 7215.45, 7266.35, 7315.25, 7237.2, 7191.4, 7238.95, 7222.6, 7217.9, 7359.3, 7371.55, 7371.15, 7469.2, 7429.25, 7434.65, 7451.1, 7475.25, 7566.25, 7556.8, 7525.55, 7555.45, 7560.9, 7490.7, 7527.6, 7551.9, 7514.85, 7577.95, 7592.3, 7621.95, 7707.95, 7859.1, 7815.7, 7739.0, 7778.7, 7839.45, 7756.45, 7669.2, 7580.45, 7452.85, 7617.25, 7701.6, 7606.8, 7620.05, 7513.85, 7498.45, 7575.45, 7601.95, 7589.1, 7525.85, 7569.5, 7702.5, 7812.7, 7803.75, 7816.3, 7851.15, 7912.2, 7972.8, 8145.0, 8161.1, 8121.05, 8071.25, 8088.2, 8154.45, 8148.3, 8122.05, 8132.65, 8074.55, 7952.8, 7885.55, 7733.9, 7897.15, 7973.15, 7888.5, 7842.8, 7838.4, 7909.85, 7892.75, 7897.75, 7820.05, 7904.4, 7872.2, 7847.5, 7849.55, 7789.6, 7736.35, 7819.4, 7875.35, 7871.8, 8076.5, 8114.8, 8193.55, 8217.1, 8235.05, 8215.3, 8216.4, 8301.55, 8235.25, 8229.75, 8201.95, 8164.95, 8107.85, 8128.0, 8122.9, 8165.5, 8340.7, 8423.7, 8423.5, 8514.3, 8481.85, 8487.7, 8506.9, 8626.2], "dates": ["02 Jun 2017", "05 Jun 2017", "06 Jun 2017", "07 Jun 2017", "08 Jun 2017", "09 Jun 2017", "12 Jun 2017", "13 Jun 2017", "14 Jun 2017", "15 Jun 2017", "16 Jun 2017", "19 Jun 2017", "20 Jun 2017", "21 Jun 2017", "22 Jun 2017", "23 Jun 2017", "27 Jun 2017", "28 Jun 2017", "29 Jun 2017", "30 Jun 2017", "03 Jul 2017", "04 Jul 2017", "05 Jul 2017", "06 Jul 2017", "07 Jul 2017", "10 Jul 2017", "11 Jul 2017", "12 Jul 2017", "13 Jul 2017", "14 Jul 2017", "17 Jul 2017", "18 Jul 2017", "19 Jul 2017", "20 Jul 2017", "21 Jul 2017", "24 Jul 2017", "25 Jul 2017", "26 Jul 2017", "27 Jul 2017", "28 Jul 2017", "31 Jul 2017", "01 Aug 2017", "02 Aug 2017", "03 Aug 2017", "04 Aug 2017", "07 Aug 2017", "08 Aug 2017", "09 Aug 2017", "10 Aug 2017", "11 Aug 2017", "14 Aug 2017", "16 Aug 2017", "17 Aug 2017", "18 Aug 2017", "21 Aug 2017", "22 Aug 2017", "23 Aug 2017", "24 Aug 2017", "28 Aug 2017", "29 Aug 2017", "30 Aug 2017", "31 Aug 2017", "01 Sep 2017", "04 Sep 2017", "05 Sep 2017", "06 Sep 2017", "07 Sep 2017", "08 Sep 2017", "11 Sep 2017", "12 Sep 2017", "13 Sep 2017", "14 Sep 2017", "15 Sep 2017", "18 Sep 2017", "19 Sep 2017", "20 Sep 2017", "21 Sep 2017", "22 Sep 2017", "25 Sep 2017", "26 Sep 2017", "27 Sep 2017", "28 Sep 2017", "29 Sep 2017", "03 Oct 2017", "04 Oct 2017", "05 Oct 2017", "06 Oct 2017", "09 Oct 2017", "10 Oct 2017", "11 Oct 2017", "12 Oct 2017", "13 Oct 2017", "16 Oct 2017", "17 Oct 2017", "18 Oct 2017", "19 Oct 2017", "23 Oct 2017", "24 Oct 2017", "25 Oct 2017", "26 Oct 2017", "27 Oct 2017", "30 Oct 2017", "31 Oct 2017", "01 Nov 2017", "02 Nov 2017", "03 Nov 2017", "06 Nov 2017", "07 Nov 2017", "08 Nov 2017", "09 Nov 2017", "10 Nov 2017", "13 Nov 2017", "14 Nov 2017", "15 Nov 2017", "16 Nov 2017", "17 Nov 2017", "20 Nov 2017", "21 Nov 2017", "22 Nov 2017", "23 Nov 2017", "24 Nov 2017", "27 Nov 2017", "28 Nov 2017"] }


        var monthDataSeries1 = {
            "prices": [8107.85, 8128.0, 8122.9, 8165.5, 8340.7, 8423.7, 8423.5, 8514.3, 8481.85, 8487.7, 8506.9, 8626.2, 8668.95, 8602.3, 8607.55, 8512.9, 8496.25, 8600.65, 8881.1, 9340.85],
            "dates": ["13 Nov 2017", "14 Nov 2017", "15 Nov 2017", "16 Nov 2017", "17 Nov 2017", "20 Nov 2017", "21 Nov 2017", "22 Nov 2017", "23 Nov 2017", "24 Nov 2017", "27 Nov 2017", "28 Nov 2017", "29 Nov 2017", "30 Nov 2017", "01 Dec 2017", "04 Dec 2017", "05 Dec 2017", "06 Dec 2017", "07 Dec 2017", "08 Dec 2017"]
        }

        var monthDataSeries2 = {
            "prices": [8423.7, 8423.5, 8514.3, 8481.85, 8487.7, 8506.9, 8626.2, 8668.95, 8602.3, 8607.55, 8512.9, 8496.25, 8600.65, 8881.1, 9040.85, 8340.7, 8165.5, 8122.9, 8107.85, 8128.0]
        }


        


        $(document).ready(function () {

            //new ApexCharts(document.querySelector("#spark1"), $scope.spark1).render();
            //new ApexCharts(document.querySelector("#spark2"), $scope.spark2).render();
            //new ApexCharts(document.querySelector("#spark3"), $scope.spark3).render();

            Loading.LoadingShow("Iniciando Sesión, por favor espere!");

            var parametros = {
                pIdSolicitud: "",
                pTipoDocumento: "",
                pDocumento: "",
                pApellidoPaterno: "",
                pApellidoMaterno: "",
                pNombres: "",
                pFechaIni: "",
                pFechaFin: "",
                pEtapaSolicitud: 0,
                pTopResultado: 5
            };
            Call.Get('/Comercial/Solicitud/ListarBusqueda', parametros, $scope.EstablecerTopSolicitudes);

            //obteniendo listado de Solicitudes de los últimos 45 días
            Call.Get('/Comercial/Solicitud/ListarReporteInicio', null, $scope.EstablecerDatos);

            Call.Get('/Comercial/Solicitud/ListarReporteMotivoRechazo', null, $scope.EstablecerReporteRechazo);

        });


        $scope.EstablecerDatos = function (response) {

           //obteniendo la cantidad de solicitudes
            $scope.oListaSolicitudes = response;       

           //$scope.oSolicitudesAPR = $scope.oListaSolicitudes.filter(item => item.flag_aprobado == true);
           //$scope.oSolicitudesRCH = $scope.oListaSolicitudes.filter(item => item.flag_aprobado == false);

            var vSolicitudesTotal = 0;
            var vTotalAPR = 0;
            var vTotalRCH = 0;
            var vTotalSegA = 0;
            var vTotalSegB = 0;
            var vTotalSegC = 0;
            var vTotalSegD = 0;
            var vTotalSegE = 0;

            $scope.oListaTT_data = [];
            $scope.oListaTT_labels = [];
            $scope.oListaAPR_data = [];
            $scope.oListaAPR_labels = [];
            $scope.oListaRCH_data = [];
            $scope.oListaRCH_labels = [];

            $scope.oListaSegA_data = [];
            $scope.oListaSegB_data = [];
            $scope.oListaSegC_data = [];
            $scope.oListaSegD_data = [];
            $scope.oListaSegE_data = [];

            angular.forEach($scope.oListaSolicitudes, function (item) {

                $scope.oListaTT_data.push(item.cant_solicitudes_mes);
                $scope.oListaTT_labels.push(item.fecha);

                $scope.oListaAPR_data.push(item.cant_aprobados);
                $scope.oListaAPR_labels.push(item.fecha);
                $scope.oListaRCH_data.push(item.cant_rechazados);
                $scope.oListaRCH_labels.push(item.fecha);

                $scope.oListaSegA_data.push(item.cant_seg_a);
                $scope.oListaSegB_data.push(item.cant_seg_b);
                $scope.oListaSegC_data.push(item.cant_seg_c);
                $scope.oListaSegD_data.push(item.cant_seg_d);
                $scope.oListaSegE_data.push(item.cant_seg_e);

                vTotalAPR += item.cant_aprobados;
                vTotalRCH += item.cant_rechazados;   
                vTotalSegA = vTotalSegA + item.cant_seg_a;
                vTotalSegB = vTotalSegB + item.cant_seg_b;
                vTotalSegC = vTotalSegC + item.cant_seg_c;
                vTotalSegD = vTotalSegD + item.cant_seg_d;
                vTotalSegE = vTotalSegE + item.cant_seg_e;
                vSolicitudesTotal = vSolicitudesTotal + item.cant_solicitudes_mes;
            });

            vSolicitudesTotal += vTotalAPR + vTotalRCH;

            //calculando los datos de solicitudes rechazadas
            $scope.vTotalSolicitudes = vSolicitudesTotal;
            $scope.spark1.title.text = vSolicitudesTotal;
            $scope.spark1.series[0].data = $scope.oListaTT_data;
            $scope.spark1.labels = $scope.oListaTT_labels;
            new ApexCharts(document.querySelector("#spark1"), $scope.spark1).render();

            //calculando solicitudes aprobadas
            $scope.spark2.title.text = vTotalAPR;
            $scope.spark2.series[0].data = $scope.oListaAPR_data;
            $scope.spark2.labels = $scope.oListaAPR_labels;
            new ApexCharts(document.querySelector("#spark2"), $scope.spark2).render();

            //calculando solicitudes rechazadas  
            $scope.spark3.title.text = vTotalRCH;
            $scope.spark3.series[0].data = $scope.oListaRCH_data;
            $scope.spark3.labels = $scope.oListaRCH_labels;
            new ApexCharts(document.querySelector("#spark3"), $scope.spark3).render();



            //actualizando los datos de las barras
            $scope.optionsBar.series[0].data = $scope.oListaSegA_data;
            $scope.optionsBar.series[1].data = $scope.oListaSegB_data;
            $scope.optionsBar.series[2].data = $scope.oListaSegC_data;
            $scope.optionsBar.series[3].data = $scope.oListaSegD_data;
            $scope.optionsBar.series[4].data = $scope.oListaSegE_data;
            $scope.optionsBar.labels = $scope.oListaTT_labels;
            //var chartBar = new ApexCharts(document.querySelector('#bar'), optionsBar);
            //chartBar.render();
            new ApexCharts(document.querySelector('#bar'), $scope.optionsBar).render();
            

            //actualizando el gráifoc de donas
            $scope.optionDonut.series = [vTotalSegA, vTotalSegB, vTotalSegC, vTotalSegD, vTotalSegE];
            $scope.optionDonut.labels = ["A", "B", "C", "D", "E"];
            new ApexCharts(document.querySelector("#donut"), $scope.optionDonut).render();

            Loading.LoadingClose();

        }

        $scope.EstablecerReporteRechazo = function (response) {

            $scope.oListaMotivos = [];

            angular.forEach(response, function (item) {
                if ($scope.oListaMotivos.length == 0) {
                    $scope.oListaMotivos.push({ 'motivo': item.motivo, 'cantidad': item.cant_solicitudes });
                } else {
                    var flg_encontro = 0;
                    angular.forEach($scope.oListaMotivos, function (itemB) {
                        if (itemB.motivo == item.motivo) {
                            itemB.cantidad += item.cant_solicitudes;
                            flg_encontro = 1;
                        } 
                    });

                    if (flg_encontro == 0) {
                        $scope.oListaMotivos.push({ 'motivo': item.motivo, 'cantidad': item.cant_solicitudes });
                    }
                }
            });

            var oListaCategorias = [];
            var oListaData = [];


            angular.forEach($scope.oListaMotivos, function (item) {
                oListaCategorias.push(item.motivo);
                oListaData.push(item.cantidad);
            });

            $scope.optionsRechazos.xaxis.categories = oListaCategorias;
            $scope.optionsRechazos.series[0].data = oListaData;

            var chartRechazos = new ApexCharts(document.querySelector("#gRechazos"), $scope.optionsRechazos);
            chartRechazos.render();
        }

        $scope.EstablecerTopSolicitudes = function (response) {

            $scope.cant_registros_busqueda = response.length;
            var taSolicitudes;

            if ($.fn.dataTable.isDataTable('#taSolicitudes')) {
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
                    paging : false,
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
                        $scope.PDEstimada_Sel = parseFloat(pd.toFixed(2)) + "%";
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




        var monthlyEarningsOpt = {
            chart: {
                type: 'area',
                height: 260,
                background: '#eff4f7',
                sparkline: {
                    enabled: true
                },
                offsetY: 20
            },
            stroke: {
                curve: 'straight'
            },
            fill: {
                type: 'solid',
                opacity: 1,
            },
            series: [{
                data: randomizeArray(sparklineData)
            }],
            xaxis: {
                crosshairs: {
                    width: 1
                },
            },
            yaxis: {
                min: 0,
                max: 130
            },
            colors: ['#dce6ec'],

            title: {
                text: 'Total Earned',
                offsetX: -30,
                offsetY: 100,
                align: 'right',
                style: {
                    color: '#7c939f',
                    fontSize: '16px',
                    cssClass: 'apexcharts-yaxis-title'
                }
            },
            subtitle: {
                text: '$135,965',
                offsetX: -30,
                offsetY: 100,
                align: 'right',
                style: {
                    color: '#7c939f',
                    fontSize: '24px',
                    cssClass: 'apexcharts-yaxis-title'
                }
            }
        }

        var monthlyEarningsChart = new ApexCharts(document.querySelector("#monthly-earnings-chart"), monthlyEarningsOpt);

        /*
        var optionsArea = {
            chart: {
                height: 340,
                type: 'area',
                zoom: {
                    enabled: false
                },
            },
            stroke: {
                curve: 'straight'
            },
            colors: colorPalette,
            series: [
                {
                    name: "Blog",
                    data: [{
                        x: 0,
                        y: 0
                    }, {
                        x: 4,
                        y: 5
                    }, {
                        x: 5,
                        y: 3
                    }, {
                        x: 9,
                        y: 8
                    }, {
                        x: 14,
                        y: 4
                    }, {
                        x: 18,
                        y: 5
                    }, {
                        x: 25,
                        y: 0
                    }]
                },
                {
                    name: "Social Media",
                    data: [{
                        x: 0,
                        y: 0
                    }, {
                        x: 4,
                        y: 6
                    }, {
                        x: 5,
                        y: 4
                    }, {
                        x: 14,
                        y: 8
                    }, {
                        x: 18,
                        y: 5.5
                    }, {
                        x: 21,
                        y: 6
                    }, {
                        x: 25,
                        y: 0
                    }]
                },
                {
                    name: "External",
                    data: [{
                        x: 0,
                        y: 0
                    }, {
                        x: 2,
                        y: 5
                    }, {
                        x: 5,
                        y: 4
                    }, {
                        x: 10,
                        y: 11
                    }, {
                        x: 14,
                        y: 4
                    }, {
                        x: 18,
                        y: 8
                    }, {
                        x: 25,
                        y: 0
                    }]
                }
            ],
            fill: {
                opacity: 1,
            },
            title: {
                text: 'Daily Visits Insights',
                align: 'left',
                style: {
                    fontSize: '18px'
                }
            },
            markers: {
                size: 0,
                style: 'hollow',
                hover: {
                    opacity: 5,
                }
            },
            tooltip: {
                intersect: true,
                shared: false,
            },
            xaxis: {
                tooltip: {
                    enabled: false
                },
                labels: {
                    show: false
                },
                axisTicks: {
                    show: false
                }
            },
            yaxis: {
                stepSize: 3,
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false
                },
                labels: {
                    style: {
                        colors: '#78909c'
                    }
                }
            },
            legend: {
                show: false
            }
        }

        var chartArea = new ApexCharts(document.querySelector('#area'), optionsArea);
        chartArea.render();
        */


        function trigoSeries(cnt, strength) {
            var data = [];
            for (var i = 0; i < cnt; i++) {
                data.push((Math.sin(i / strength) * (i / strength) + i / strength + 1) * (strength * 2));
            }

            return data;
        }

        var optionsLine = {
            chart: {
                height: 340,
                type: 'line',
                zoom: {
                    enabled: false
                }
            },
            plotOptions: {
                stroke: {
                    width: 4,
                    curve: 'smooth'
                },
            },
            colors: colorPalette,
            series: [
                {
                    name: "Aprobados",
                    data: trigoSeries(52, 20)
                },
                {
                    name: "Rechazados",
                    data: trigoSeries(52, 27)
                },
            ],
            title: {
                floating: false,
                text: 'Clientes del mes',
                align: 'left',
                style: {
                    fontSize: '18px'
                }
            },
            subtitle: {
                text: '168,215',
                align: 'center',
                margin: 30,
                offsetY: 40,
                style: {
                    color: '#222',
                    fontSize: '24px',
                }
            },
            markers: {
                size: 0
            },

            grid: {

            },
            xaxis: {
                labels: {
                    show: false
                },
                axisTicks: {
                    show: false
                },
                tooltip: {
                    enabled: false
                }
            },
            yaxis: {
                tickAmount: 2,
                labels: {
                    show: false
                },
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false
                },
                min: 0,
            },
            legend: {
                position: 'top',
                horizontalAlign: 'left',
                offsetY: -20,
                offsetX: -30
            }

        }

        var chartLine = new ApexCharts(document.querySelector('#line'), optionsLine);

        // a small hack to extend height in website sample dashboard
        /*chartLine.render().then(function () {
            var ifr = document.querySelector("#wrapper");
            if (ifr.contentDocument) {
                ifr.style.height = ifr.contentDocument.body.scrollHeight + 20 + 'px';
            }
        });*/


        // on smaller screen, change the legends position for donut
        var mobileDonut = function () {
            if ($(window).width() < 768) {
                donut.updateOptions({
                    plotOptions: {
                        pie: {
                            offsetY: -15,
                        }
                    },
                    legend: {
                        position: 'bottom'
                    }
                }, false, false)
            }
            else {
                donut.updateOptions({
                    plotOptions: {
                        pie: {
                            offsetY: 20,
                        }
                    },
                    legend: {
                        position: 'left'
                    }
                }, false, false)
            }
        }

        $(window).resize(function () {
            //mobileDonut()
        });




    }]);