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

            $scope.btnBuscar()

        });

        //obteniendo el tamaño del div del contenedor
        var vHeigth = $('body').height(); //del tamaño que ocupa el menu y las detalles
        var vHeigthHeader = $('#header-main').height();
        var vHeigthNavBar = $('#navbar-main').height();
        var total = vHeigth - vHeigthHeader - vHeigthNavBar - 40;

        

        $scope.btnNuevaAsignacion = function () {

            $("#moAsignacion").modal("show");

        }

        $scope.btnBuscar = function () {


            $scope.EstablecerListaAsignaciones();

        }


        $scope.EstablecerListaAsignaciones = function (response) {

            var taGestores;

            if ($.fn.dataTable.isDataTable('#taAsignaciones')) {
                $('#taAsignaciones').dataTable().fnClearTable();
                $('#taAsignaciones').dataTable().fnAddData(response);
            } else {
                taGestores = $('#taAsignaciones').DataTable({
                    data: response,
                    destroy: true,
                    responsive: true,
                    searching: false,
                    select: true,
                    buttons: [
                        'copy', 'excel', 'pdf'
                    ],
                    columns: [
                        { data: 'id_asignacion' },
                        { data: 'tipo_documento' },
                        { data: 'documento' },
                        { data: 'cliente' },
                        { data: 'ident_contrato' },
                        { data: 'mto_financiado' },
                        { data: 'mto_saldo' },
                        { data: 'fecha_asignacion' },
                        { data: 'documento_gestor' },
                        { data: 'gestor' },
                        { data: 'estado' },
                        {
                            /*targets: -1,*/
                            data: null,
                            defaultContent: '<a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2 align-middle"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg></a>'
                        }
                    ]
                });


                $('#taAsignaciones tbody').on('click', 'a', function () {
                    var data = taGestores.row($(this).parents('tr')).data();
                    console.log("data");
                    console.log(data);
                    $scope.MostrarEditarGestor(data);
                    $("#moAsignacion").modal('show');

                });

            }




            /*taGestores.on('select', function (e, dt, type, indexes) {
                if (type === 'row') {
                    var data = taGestores.rows(indexes).data();

                    if (data.length > 0) {
                        $scope.MostrarPreVistaContrato(data[0]);
                    }
                }
            });*/

        }




    }]);