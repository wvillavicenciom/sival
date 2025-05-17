'use strict';

AppCollFly.controller("RegistroCliente", ['$scope', 'Message', 'MsgData', 'Call', 'Moment', '$http', 'Loading', '$q',
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

        $scope.nc_preventiva = false;
        $scope.nc_cobranza = false;
        $scope.nc_texto = false;
        $scope.nc_whatsapp = false;
        $scope.nc_correo = false;

        $scope.ddlTipoDocumento_Disable = false;
        $scope.txtDocumento_Disable = false;

        $scope.txtContrato_Disable = false;
        $scope.txtFechaActivacion_Disable = false;
        $scope.ddlMoneda_Disable = false;
        $scope.txtPrecioBien_Disable = false;
        $scope.txtInicialBien_Disable = false;
        $scope.txtPorcInicial_Disable = false;
        $scope.txtPlazo_Disable = false;
        $scope.txtTEA_Disable = false;
        $scope.txtTCEA_Disable = false;
        $scope.txtFinanciamiento_Disable = false;
        $scope.txtGastos_Disable = false;
        $scope.ddlEstadoOperacion_Disable = false;
        $scope.txtFechaPrimerVencimiento_Disable = false;
        $scope.txtFechaVencimiento_Disable = false;
        $scope.txtSaldo_Disable = false;
        $scope.txtCuotasPagadas_Disable = false;
        $scope.txtCuotasPendientes_Disable = false;
        $scope.txtCuotasAtrasadas_Disable = false;

        /*
        $scope.oListaTipoDocumento = [{ id_combo: 0, nombre: "<--Seleccione-->" }, { id_combo: 1, nombre: "DNI" }, { id_combo: 2, nombre: "C.E" }];
        $scope.oListaGenero = [{ id_combo: 0, nombre: "<--Seleccione-->" }, { id_combo: 1, nombre: "Masculino" }, { id_combo: 2, nombre: "Femenino" }];
        $scope.oListaEstadoCivil = [{ id_combo: 0, nombre: "<--Seleccione-->" }, { id_combo: 1, nombre: "Soltero" }, { id_combo: 2, nombre: "Casado" }, { id_combo: 3, nombre: "Divorsiado" }, { id_combo: 4, nombre: "Viudo" }];
        */
        $scope.oListaTipoDocumento = [{ id_combo: 0, nombre: "<--Seleccione-->" }];
        $scope.oListaGenero = [{ id_combo: 0, nombre: "<--Seleccione-->" }];
        $scope.oListaEstadoCivil = [{ id_combo: 0, nombre: "<--Seleccione-->" }];

        $scope.oListaDepartamento = [{ id_combo: 0, nombre: "<--Seleccione-->" }];
        $scope.oListaProvincia = [{ id_combo: 0, nombre: "<--Seleccione-->" }];
        $scope.oListaDistrito = [{ id_combo: 0, nombre: "<--Seleccione-->" }];

        $scope.oListaDepartamentoDireccion = [{ id_combo: 0, nombre: "<--Seleccione-->" }];
        $scope.oListaProvinciaDireccion = [{ id_combo: 0, nombre: "<--Seleccione-->" }];
        $scope.oListaDistritoDireccion = [{ id_combo: 0, nombre: "<--Seleccione-->" }];

        $scope.oListaMonedaContrato = [{ id_combo: 0, nombre: "<--Seleccione-->" }];
        $scope.oListaEstadoContrato = [{ id_combo: 0, nombre: "<--Seleccione-->" }];


        $scope.ddlTipoDocumento = $scope.oListaTipoDocumento[0];
        $scope.ddlGenero = $scope.oListaGenero[0];
        $scope.ddlEstadoCivil = $scope.oListaEstadoCivil[0];

        $scope.ddlDepartamento = $scope.oListaDepartamento[0];
        $scope.ddlProvincia = $scope.oListaProvincia[0];
        $scope.ddlDistrito = $scope.oListaDistrito[0];

        $scope.ddlDepartamentoDireccion = $scope.oListaDepartamentoDireccion[0];
        $scope.ddlProvinciaDireccion = $scope.oListaProvinciaDireccion[0];
        $scope.ddlDistritoDireccion = $scope.oListaDistritoDireccion[0];

        $scope.ddlMonedaContrato = $scope.oListaMonedaContrato[0];
        $scope.ddlEstadoContrato = $scope.oListaEstadoContrato[0];

        $scope.id_cliente_sel = 0;
        $scope.id_telefono_sel = 0;

        $(document).ready(function () {

            //Varificar Permisos
            Call.Get('/Seguridad/Generico/TipoDocumentoCombo', null, $scope.EstablecerListaTipoDocumento);

            //Genero
            Call.Get('/Seguridad/Generico/GeneroCombo', null, $scope.EstablecerListaGenero);

            //EstadoCivil
            Call.Get('/Seguridad/Generico/EstadoCivilCombo', null, $scope.EstablecerListaEstadoCivil);

            //Departamento
            Call.Get('/Seguridad/Generico/DepartamentoCombo', null, $scope.EstablecerListaDepartamento);

            //Genero
            Call.Get('/Seguridad/Generico/MonedaCombo', null, $scope.EstablecerListaMonedaContrato);

            //Estado Contrato
            Call.Get('/Seguridad/Generico/EstadoContratoCombo', null, $scope.EstablecerListaEstadoContrato);

            //Tipo Telefono
            Call.Get('/Seguridad/Generico/TipoTelefonoCombo', null, $scope.EstablecerListaTipoTelefono);

            //Operador Telefono
            Call.Get('/Seguridad/Generico/OperadorTelefonoCombo', null, $scope.EstablecerOperadorTelefono);

            //Tipo Correo
            Call.Get('/Seguridad/Generico/TipoCorreoCombo', null, $scope.EstablecerListaTipoCorreo);

            //Tipo Direccion
            Call.Get('/Seguridad/Generico/TipoDireccionCombo', null, $scope.EstablecerListaTipoDireccion);


            //Departamento
            Call.Get('/Seguridad/Generico/DepartamentoCombo', null, $scope.EstablecerListaDepartamentoDireccion);


            /*$('#taContratos').DataTable({
                ajax: '../ajax/data/arrays.txt',
            });

            $('#taGestiones').DataTable({
                ajax: '../ajax/data/arrays.txt',
            });

            $('#taGestionesAutomaticas').DataTable({
                ajax: '../ajax/data/arrays.txt',
            });
            */


            var strParametro = location.search.replace('?', '');
            var arParametros = strParametro.split('&');

            if (arParametros.length > 0) {
                var vIdCliente = arParametros[0].split("=")[1];
                $scope.id_cliente_sel = vIdCliente;

                //Si esque existe el trato se obtiene los datos de la cotización ya registrada
                if (vIdCliente > 0) {
                    //Loading.LoadingShow("Cargando datos del trato, por favor espere!");
                    //var parEdit = { pTrato: $scope.ident_trato};
                    //Call.Get($scope.NameController + '/ObtenerTrato', parEdit, $scope.EstablecerEditarTrato);
                    Loading.LoadingShow("Cargando datos del trato, por favor espere!");

                    $scope.ddlTipoDocumento_Disable = true;
                    $scope.txtDocumento_Disable = true;

                    setTimeout($scope.btnEditar, 2000);
                }
            }

        });

        $scope.btnNuevoContrato = function () {

            $scope.vgTituloModalContrato = "Registro de Contrato"

            $scope.id_contrato_sel = null;// ;
            $scope.txtCodigoContrato = null;// ;
            $scope.txtFechaActivacion = null;// ;
            $scope.txtPrecioBien = null;// 
            $scope.txtInicialBien = null;// 
            $scope.txtPorcInicial = null;// 
            $scope.txtPlazo = null;// 
            $scope.txtTEA = null;// 
            $scope.txtTCEA = null;// ;
            $scope.txtFinanciamiento = null;// ;
            $scope.txtGastos = null;// ;
            $scope.txtFechaPrimerVencimiento = null;// new Date(Moment.formatToDate(pContrato.fecha_primer_vencimiento, "DD/MM/YYYY"));
            $scope.txtFechaVencimiento = null;// new Date(Moment.formatToDate(pContrato.fecha_vencimiento, "DD/MM/YYYY"));
            $scope.txtSaldo =0;
            $scope.txtCuotasPagadas = 0;
            $scope.txtCuotasPendientes = 0;
            $scope.txtCuotasAtrasadas = 0;
            $scope.chkActivo = true;

            /*
            angular.forEach($scope.oListaMonedaContrato, function (item) {
                if (item.id == pContrato.i005_moneda) {
                    $scope.ddlMonedaContrato = item;
                }
            });


            angular.forEach($scope.oListaEstadoContrato, function (item) {
                if (item.id == pContrato.i013_estado_contrato) {
                    $scope.ddlEstadoContrato = item;
                }
            });*/

            $scope.txtContrato_Disable = false;
            $scope.txtFechaActivacion_Disable = false;
            $scope.ddlMoneda_Disable = false;
            $scope.txtPrecioBien_Disable = false;
            $scope.txtInicialBien_Disable = false;
            $scope.txtPorcInicial_Disable = false;
            $scope.txtPlazo_Disable = false;
            $scope.txtTEA_Disable = false;
            $scope.txtTCEA_Disable = false;
            $scope.txtFinanciamiento_Disable = false;
            $scope.txtGastos_Disable = false;
            $scope.ddlEstadoOperacion_Disable = false;
            $scope.txtFechaPrimerVencimiento_Disable = true;
            $scope.txtFechaVencimiento_Disable = true;
            $scope.txtSaldo_Disable = true;
            $scope.txtCuotasPagadas_Disable = true;
            $scope.txtCuotasPendientes_Disable = true;
            $scope.txtCuotasAtrasadas_Disable = true;


            $("#moContrato").modal("show");

        }

        $scope.btnNuevoTelefonoo = function () {

            $scope.id_telefono_sel = 0;
            $scope.ddlTipoTelefono.id = $scope.oListaTipoTelefono[0];
            $scope.txtTelefonoEdit = "";
            $scope.ddlOperadorTelefono.id = $scope.oListaOperadorTelefono[0];
            $scope.chkActivoTelefono;
            $scope.tadComentarioTelefono = "";


            $("#moTelefonos").modal("show");

        }

        $scope.btnNuevoCorreo = function () {


            $("#moCorreos").modal("show");

        }

        $scope.btnNuevaDireccion = function () {

            $scope.id_direccion_sel = 0;
            $scope.txtDireccionEdit = "";
            $scope.taReferenciaDireccion = "";
            $scope.taComentarioDireccion = "";

            $scope.id_departamento_direccion_sel = "";
            $scope.id_provincia_direccion_sel = "";
            $scope.id_distrito_direccion_sel = "";


            $("#moDirecciones").modal("show");

        }

        $scope.btnNuevaGestion = function () {

            $scope.vgTituloModalGestiones = "Registro de Gestión"
            $("#moGestiones").modal("show");

        }

        $scope.btnCargarProvincia = function () {
            var pIdDepartamento = $scope.ddlDepartamento.id;
            var param = { pIdDepartamento: pIdDepartamento };
            //Message.AlertInfo("Información", "Seleccionado " + pIdDepartamento);
            Call.Get('/Seguridad/Generico/ProvinciaCombo', param , $scope.EstablecerListaProvincia);
        }

        $scope.btnCargarDistrito = function () {
            var pIdDepartamento = $scope.ddlDepartamento.id;
            var pIdProvincia = $scope.ddlProvincia.id;
            var param = { pIdDepartamento: pIdDepartamento, pIdProvincia : pIdProvincia };
            //Message.AlertInfo("Información", "Seleccionado Provincia" + pIdProvincia);
            Call.Get('/Seguridad/Generico/DistritoCombo', param, $scope.EstablecerListaDistrito);
        }

        $scope.btnCargarProvinciaDireccion = function (pIdDepartamento) {
            var vIdDepartamento = 0;
            if (pIdDepartamento > 0) {
                vIdDepartamento = pIdDepartamento;
            } else {
                vIdDepartamento = $scope.ddlDepartamentoDireccion.id;
            }
            
            var param = { pIdDepartamento: vIdDepartamento };

            Call.Get('/Seguridad/Generico/ProvinciaCombo', param, $scope.EstablecerListaProvinciaDireccion);
        }

        $scope.btnCargarDistritoDireccion = function (pIdDepartamento, pIdProvincia) {

            console.log("Caegando provincias");

            var vIdDepartamento = 0; 
            var vIdProvincia = 0;

            if (pIdDepartamento > 0) {
                vIdDepartamento = pIdDepartamento;
                vIdProvincia = pIdProvincia;
            } else {
                vIdDepartamento = $scope.ddlDepartamentoDireccion.id;
                vIdProvincia = $scope.ddlProvinciaDireccion.id;
            }
            
            var param = { pIdDepartamento: vIdDepartamento, pIdProvincia: vIdProvincia };

            Call.Get('/Seguridad/Generico/DistritoCombo', param, $scope.EstablecerListaDistritoDireccion);
        }


        $scope.btnEditar = function () {

            var param = { pIdCliente: $scope.id_cliente_sel };
            
            Call.Get('/Administracion/Cliente/ClienteObtener', param, $scope.EstablecerDatosCliente);

            
        }

        $scope.btnGuardar = function () {

            var oCliente = $scope.ObtenerEntidadCliente();

            
            //Validando Datos de cliente
            if (oCliente.i002_tipo_documento == 0 || oCliente.i002_tipo_documento == undefined) {
                Message.AlertError("Error", "Debe seleccionar un tipo de documento!");
                return;
            }

            if (oCliente.documento == undefined || oCliente.documento.length <= 5) {
                Message.AlertError("Error", "Debe ingresar un documento válido!");
                return;
            }

            if (oCliente.apellido_paterno == undefined || oCliente.apellido_paterno.length < 3) {
                Message.AlertError("Error", "Debe ingresar un apellido paterno!");
                return;
            }

            if (oCliente.apellido_materno == undefined || oCliente.apellido_materno.length < 3) {
                Message.AlertError("Error", "Debe ingresar un apellido materno!");
                return;
            }

            if (oCliente.nombres == undefined || oCliente.nombres.length < 3) {
                Message.AlertError("Error", "Debe ingresar un nombre!");
                return;
            }

            if (Moment.Valid(oCliente.fecha_nacimiento) == false) {
                Message.AlertError("Error", "Fecha de nacimiento inválida!");
                return;
            }

            if (oCliente.i011_genero == 0 || oCliente.i011_genero == undefined) {
                Message.AlertError("Error", "Debe seleccionar un genero!");
                return;
            }

            if (oCliente.i012_estado_civil == 0 || oCliente.i012_estado_civil == undefined) {
                Message.AlertError("Error", "Debe seleccionar un estado civil!");
                return;
            }

            var vErrorTelefono = true;
            var vErrorCorreo = true;

            if (oCliente.telefono == undefined || oCliente.telefono.length < 9) {
                vErrorTelefono = false;
            }

            if (oCliente.correo == undefined || oCliente.correo.length < 10) {
                vErrorCorreo = false;
            }

            if (vErrorCorreo == false && vErrorTelefono == false) {
                Message.AlertError("Error", "Debe ingresar un telefono o correo!");
                return;
            }

            if (oCliente.direccion == undefined || oCliente.direccion.length < 10) {
                Message.AlertError("Error", "Debe ingresar una dirección (10 caracteres min)!");
                return;
            }
            

            Loading.LoadingShow("Guardando datos, por favor espere!");

            var param = { pClienteBE: oCliente };

            Call.PostAjax(true, '/Administracion/Cliente/GuardarCliente', oCliente, $scope.EstablecerGuardarCliente);
        }

        $scope.btnGuardarContrato = function () {

            var oEntidad = $scope.ObtenerEntidadContrato();

            if (Moment.Valid(oEntidad.fecha_Activacion) == false) {
                Message.AlertError("Error", "Fecha de activación incorrecta!");
                return;
            }

            if (oEntidad.i005_moneda == 0 || oEntidad.i005_moneda == undefined) {
                Message.AlertError("Error", "Debe seleccionar una moneda!");
                return;
            }

            if (oEntidad.mto_precio_bien == undefined || oEntidad.mto_precio_bien.length <=0) {
                Message.AlertError("Error", "Debe ingresar un precio mayor a 0!");
                return;
            }

            if (oEntidad.mto_inicial_bien == undefined || oEntidad.mto_inicial_bien.length <= 0) {
                Message.AlertError("Error", "Debe ingresar una inicial mayor a 0!");
                return;
            }

            if (oEntidad.porc_inicial == undefined || oEntidad.porc_inicial.length <= 0) {
                Message.AlertError("Error", "Debe ingresar un % de inicial mayor a 0!");
                return;
            }

            if (oEntidad.plazo == undefined || oEntidad.plazo.length <= 0) {
                Message.AlertError("Error", "Debe ingresar un plazo mayor a 0!");
                return;
            }

            if (oEntidad.tea == undefined || oEntidad.tea.length <= 0) {
                Message.AlertError("Error", "Debe ingresar una TEA a 0!");
                return;
            }

            if (oEntidad.tcea == undefined || oEntidad.tcea.length <= 0) {
                Message.AlertError("Error", "Debe ingresar una TCEA mayor a 0!");
                return;
            }

            Loading.LoadingShow("Guardando datos, por favor espere!");

            console.log("Entidad Contrato");
            console.log(oEntidad);

            if (oEntidad.id_contrato > 0) {
                Call.PostAjax(true, '/Operaciones/Contrato/Actualizar', oEntidad, $scope.EstablecerActualizarContrato);
            } else {
                Call.PostAjax(true, '/Operaciones/Contrato/Registrar', oEntidad, $scope.EstablecerRegistrarContrato);
            }  
        }

        $scope.btnGuardarTelefono = function () {

            var oEntidad = $scope.ObtenerEntidadTelefono();

            console.log("Entidad Telefono");
            console.log(oEntidad);

            if (oEntidad.i008_tipo_telefono == 0 || oEntidad.i008_tipo_telefono == undefined) {
                Message.AlertError("Error", "Debe seleccionar un tipo de telefono!");
                return;
            }

            if (oEntidad.numero == "" || oEntidad.numero == undefined) {
                Message.AlertError("Error", "Debe ingresar un número de telefono!");
                return;
            }


            if (oEntidad.i007_operador == 0 || oEntidad.i007_operador == undefined) {
                Message.AlertError("Error", "Debe seleccionar un operador de telefono!");
                return;
            }

            if (oEntidad.comentario == "" || oEntidad.comentario == undefined) {
                Message.AlertError("Error", "Debe ingresar comentario de telefono!");
                return;
            }

            Loading.LoadingShow("Guardando datos, por favor espere!");

            

            if (oEntidad.id_telefono > 0) {
                Call.PostAjax(true, '/Administracion/Telefono/Actualizar', oEntidad, $scope.EstablecerActualizarTelefono);
            } else {
                Call.PostAjax(true, '/Administracion/Telefono/Registrar', oEntidad, $scope.EstablecerRegistrarTelefono);
            } 
        }

        $scope.btnGuardarCorreo = function () {

            var oEntidad = $scope.ObtenerEntidadCorreo();

            console.log("Entidad Correo");
            console.log(oEntidad);

            if (oEntidad.i009_tipo_correo == 0 || oEntidad.i009_tipo_correo == undefined) {
                Message.AlertError("Error", "Debe seleccionar un tipo de correo!");
                return;
            }

            if (oEntidad.correo == "" || oEntidad.correo == undefined) {
                Message.AlertError("Error", "Debe ingresar un correo válido!");
                return;
            }

            Loading.LoadingShow("Guardando datos, por favor espere!");



            if (oEntidad.id_correo > 0) {
                Call.PostAjax(true, '/Administracion/Correo/Actualizar', oEntidad, $scope.EstablecerActualizarCorreo);
            } else {
                Call.PostAjax(true, '/Administracion/Correo/Registrar', oEntidad, $scope.EstablecerRegistrarCorreo);
            }
        }

        $scope.btnGuardarDireccion = function () {

            var oEntidad = $scope.ObtenerEntidadDireccion();

            console.log("Entidad Direccion");
            console.log(oEntidad);

            if (oEntidad.i010_tipo_direccion == 0 || oEntidad.i010_tipo_direccion == undefined) {
                Message.AlertError("Error", "Debe seleccionar un tipo de Direccion!");
                return;
            }

            if (oEntidad.id_departamento == 0 || oEntidad.id_departamento == undefined) {
                Message.AlertError("Error", "Debe seleccionar un departamento!");
                return;
            }

            if (oEntidad.id_provincia == 0 || oEntidad.id_provincia == undefined) {
                Message.AlertError("Error", "Debe seleccionar una provincia!");
                return;
            }

            if (oEntidad.id_distrito == 0 || oEntidad.id_distrito == undefined) {
                Message.AlertError("Error", "Debe seleccionar un distrito!");
                return;
            }

            if (oEntidad.direccion == "" || oEntidad.direccion == undefined) {
                Message.AlertError("Error", "Debe ingresar una direccion válida!");
                return;
            }

            if (oEntidad.referencia == "" || oEntidad.referencia == undefined) {
                Message.AlertError("Error", "Debe ingresar una referencia válida!");
                return;
            }

            Loading.LoadingShow("Guardando datos, por favor espere!");



            if (oEntidad.id_direccion > 0) {
                Call.PostAjax(true, '/Administracion/Direccion/Actualizar', oEntidad, $scope.EstablecerActualizarDireccion);
            } else {
                Call.PostAjax(true, '/Administracion/Direccion/Registrar', oEntidad, $scope.EstablecerRegistrarDireccion);
            }
        }


        $scope.btnCargarContratos = function () {
            var param = { pIdCliente: $scope.id_cliente_sel };

            Call.Get('/Operaciones/Contrato/ContratosListar', param, $scope.EstablecerListaContratos);
        }

        $scope.btnCargarTelefonos = function () {
            var param = { pIdCliente: $scope.id_cliente_sel };

            Call.Get('/Administracion/Telefono/ListarPorCliente', param, $scope.EstablecerListaTelefonos);
        }

        $scope.btnCargarCorreos = function () {
            var param = { pIdCliente: $scope.id_cliente_sel };

            Call.Get('/Administracion/Correo/ListarPorCliente', param, $scope.EstablecerListaCorreos);
        }

        $scope.btnCargarDirecciones = function () {
            var param = { pIdCliente: $scope.id_cliente_sel };

            Call.Get('/Administracion/Direccion/ListarPorCliente', param, $scope.EstablecerListaDirecciones);
        }

        $scope.btnEliminarTelefono = function (pEntidad) {

            console.log("Entidad Eliminar");
            console.log(pEntidad);

            Loading.LoadingShow("Eliminando telefono, por favor espere!");

            var pTelefonoBE = {
                id_telefono: pEntidad.id_telefono,
                id_cliente: pEntidad.id_cliente
            }
            //pIdTelefono, Int32 pIdCliente

            Call.PostAjax(false,'/Administracion/Telefono/Eliminar', pTelefonoBE, $scope.EstablecerEliminarTelefono);

        }

        $scope.btnEliminarCorreo = function (pEntidad) {

            console.log("Entidad Eliminar");
            console.log(pEntidad);

            Loading.LoadingShow("Eliminando Correo, por favor espere!");

            var pCorreoBE = {
                id_correo: pEntidad.id_correo,
                id_cliente: pEntidad.id_cliente
            }

            Call.PostAjax(false, '/Administracion/Correo/Eliminar', pCorreoBE, $scope.EstablecerEliminarCorreo);

        }

        $scope.btnEliminarDireccion = function (pEntidad) {

            console.log("Entidad Eliminar");
            console.log(pEntidad);

            Loading.LoadingShow("Eliminando Direccion, por favor espere!");

            var pDireccionBE = {
                id_direccion: pEntidad.id_direccion,
                id_cliente: pEntidad.id_cliente
            }

            Call.PostAjax(false, '/Administracion/Direccion/Eliminar', pDireccionBE, $scope.EstablecerEliminarDireccion);

        }

        $scope.btnCargarGestiones = function () {
            //var param = { pIdCliente: $scope.id_cliente_sel };
            //
            //Call.Get('/Cobranza/Gestiones/GestionesUsuariosListar', param, $scope.EstablecerListaGestionesUsuarios);
        }

        $scope.btnCargarGestionesAutomaticas = function () {
            //var param = { pIdCliente: $scope.id_cliente_sel };
            //
            //Call.Get('/Cobranza/Gestiones/GestionesAutomaticasListar', param, $scope.EstablecerListaGestionesAutomaticas);
        }

        $scope.btnCargarConfiguraciones = function () {
            //var param = { pIdCliente: $scope.id_cliente_sel };
            //
            //Call.Get('/Administracion/Cliente/ClienteObtener', param, $scope.EstablecerConfiguraciones;
        }

        $scope.ObtenerEntidadCliente = function () {

            var vTipoDocumento = $scope.ddlTipoDocumento.id;
            var vDocumento = $scope.txtDocumento;
            var vApellidoPaterno = $scope.txtApellidoPaterno;
            var vApellidoMaterno = $scope.txtApellidoMaterno;
            var vNombres = $scope.txtNombres;
            var vFechaNacimiento = $scope.txtFechaNacimiento;
            var vGenero = $scope.ddlGenero.id;
            var vEstadoCivil = $scope.ddlEstadoCivil.id;
            var vTelefono = $scope.txtTelefonoPrincipal;
            var vCorreo = $scope.txtCorreoPrincipal;
            var vDireccion = $scope.txtDireccionPrincipal;
            var vDepartamento = $scope.ddlDepartamento.id;
            var vProvincia = $scope.ddlProvincia.id;
            var vDistrito = $scope.ddlDistrito.id;

            var voCliente = {
                id_cliente: $scope.id_cliente_sel,
                i002_tipo_documento: vTipoDocumento,
                documento : vDocumento,
                apellido_paterno: vApellidoPaterno,
                apellido_materno: vApellidoMaterno,
                nombres: vNombres,
                fecha_nacimiento: vFechaNacimiento,
                i011_genero: vGenero,
                i012_estado_civil: vEstadoCivil,
                telefono: vTelefono,
                correo: vCorreo,
                direccion: vDireccion,
                id_departamento: vDepartamento,
                id_provincia: vProvincia,
                id_distrito: vDistrito
            }

            //console.log("Cliente");
            //console.log(voCliente);

            return voCliente;

        }

        $scope.ObtenerEntidadContrato = function () {

            var vCodigo = $scope.txtCodigoContrato;
            var vFechaActivacion = $scope.txtFechaActivacion;
            var vIdMoneda = $scope.ddlMonedaContrato.id;
            var vPrecioBien = $scope.txtPrecioBien;
            var vInicialBien = $scope.txtInicialBien;
            var vPorcInicial = $scope.txtPorcInicial;
            var vPlazo = $scope.txtPlazo;
            var vTea = $scope.txtTEA;
            var vTCea = $scope.txtTCEA;
            var vFinanciamiento = $scope.txtFinanciamiento;
            var vGastos = $scope.txtGastos;
            var vIdEstado = $scope.ddlEstadoContrato.id;
            var vActivo = $scope.chkActivo;
            //var vPrimerVencimiento = $scope.txtFechaPrimerVencimiento;
            //var vVencimiento = $scope.txtFechaVencimiento;
            //var vSaldo = $scope.txtSaldo;
            //var

            var oEntidad = {
                id_contrato: parseInt($scope.id_contrato_sel),
                id_cliente : parseInt($scope.id_cliente_sel),
                ident_contrato: vCodigo,
                fecha_Activacion : vFechaActivacion,
                i005_moneda: vIdMoneda,
                mto_precio_bien: vPrecioBien,
                mto_inicial_bien: vInicialBien,
                porc_inicial: vPorcInicial,
                plazo: vPlazo,
                tea: vTea,
                tcea: vTCea,
                mto_financiado: vFinanciamiento,
                mto_gasto: vGastos,
                i006_estado_contrato: vIdEstado,
                activo : vActivo
            }

            return oEntidad;
        }

        $scope.ObtenerEntidadTelefono = function () {

            var vIdTelefono = $scope.id_telefono_sel;
            var vTipoTelefono = $scope.ddlTipoTelefono.id;
            var vTelefono = $scope.txtTelefonoEdit;
            var vOperador = $scope.ddlOperadorTelefono.id;
            var vActivo = $scope.chkActivoTelefono;
            var vComentario = $scope.tadComentarioTelefono;

            var oEntidad = {
                id_telefono: vIdTelefono,
                id_cliente : parseInt($scope.id_cliente_sel),
                i008_tipo_telefono: vTipoTelefono,
                numero: vTelefono,
                i007_operador: vOperador,
                activo: vActivo,
                comentario : vComentario
            }

            return oEntidad;

        }

        $scope.ObtenerEntidadCorreo = function () {

            var vIdCorreo = $scope.id_correo_sel;
            var vTipoCorreo = $scope.ddlTipoCorreo.id;
            var vCorreo = $scope.txtCorreoEdit;
            var vActivo = $scope.chkActivoCorreo;
            var vComentario = $scope.taComentarioCorreo;

            var oEntidad = {
                id_correo: vIdCorreo,
                id_cliente: parseInt($scope.id_cliente_sel),
                i009_tipo_correo: vTipoCorreo,
                correo: vCorreo,
                activo: vActivo,
                comentario: vComentario
            }

            return oEntidad;

        }

        $scope.ObtenerEntidadDireccion = function () {

            var vIdDireccion = $scope.id_direccion_sel;
            var vTipoDireccion = $scope.ddlTipoDireccion.id;
            var vDireccion = $scope.txtDireccionEdit;
            var vActivo = $scope.chkActivoDireccion;
            var vReferencia = $scope.taReferenciaDireccion;
            var vComentario = $scope.taComentarioDireccion;
            var vDepartamentoDireccion = $scope.ddlDepartamentoDireccion.id;
            var vProvinciaDireccion = $scope.ddlProvinciaDireccion.id;
            var vDistritoDireccion = $scope.ddlDistritoDireccion.id;

            var oEntidad = {
                id_direccion: vIdDireccion,
                id_cliente: parseInt($scope.id_cliente_sel),
                i010_tipo_direccion: vTipoDireccion,
                direccion: vDireccion,
                referencia : vReferencia,
                activo: vActivo,
                comentario: vComentario,
                id_departamento: vDepartamentoDireccion,
                id_provincia: vProvinciaDireccion,
                id_distrito: vDistritoDireccion
            }

            return oEntidad;
        }

        $scope.EstablecerGuardarCliente = function (response) {

            if (response != null) {
                if (response.st == 1) {
                    Message.AlertSuccess("Correcto", "Cliente guardado correctamente!");
                } else {
                    Message.AlertError("Error", "Error al guardar cliente!");
                }                
            }

            Loading.LoadingClose();

        }

        $scope.EstablecerListaTipoDocumento = function (response) {

            $scope.oListaTipoDocumento = response;
            $scope.ddlTipoDocumento = $scope.oListaTipoDocumento[0];

        }

        $scope.EstablecerListaGenero = function (response) {

            $scope.oListaGenero = response;
            $scope.ddlGenero = $scope.oListaGenero[0];
        }

        $scope.EstablecerListaEstadoCivil = function (response) {

            $scope.oListaEstadoCivil = response;
            $scope.ddlEstadoCivil = $scope.oListaEstadoCivil[0];

        }

        $scope.EstablecerListaDepartamento = function (response) {

            $scope.oListaDepartamento = response;
            $scope.ddlDepartamento = $scope.oListaDepartamento[0];
        }

        $scope.EstablecerListaMonedaContrato = function (response) {

            $scope.oListaMonedaContrato = response;
            $scope.ddlMonedaContrato = $scope.oListaMonedaContrato[0];
        }

        $scope.EstablecerListaEstadoContrato = function (response) {

            $scope.oListaEstadoContrato = response;
            $scope.ddlEstadoContrato = $scope.oListaEstadoContrato[0];
        }

        $scope.EstablecerListaProvincia = function (response) {

            $scope.oListaProvincia = response;
            $scope.ddlProvincia = $scope.oListaProvincia[0];
        }

        $scope.EstablecerListaDistrito = function (response) {

            $scope.oListaDistrito = response;
            $scope.ddlDistrito = $scope.oListaDistrito[0];
        }

        $scope.EstablecerListaDepartamentoDireccion = function (response) {

            $scope.oListaDepartamentoDireccion = response;
            $scope.ddlDepartamentoDireccion = $scope.oListaDepartamentoDireccion[0];
        }

        $scope.EstablecerListaProvinciaDireccion = function (response) {

            $scope.oListaProvinciaDireccion = response;

            if ($scope.id_provincia_direccion_sel != null && $scope.id_provincia_direccion_sel != "") {
                angular.forEach($scope.oListaProvinciaDireccion, function (item) {
                    if (item.id == $scope.id_provincia_direccion_sel) {
                        $scope.ddlProvinciaDireccion = item;
                    }
                });
            } else {
                $scope.ddlProvinciaDireccion = $scope.oListaProvinciaDireccion[0];
            }

            
        }

        $scope.EstablecerListaDistritoDireccion = function (response) {

            $scope.oListaDistritoDireccion = response;

            if ($scope.id_distrito_direccion_sel != null && $scope.id_distrito_direccion_sel != "") {
                angular.forEach($scope.oListaDistritoDireccion, function (item) {
                    if (item.id == $scope.id_distrito_direccion_sel) {
                        $scope.ddlDistritoDireccion = item;
                    }
                });
            } else {
                $$scope.ddlDistritoDireccion = $scope.oListaDistritoDireccion[0];
            }

            
        }

        //Método para cargar los datos del cliente a editar
        $scope.EstablecerDatosCliente = function (response) {

            $scope.oClienteBE = response;
            //console.log("$scope.oClienteBE");
            //console.log($scope.oClienteBE);

            $scope.LimpiarDatos();

            if (response != null) {
                Message.AlertSuccess("Cliente Encontrado", "vamos a cargar los datos del cliente");
                $scope.txtDocumento = $scope.oClienteBE.documento;
                $scope.txtApellidoPaterno = $scope.oClienteBE.apellido_paterno;
                $scope.txtApellidoMaterno = $scope.oClienteBE.apellido_materno;
                $scope.txtNombres = $scope.oClienteBE.nombres;
                var vNacimiento = Moment.formatASP_DDMMYYYY($scope.oClienteBE.fecha_nacimiento);
                console.log("vNacimiento");
                console.log(Moment.format(vNacimiento, "DD/MM/YYYY"));
                //var vFechaNacimiento = new Date(Moment.format(Moment.format(vNacimiento, "DD/MM/YYYY"), "mm-DD-yyyy"));
                var vFechaNacimiento = new Date(Moment.formatToDate(vNacimiento, "DD/MM/YYYY"));
                console.log("FechaNacimiento");
                console.log(vFechaNacimiento);
                $scope.txtFechaNacimiento = vFechaNacimiento;

                angular.forEach($scope.oListaTipoDocumento, function (item) {
                    if (item.id == $scope.oClienteBE.i002_tipo_documento) {
                        $scope.ddlTipoDocumento = item;
                    }
                });

                angular.forEach($scope.oListaGenero, function (item) {
                    if (item.id == $scope.oClienteBE.i011_genero) {
                        $scope.ddlGenero = item;
                    }
                });

                angular.forEach($scope.oListaEstadoCivil, function (item) {
                    if (item.id == $scope.oClienteBE.i012_estado_civil) {
                        $scope.ddlEstadoCivil = item;
                    }
                });

                $scope.btnCargarContratos();
                $scope.btnCargarGestiones();
                $scope.btnCargarGestionesAutomaticas();
                $scope.btnCargarConfiguraciones();
                $scope.btnCargarTelefonos();
                $scope.btnCargarCorreos();
                $scope.btnCargarDirecciones();

                Loading.LoadingClose();

                //$scope.$apply();

            } else {
                Message.AlertError("Error", "error al cargar datos del cliente");
                Loading.LoadingClose();
            }
            
        }

        $scope.EstablecerListaContratos = function (response) {

            var taContratos = $('#taContratos').DataTable({
                data: response,
                responsive: true,
                searching: false,
                select: true,
                buttons: [
                    'copy', 'excel', 'pdf'
                ],
                columns: [
                    { data: 'id_contrato' },
                    { data: 'ident_contrato' },
                    { data: 'mto_precio_bien' },
                    { data: 'mto_inicial_bien' },
                    { data: 'mto_financiado' },
                    { data: 'plazo' },
                    { data: 'tea' },
                    { data: 'mto_financiado' },
                    {
                        /*targets: -1,*/
                        data: null,
                        defaultContent: '<a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2 align-middle"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg></a>'
                    }
                ]/*,
                 columnDefs: [
                     {
                         targets: -1,
                         data: null,
                         defaultContent: '<button>Click!</button>',
                     },
                 ],*/
            });


            $('#taContratos tbody').on('click', 'a', function () {
                var data = taContratos.row($(this).parents('tr')).data();
                //alert(data["documento"] + "'s ID is: " + data["id_cliente"]);
                $scope.vgIdContratoSelec = data["id_contrato"];
                var param = { pIdContrato: $scope.vgIdContratoSelec };

                Call.Get('/Operaciones/Contrato/CronogramaListar', param, $scope.EstablecerListaCronograma);

                $("#moContrato").modal('show');
                $scope.MostrarEditarContrato(data);

            });

            taContratos.on('select', function (e, dt, type, indexes) {
                if (type === 'row') {
                    var data = taContratos.rows(indexes).data();

                    if (data.length > 0) {                                               
                        $scope.MostrarPreVistaContrato(data[0]);
                    }
                }
            });

        }

        $scope.MostrarEditarContrato = function (pContrato) {

            $scope.id_contrato_sel = pContrato.id_contrato;
            $scope.txtCodigoContrato = pContrato.ident_contrato;
            $scope.txtFechaActivacion = new Date(Moment.formatToDate(pContrato.fecha_activacion, "DD/MM/YYYY"));
            $scope.txtPrecioBien = pContrato.mto_precio_bien;
            $scope.txtInicialBien = pContrato.mto_inicial_bien;
            $scope.txtPorcInicial = pContrato.porc_inicial;
            $scope.txtPlazo = pContrato.plazo;
            $scope.txtTEA = pContrato.tea;
            $scope.txtTCEA = pContrato.tcea;
            $scope.txtFinanciamiento = pContrato.mto_financiado;
            $scope.txtGastos = pContrato.mto_gasto;
            $scope.txtFechaPrimerVencimiento = new Date(Moment.formatToDate(pContrato.fecha_primer_vencimiento, "DD/MM/YYYY"));
            $scope.txtFechaVencimiento = new Date(Moment.formatToDate(pContrato.fecha_vencimiento, "DD/MM/YYYY")) ;
            $scope.txtSaldo = pContrato.mto_saldo;
            $scope.txtCuotasPagadas = pContrato.nro_cuotas_pagadas;
            $scope.txtCuotasPendientes = pContrato.nro_cuotas_pendientes;
            $scope.txtCuotasAtrasadas = pContrato.nro_cuotas_atrasadas;
            $scope.chkActivo = pContrato.activo;

            angular.forEach($scope.oListaMonedaContrato, function (item) {
                if (item.id == pContrato.i005_moneda) {
                    $scope.ddlMonedaContrato = item;
                }
            });


            angular.forEach($scope.oListaEstadoContrato, function (item) {
                if (item.id == pContrato.i013_estado_contrato) {
                    $scope.ddlEstadoContrato = item;
                }
            });

            $scope.txtContrato_Disable = true;
            $scope.txtFechaActivacion_Disable = false;
            $scope.ddlMoneda_Disable = false;
            $scope.txtPrecioBien_Disable = false;
            $scope.txtInicialBien_Disable = false;
            $scope.txtPorcInicial_Disable = false;
            $scope.txtPlazo_Disable = false;
            $scope.txtTEA_Disable = false;
            $scope.txtTCEA_Disable = false;
            $scope.txtFinanciamiento_Disable = false;
            $scope.txtGastos_Disable = false;
            $scope.ddlEstadoOperacion_Disable = false;
            $scope.txtFechaPrimerVencimiento_Disable = true;
            $scope.txtFechaVencimiento_Disable = true;
            $scope.txtSaldo_Disable = true;
            $scope.txtCuotasPagadas_Disable = true;
            $scope.txtCuotasPendientes_Disable = true;
            $scope.txtCuotasAtrasadas_Disable = true;

        }

        $scope.MostrarPreVistaContrato = function (pContrato) {

            $scope.vgContratoSelec = pContrato.ident_contrato;
            $scope.vgIdContratoSelec = pContrato.id_contrato;

            //$scope.CargarCronograma($scope.vgIdContratoSelec);
            console.log(pContrato);

            $scope.laPrecio = pContrato.mto_precio_bien;
            $scope.laInicial = pContrato.mto_inicial_bien;
            $scope.laPorcInicial = pContrato.porc_inicial;
            $scope.laMontoGastos = pContrato.mto_gasto;
            $scope.laFinanciamiento = pContrato.mto_financiado;
            $scope.laFechaActivacion = Moment.formatASP_DDMMYYYY(pContrato.fecha_activacion);
            $scope.laPlazo = pContrato.plazo;
            $scope.laTEA = pContrato.tea;

            $scope.$apply();
        }

        $scope.MostrarEditarTelefono = function (pTelefono) {

            console.log("Iem");
            console.log(pTelefono);

            $scope.id_telefono_sel = pTelefono.id_telefono;
            $scope.txtTelefonoEdit = pTelefono.numero;
            $scope.tadComentarioTelefono = pTelefono.comentario;

            angular.forEach($scope.oListaTipoTelefono, function (item) {
                if (item.id == pTelefono.i008_tipo_telefono) {
                    $scope.ddlTipoTelefono = item;
                }
            });

            angular.forEach($scope.oListaOperadorTelefono, function (item) {
                if (item.id == pTelefono.i007_operador) {
                    $scope.ddlOperadorTelefono = item;
                }
            });

            $scope.chkActivoTelefono = pTelefono.activo;

            $scope.$apply();
        }

        $scope.MostrarEditarCorreo = function (pCorreo) {

            console.log("Iem Correo");
            console.log(pCorreo);

            $scope.id_correo_sel = pCorreo.id_correo;
            $scope.txtCorreoEdit = pCorreo.correo;
            $scope.taComentarioCorreo = pCorreo.comentario;

            angular.forEach($scope.oListaTipoCorreo, function (item) {
                if (item.id == pCorreo.i009_tipo_correo) {
                    $scope.ddlTipoCorreo = item;
                }
            });

            $scope.chkActivoCorreo = pCorreo.activo;

            $scope.$apply();
        }

        $scope.MostrarEditarDireccion = function (pDireccion) {

            console.log("Item pDireccion");
            console.log(pDireccion);

            $scope.id_direccion_sel = pDireccion.id_direccion;
            $scope.txtDireccionEdit = pDireccion.direccion;
            $scope.taReferenciaDireccion = pDireccion.referencia;
            $scope.taComentarioDireccion = pDireccion.comentario;

            $scope.id_departamento_direccion_sel = pDireccion.id_departamento;
            $scope.id_provincia_direccion_sel = pDireccion.id_provincia;
            $scope.id_distrito_direccion_sel = pDireccion.id_distrito;


            angular.forEach($scope.oListaTipoDireccion, function (item) {
                if (item.id == pDireccion.i010_tipo_direccion) {
                    $scope.ddlTipoDireccion = item;
                }
            });

            angular.forEach($scope.oListaDepartamentoDireccion, function (item) {
                if (item.id == pDireccion.id_departamento) {
                    $scope.ddlDepartamentoDireccion = item;                    
                }
            });          

            $scope.btnCargarProvinciaDireccion(pDireccion.id_departamento);
            $scope.btnCargarDistritoDireccion(pDireccion.id_departamento, pDireccion.id_provincia);

            /*
            angular.forEach($scope.oListaProvinciaDireccion, function (item) {
                if (item.id == pDireccion.id_provincia) {
                    $scope.ddlProvinciaDireccion = item;
                }
            });

            angular.forEach($scope.oListaDistritoDireccion, function (item) {
                if (item.id == pDireccion.id_distrito) {
                    $scope.ddlDistritoDireccion = item;
                }
            });
            */

            $scope.chkActivoDireccion = pDireccion.activo;

            $scope.$apply();
        }

        $scope.EstablecerListaCronograma = function (presponse) {

            var taCronograma;

            if ($.fn.dataTable.isDataTable('#taCronograma')) {
                taCronograma = $('#taCronograma').DataTable();
            }
            else {
                taCronograma = $('#taCronograma').DataTable({
                    data: presponse,
                    responsive: true,
                    searching: false,
                    select: true,
                    buttons: [
                        'copy', 'excel', 'pdf'
                    ],
                    columns: [
                        { data: 'nro_cuota' },
                        { data: 'fecha_vencimiento' },
                        { data: 'dias' },
                        { data: 'mto_capital' },
                        { data: 'mto_interes' },
                        { data: 'mto_portes' },
                        { data: 'mto_otros' },
                        { data: 'mto_cuota' },
                        { data: 'fecha_pago' },
                        { data: 'mto_mora' },
                        { data: 'mto_total_pagar' }
                    ]
                });
            }

            /*
            var taCronograma = $('#taCronograma').DataTable({
                data: presponse,
                responsive: true,
                searching: false,
                select: true,
                buttons: [
                    'copy', 'excel', 'pdf'
                ],
                columns: [
                    { data: 'nro_cuota' },
                    { data: 'fecha_vencimiento' },
                    { data: 'dias' },
                    { data: 'mto_capital' },
                    { data: 'mto_interes' },
                    { data: 'mto_portes' },
                    { data: 'mto_otros' },
                    { data: 'mto_cuota' },
                    { data: 'fecha_pago' },
                    { data: 'mto_mora' },
                    { data: 'mto_total_pagar' }
                ]
            });*/

        }

        $scope.EstablecerListaTelefonos = function (response) {

            var taTelefonos;

            if ($.fn.dataTable.isDataTable('#taTelefonos')) {
                //taTelefonos = $('#taTelefonos').DataTable();
                console.log("Eliminando tabla");
                //$('#taTelefonos').DataTable().destroy();
                $('#taTelefonos').dataTable().fnClearTable();
                $('#taTelefonos').dataTable().fnAddData(response);
            }
            else {
                taTelefonos = $('#taTelefonos').DataTable({
                    data: response,
                    responsive: true,
                    searching: false,
                    select: false,
                    destroy: true,
                    buttons: [
                        'copy', 'excel', 'pdf'
                    ],
                    columns: [
                        { data: 'id_telefono' },
                        { data: 'tipo_telefono' },
                        { data: 'numero' },
                        { data: 'operador' },
                        { data: 'activo' },
                        {
                            /*targets: -1,*/
                            data: null,
                            defaultContent: '<a class="edit""><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2 align-middle"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg></a>'+
                                '<a class="delete" > <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash align-middle"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></a>'
                        }
                    ]
                });

                $('#taTelefonos tbody').on('click', 'a.edit', function () {
                    var data = taTelefonos.row($(this).parents('tr')).data();
                    $("#moTelefonos").modal('show');
                    $scope.MostrarEditarTelefono(data);
                });

                $('#taTelefonos tbody').on('click', 'a.delete', function () {
                    var data = taTelefonos.row($(this).parents('tr')).data();

                    Message.Confirm("Eliminar", "¿Desea eliminar el resgistro?", $scope.btnEliminarTelefono, null, data);

                });

            }

            
            

        }

        $scope.EstablecerListaCorreos = function (response) {

            var taCorreos;

            if ($.fn.dataTable.isDataTable('#taCorreos')) {
                //$('#taCorreos').DataTable().destroy();
                $('#taCorreos').dataTable().fnClearTable();
                $('#taCorreos').dataTable().fnAddData(response);

            } else {
                taCorreos = $('#taCorreos').DataTable({
                    data: response,
                    responsive: true,
                    searching: false,
                    select: true,
                    buttons: [
                        'copy', 'excel', 'pdf'
                    ],
                    columns: [
                        { data: 'id_correo' },
                        { data: 'tipo_correo' },
                        { data: 'correo' },
                        { data: 'activo' },
                        {
                            /*targets: -1,*/
                            data: null,
                            defaultContent: '<a class="edit""><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2 align-middle"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg></a>' +
                                '<a class="delete" > <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash align-middle"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></a>'
                        }
                    ]
                });


                $('#taCorreos tbody').on('click', 'a.edit', function () {
                    var data = taCorreos.row($(this).parents('tr')).data();
                    $("#moCorreos").modal('show');
                    $scope.MostrarEditarCorreo(data);
                });

                $('#taCorreos tbody').on('click', 'a.delete', function () {
                    var data = taCorreos.row($(this).parents('tr')).data();

                    Message.Confirm("Eliminar", "¿Desea eliminar el resgistro?", $scope.btnEliminarCorreo, null, data);

                });
            }

            

        }

        $scope.EstablecerListaDirecciones = function (response) {

            var taDirecciones;

            if ($.fn.dataTable.isDataTable('#taDirecciones')) {
                //$('#taDirecciones').DataTable().destroy();
                $('#taDirecciones').dataTable().fnClearTable();
                $('#taDirecciones').dataTable().fnAddData(response);
            } else {
                taDirecciones = $('#taDirecciones').DataTable({
                    data: response,
                    responsive: true,
                    searching: false,
                    select: true,
                    buttons: [
                        'copy', 'excel', 'pdf'
                    ],
                    columns: [
                        { data: 'id_direccion' },
                        { data: 'tipo_direccion' },
                        { data: 'departamento' },
                        { data: 'provincia' },
                        { data: 'distrito' },
                        { data: 'direccion' },
                        { data: 'activo' },
                        {
                            /*targets: -1,*/
                            data: null,
                            defaultContent: '<a class="edit""><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2 align-middle"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg></a>' +
                                '<a class="delete" > <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash align-middle"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></a>'
                        }
                    ]
                });


                $('#taDirecciones tbody').on('click', 'a.edit', function () {
                    var data = taDirecciones.row($(this).parents('tr')).data();
                    $("#moDirecciones").modal('show');
                    $scope.MostrarEditarDireccion(data);
                });

                $('#taDirecciones tbody').on('click', 'a.delete', function () {
                    var data = taDirecciones.row($(this).parents('tr')).data();

                    Message.Confirm("Eliminar", "¿Desea eliminar el resgistro?", $scope.btnEliminarDireccion, null, data);

                });
            }

            

        }

        $scope.EstablecerActualizarContrato = function (response) {
            if (response != null) {
                if (response.st == 1) {
                    Message.AlertSuccess("Correcto", "Contrato actualizado correctamente!");
                } else {
                    Message.AlertError("Error", "Error al guardar Contrato!");
                }
            }

            Loading.LoadingClose();
        }

        $scope.EstablecerRegistrarContrato = function (response) {
            if (response != null) {
                if (response.st == 1) {
                    Message.AlertSuccess("Correcto", "Contrato creado correctamente!");
                } else {
                    Message.AlertError("Error", "Error al creado Contrato!");
                }
            }

            Loading.LoadingClose();
        }

        $scope.EstablecerListaEstadoContrato = function (response) {

            $scope.oListaDistrito = response;
            $scope.ddlDistrito = $scope.oListaDistrito[0];
        }
       
        $scope.EstablecerListaTipoTelefono = function (response) {

            $scope.oListaTipoTelefono = response;
            $scope.ddlTipoTelefono = $scope.oListaTipoTelefono[0];
        }
     
        $scope.EstablecerOperadorTelefono = function (response) {

            $scope.oListaOperadorTelefono = response;
            $scope.ddlOperadorTelefono = $scope.oListaOperadorTelefono[0];
        }
     
        $scope.EstablecerListaTipoCorreo = function (response) {

            $scope.oListaTipoCorreo = response;
            $scope.ddlTipoCorreo = $scope.oListaTipoCorreo[0];
        }
     
        $scope.EstablecerListaTipoDireccion = function (response) {

            $scope.oListaTipoDireccion = response;
            $scope.ddlTipoDireccion = $scope.oListaTipoDireccion[0];
        }

        $scope.EstablecerActualizarTelefono = function (response) {

            if (response != null) {
                if (response.st == 1) {
                    Message.AlertSuccess("Correcto", "Telefono actualizado correctamente");
                    $scope.btnCargarTelefonos();
                    Loading.LoadingClose();
                    $("#moTelefonos").modal("hide");
                } else {
                    Loading.LoadingClose();
                    Message.AlertError("Error", "Error al actualizar telefono");
                }
            } else {
                Loading.LoadingClose();
                Message.AlertError("Error", "Error al actualizar telefono");
            }

        }

        $scope.EstablecerRegistrarTelefono = function (response) {

            if (response != null) {
                if (response.st == 1) {
                    Message.AlertSuccess("Correcto", "Telefono registrado correctamente");
                    $scope.btnCargarTelefonos();
                    Loading.LoadingClose();
                    $("#moTelefonos").modal("hide");
                } else {
                    Loading.LoadingClose();
                    Message.AlertError("Error", "Error al registrar telefono");
                }
            } else {
                Loading.LoadingClose();
                Message.AlertError("Error", "Error al registrar telefono");
            }

        }

        $scope.EstablecerEliminarTelefono = function (response) {

            if (response != null) {
                if (response.st == 1) {
                    Message.AlertSuccess("Correcto", "Telefono eliminado correctamente");
                    $scope.btnCargarTelefonos();
                    Loading.LoadingClose();
                } else {
                    Loading.LoadingClose();
                    Message.AlertError("Error", "Error al eliminar telefono");
                }
            } else {
                Loading.LoadingClose();
                Message.AlertError("Error", "Error al eliminar telefono");
            }

        }

        $scope.EstablecerActualizarCorreo = function (response) {

            if (response != null) {
                if (response.st == 1) {
                    Message.AlertSuccess("Correcto", "Correo actualizado correctamente");
                    $scope.btnCargarCorreos();
                    Loading.LoadingClose();
                    $("#moCorreos").modal("hide");
                } else {
                    Loading.LoadingClose();
                    Message.AlertError("Error", "Error al actualizar Correo");
                }
            } else {
                Loading.LoadingClose();
                Message.AlertError("Error", "Error al actualizar Correo");
            }

        }

        $scope.EstablecerRegistrarCorreo = function (response) {

            if (response != null) {
                if (response.st == 1) {
                    Message.AlertSuccess("Correcto", "Correo registrado correctamente");
                    $scope.btnCargarCorreos();
                    Loading.LoadingClose();
                    $("#moCorreos").modal("hide");
                } else {
                    Loading.LoadingClose();
                    Message.AlertError("Error", "Error al registrar Correo");
                }
            } else {
                Loading.LoadingClose();
                Message.AlertError("Error", "Error al registrar Correo");
            }

        }

        $scope.EstablecerEliminarCorreo = function (response) {

            if (response != null) {
                if (response.st == 1) {
                    Message.AlertSuccess("Correcto", "Correo eliminado correctamente");
                    $scope.btnCargarCorreos();
                    Loading.LoadingClose();
                } else {
                    Loading.LoadingClose();
                    Message.AlertError("Error", "Error al eliminar Correo");
                }
            } else {
                Loading.LoadingClose();
                Message.AlertError("Error", "Error al eliminar Correo");
            }
        }

        $scope.EstablecerRegistrarDireccion = function (response) {

            if (response != null) {
                if (response.st == 1) {
                    Message.AlertSuccess("Correcto", "Direccion registrado correctamente");
                    $scope.btnCargarDirecciones();
                    Loading.LoadingClose();
                    $("#moDirecciones").modal("hide");
                } else {
                    Loading.LoadingClose();
                    Message.AlertError("Error", "Error al registrar Direccion");
                }
            } else {
                Loading.LoadingClose();
                Message.AlertError("Error", "Error al registrar Direccion");
            }

        }

        $scope.EstablecerActualizarDireccion = function (response) {

            if (response != null) {
                if (response.st == 1) {
                    Message.AlertSuccess("Correcto", "Direccion actualizado correctamente");
                    $scope.btnCargarDirecciones();
                    Loading.LoadingClose();
                    $("#moDirecciones").modal("hide");
                } else {
                    Loading.LoadingClose();
                    Message.AlertError("Error", "Error al actualizar Direccion");
                }
            } else {
                Loading.LoadingClose();
                Message.AlertError("Error", "Error al actualizar Direccion");
            }

        }

        $scope.EstablecerEliminarDireccion = function (response) {

            if (response != null) {
                if (response.st == 1) {
                    Message.AlertSuccess("Correcto", "Direccion eliminado correctamente");
                    $scope.btnCargarDirecciones();
                    Loading.LoadingClose();
                } else {
                    Loading.LoadingClose();
                    Message.AlertError("Error", "Error al eliminar Direccion");
                }
            } else {
                Loading.LoadingClose();
                Message.AlertError("Error", "Error al eliminar Direccion");
            }
        }




        $scope.LimpiarDatos = function () {
            $scope.txtDocumento = "";
            $scope.txtApellidoPaterno = "";
            $scope.txtApellidoMaterno = "";
            $scope.txtNombres = "";
            $scope.txtFechaNacimiento = "";
        }



    }]);