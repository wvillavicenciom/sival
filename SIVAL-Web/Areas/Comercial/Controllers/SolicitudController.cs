using SIVAL.Comercial.BE;
using SIVAL.Comercial.BE.Reportes;
using SIVAL.Comercial.SL;
using SIVAL.Generico.BE;
using SIVAL.Generico.SL;
using SIVAL_Web.Areas.Comercial.Data;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Security.Cryptography.Xml;
using SIVAL_Web.Servicios;

namespace SIVAL_Web.Areas.Comercial.Controllers
{
    [Area("Comercial")]
    public class SolicitudController : Controller
    {
        public IActionResult Busqueda()
        {
            return View();
        }

        public IActionResult Evaluar()
        {
            return View();
        }

        public IActionResult RegistroVehicular()
        {
            return View();
        }

        [HttpGet]
        public IActionResult ListarBusqueda(int pIdSolicitud , int pTipoDocumento, String pDocumento, String pApellidoPaterno, String pApellidoMaterno, String pNombres, String pFechaIni, String pFechaFin , int pTopResultado)
        {
            List<SolicitudBE> oLista = new List<SolicitudBE>();
            try
            {
                SolicitudSL oSolicitudSL = new SolicitudSL();
                //pUsuaio = HttpContext.User.Identity.Name;
                String pEmpresa = "1";

                pDocumento = pDocumento == null ? "" : pDocumento;
                pApellidoPaterno = pApellidoPaterno == null ? "" : pApellidoPaterno;
                pApellidoMaterno = pApellidoMaterno == null ? "" : pApellidoMaterno;
                pNombres = pNombres == null ? "" : pNombres;
                pFechaIni = pFechaIni == null ? "" : pFechaIni;
                pFechaFin = pFechaFin == null ? "" : pFechaFin;

                oLista = oSolicitudSL.Listar(pIdSolicitud, pTipoDocumento, pDocumento, pApellidoPaterno, pApellidoMaterno, pNombres, pFechaIni, pFechaFin, pTopResultado);

            }
            catch (Exception ex)
            {
                //Manejando Errores
                var error = ex.ToString();
            }
            var response = JsonConvert.SerializeObject(oLista);
            return Content(response, "application/json");
        }

        [HttpGet]
        public IActionResult Obtener(int pIdSolicitud)
        {
            SolicitudBE oLista = new SolicitudBE();
            try
            {
                SolicitudSL oSolicitudSL = new SolicitudSL();
                //pUsuaio = HttpContext.User.Identity.Name;
                oLista = oSolicitudSL.Obtener(pIdSolicitud);

            }
            catch (Exception ex)
            {
                //Manejando Errores
                var error = ex.ToString();
            }
            var response = JsonConvert.SerializeObject(oLista);
            return Content(response, "application/json");
        }

        [HttpGet]
        public IActionResult EvaluarFD(Int32 pTipoDocumento, String pDocumento, String pApellidoPaterno, String pApellidoMaterno, String pNombres, String pFechaNacimiento, Int32 pGenero, Int32 pActividadEconomica, Int32 pConvenio, Int32 pDepartamento, Decimal pNroCreditos)
        {
            ResponseBE oResponseBE = new ResponseBE();
            try
            {
                SolicitudSL oSolicitudSL = new SolicitudSL();
                String pUsuario = HttpContext.Session.GetString("UserName");
                oResponseBE = oSolicitudSL.EvaluarFD(pTipoDocumento, pDocumento, pApellidoPaterno, pApellidoMaterno, pNombres, pFechaNacimiento, pGenero, pActividadEconomica, pConvenio, pDepartamento, pNroCreditos, pUsuario);

                //CUANDO SE HA PRE APRONADO SE CALCULAN LOS DATOS DE EVALUACIÓN
                if (oResponseBE.st == 1)
                {
                    SolicitudBE oSolicitudBE = new SolicitudBE();
                    var vIdSolicitud = Decimal.Parse(oResponseBE.dato);

                    oSolicitudBE.id_solicitud = vIdSolicitud;
                    oSolicitudBE.usuario_modificacion = pUsuario;

                    //Obteniendo los datos de experian
                    ExperianWS oExperianWS = new ExperianWS();
                    String vToken = "";
                    RsExperianAuth oRsExperianAuth = oExperianWS.AutenticarAsync().Result;
                    String jsResultadoHistorico = "";
                    String strErrorExperian = "";
                    RsHistorial oRsHistorial = new RsHistorial();
                    String vTipoDocumentoExpe = "";
                    switch (pTipoDocumento)
                    {
                        case 4:
                            vTipoDocumentoExpe = "D";
                            break;
                        case 5:
                            vTipoDocumentoExpe = "4";
                            break;
                        case 6:
                            vTipoDocumentoExpe = "5";
                            break;
                        default:
                            vTipoDocumentoExpe = "D";
                            break;
                    }

                    if (oRsExperianAuth.expires_in != "0")
                    {
                        vToken = oRsExperianAuth.access_token;
                        oRsHistorial = oExperianWS.ObtenerDatosAsync(vToken, vTipoDocumentoExpe, pDocumento).Result;
                        jsResultadoHistorico = oRsHistorial.result;
                        strErrorExperian = oRsExperianAuth.msg;
                    }
                    else {
                        jsResultadoHistorico = "";
                        strErrorExperian = oRsExperianAuth.msg;
                    }
                    oSolicitudBE.jsHistoricoExperian = jsResultadoHistorico;
                    oSolicitudBE.errorHistoricoExperian = strErrorExperian; ;
                    ResponseBE oResponseBE_CAL = new ResponseBE();
                    oResponseBE_CAL = oSolicitudSL.CalcularEvaluacion(oSolicitudBE);
                    if (oResponseBE_CAL.st == 1)
                    {
                        oResponseBE.msg = oResponseBE_CAL.msg;
                        oResponseBE.dato_a = oResponseBE_CAL.dato_a;
                        oResponseBE.dato_b = oResponseBE_CAL.dato_b;
                    }
                }
            }
            catch (Exception ex)
            {
                //Manejando Errores
                var error = ex.ToString();
                LogBE oLogBE = new LogBE();
                oLogBE.modulo = "Solicitud";
                oLogBE.sub_modulo = "Solicitud";
                oLogBE.opcion = "Nueva Solicitud";
                oLogBE.tipo = 1;
                oLogBE.error = "Error Método EvaluarFD";
                oLogBE.descripcion = ex.ToString();
                LogSL.Registrar(oLogBE);
            }
            var response = JsonConvert.SerializeObject(oResponseBE);
            return Content(response, "application/json");
        }

        [HttpGet]
        public IActionResult ListarPlazos(int pIdSolicitud)
        {
            List<SolicitudPlazoBE> oLista = new List<SolicitudPlazoBE>();
            try
            {
                SolicitudSL oSolicitudSL = new SolicitudSL();
                //pUsuaio = HttpContext.User.Identity.Name;
                String pEmpresa = "1";

                oLista = oSolicitudSL.ListarPlazos(pIdSolicitud);

            }
            catch (Exception ex)
            {
                //Manejando Errores
                var error = ex.ToString();
            }
            var response = JsonConvert.SerializeObject(oLista);
            return Content(response, "application/json");
        }

        [HttpPost]
        public IActionResult Guardar([FromBody] SolicitudRQ pSolicitudRQ)
        {

            ResponseBE oResponseBE = new ResponseBE();
            try
            {
                SolicitudBE oSolicitudBE = new SolicitudBE();
                SolicitudSL oSolicitudSL = new SolicitudSL();
                String pUsuaio = HttpContext.Session.GetString("UserName");

                oSolicitudBE.id_solicitud = pSolicitudRQ.id_solicitud;
                oSolicitudBE.i002_tipo_documento = pSolicitudRQ.id_tipo_documento;
                oSolicitudBE.documento = pSolicitudRQ.documento;
                oSolicitudBE.apellido_paterno = pSolicitudRQ.apellido_paterno;
                oSolicitudBE.apellido_materno = pSolicitudRQ.apellido_materno;
                oSolicitudBE.nombres = pSolicitudRQ.nombres;
                oSolicitudBE.fecha_nacimiento = pSolicitudRQ.fecha_nacimiento;
                //oSolicitudBE.i003_categoria_laboral = pSolicitudRQ.id_categoria_laboral;
                //oSolicitudBE.mto_ingreso_bruto = pSolicitudRQ.mto_ingreso_bruto;
                //oSolicitudBE.fecha_ingreso_laboral = pSolicitudRQ.fecha_ingreso_laboral;
                ////oSolicitudBE.fecha_solicitud = pSolicitudRQ.fecha_solicitud;
                //oSolicitudBE.telefono = pSolicitudRQ.telefono;
                //oSolicitudBE.correo = pSolicitudRQ.correo;
                //oSolicitudBE.id_departamento = pSolicitudRQ.id_departamento;
                //oSolicitudBE.id_provincia = pSolicitudRQ.id_provincia;
                //oSolicitudBE.id_distrito = pSolicitudRQ.id_distrito;
                //oSolicitudBE.direccion = pSolicitudRQ.direccion;
                //oSolicitudBE.referencia = pSolicitudRQ.referencia;
                //oSolicitudBE.id_marca = pSolicitudRQ.id_marca;
                //oSolicitudBE.id_marca_modelo = pSolicitudRQ.id_marca_modelo;
                oSolicitudBE.usuario_modificacion = pUsuaio;


                oResponseBE = oSolicitudSL.Guardar(oSolicitudBE);

            }
            catch (Exception ex)
            {
                //Manejando Errores
                var error = ex.ToString();
            }
            var response = JsonConvert.SerializeObject(oResponseBE);
            return Content(response, "application/json");

        }

        [HttpPost]
        public IActionResult Anular([FromBody] SolicitudRQ pSolicitudRQ)
        {

            ResponseBE oResponseBE = new ResponseBE();
            try
            {
                SolicitudBE oSolicitudBE = new SolicitudBE();
                SolicitudSL oSolicitudSL = new SolicitudSL();
                String pUsuaio = HttpContext.Session.GetString("UserName");

                oSolicitudBE.id_solicitud = pSolicitudRQ.id_solicitud;
                oSolicitudBE.usuario_modificacion = pUsuaio;


                oResponseBE = oSolicitudSL.Anular(oSolicitudBE);

            }
            catch (Exception ex)
            {
                //Manejando Errores
                var error = ex.ToString();
            }
            var response = JsonConvert.SerializeObject(oResponseBE);
            return Content(response, "application/json");

        }

        [HttpPost]
        public IActionResult Eliminar([FromBody] SolicitudRQ pSolicitudRQ)
        {

            ResponseBE oResponseBE = new ResponseBE();
            try
            {
                SolicitudBE oSolicitudBE = new SolicitudBE();
                SolicitudSL oSolicitudSL = new SolicitudSL();
                String pUsuaio = HttpContext.Session.GetString("UserName");

                oSolicitudBE.id_solicitud = pSolicitudRQ.id_solicitud;
                oSolicitudBE.usuario_eliminacion = pUsuaio;


                oResponseBE = oSolicitudSL.Eliminar(oSolicitudBE);

            }
            catch (Exception ex)
            {
                //Manejando Errores
                var error = ex.ToString();
            }
            var response = JsonConvert.SerializeObject(oResponseBE);
            return Content(response, "application/json");

        }


        [HttpPost]
        public IActionResult Simular([FromBody] SolicitudRQ pSolicitudRQ)
        {

            ResponseBE oResponseBE = new ResponseBE();
            try
            {
                SolicitudBE oSolicitudBE = new SolicitudBE();
                SolicitudSL oSolicitudSL = new SolicitudSL();
                String pUsuaio = HttpContext.Session.GetString("UserName");

                oSolicitudBE.id_solicitud = pSolicitudRQ.id_solicitud;
                //oSolicitudBE.mto_precio_bien = pSolicitudRQ.mto_precio_bien;
                //oSolicitudBE.mto_inicial_bien = pSolicitudRQ.mto_inicial_bien;
                //oSolicitudBE.i008_seguro_bien = pSolicitudRQ.id_seguro_bien;
                //oSolicitudBE.porc_seguro_bien = pSolicitudRQ.porc_seguro_bien;
                oSolicitudBE.usuario_modificacion = pUsuaio;


                oResponseBE = oSolicitudSL.Simular(oSolicitudBE);

            }
            catch (Exception ex)
            {
                //Manejando Errores
                var error = ex.ToString();
            }
            var response = JsonConvert.SerializeObject(oResponseBE);
            return Content(response, "application/json");

        }

        [HttpGet]
        public IActionResult ListarDocumentos(int pIdSolicitud)
        {
            List<SolicitudDocumentoBE> oLista = new List<SolicitudDocumentoBE>();
            try
            {
                SolicitudSL oSolicitudSL = new SolicitudSL();
                //pUsuaio = HttpContext.User.Identity.Name;
                String pEmpresa = "1";

                oLista = oSolicitudSL.ListarDocumentos(pIdSolicitud);

            }
            catch (Exception ex)
            {
                //Manejando Errores
                var error = ex.ToString();
            }
            var response = JsonConvert.SerializeObject(oLista);
            return Content(response, "application/json");


        }

        [HttpPost]
        public IActionResult Avanzar([FromBody] SolicitudRQ pSolicitudRQ)
        {

            ResponseBE oResponseBE = new ResponseBE();
            try
            {
                SolicitudBE oSolicitudBE = new SolicitudBE();
                SolicitudSL oSolicitudSL = new SolicitudSL();
                String pUsuaio = HttpContext.Session.GetString("UserName");

                oSolicitudBE.id_solicitud = pSolicitudRQ.id_solicitud;
                oSolicitudBE.usuario_modificacion = pUsuaio;


                oResponseBE = oSolicitudSL.Avanzar(oSolicitudBE);

            }
            catch (Exception ex)
            {
                //Manejando Errores
                var error = ex.ToString();
            }
            var response = JsonConvert.SerializeObject(oResponseBE);
            return Content(response, "application/json");

        }

        [HttpPost]
        public IActionResult GuardarValidacion([FromBody] SolicitudRQ pSolicitudRQ)
        {

            ResponseBE oResponseBE = new ResponseBE();
            try
            {
                SolicitudBE oSolicitudBE = new SolicitudBE();
                SolicitudSL oSolicitudSL = new SolicitudSL();
                String pUsuaio = HttpContext.Session.GetString("UserName");

                oSolicitudBE.id_solicitud = pSolicitudRQ.id_solicitud;
                //oSolicitudBE.i004_resultado_eval_validador = pSolicitudRQ.id_resultado_validacion;
                //oSolicitudBE.i005_motivo_eval_validador = pSolicitudRQ.id_motivo_validacion;
                //oSolicitudBE.comentario_eval_validador = pSolicitudRQ.comentario_validacion;
                oSolicitudBE.usuario_modificacion = pUsuaio;


                oResponseBE = oSolicitudSL.GuardarValidacion(oSolicitudBE);

            }
            catch (Exception ex)
            {
                //Manejando Errores
                var error = ex.ToString();
            }
            var response = JsonConvert.SerializeObject(oResponseBE);
            return Content(response, "application/json");

        }

        [HttpPost]
        public IActionResult GuardarEvaluacion([FromBody] SolicitudRQ pSolicitudRQ)
        {

            ResponseBE oResponseBE = new ResponseBE();
            try
            {
                SolicitudBE oSolicitudBE = new SolicitudBE();
                SolicitudSL oSolicitudSL = new SolicitudSL();
                String pUsuaio = HttpContext.Session.GetString("UserName");

                oSolicitudBE.id_solicitud = pSolicitudRQ.id_solicitud;
                //oSolicitudBE.i004_resultado_eval_analista = pSolicitudRQ.id_resultado_evaluacion;
                //oSolicitudBE.i005_motivo_eval_analista = pSolicitudRQ.id_motivo_evaluacion;
                //oSolicitudBE.comentario_eval_analista = pSolicitudRQ.comentario_evaluacion;
                oSolicitudBE.usuario_modificacion = pUsuaio;


                oResponseBE = oSolicitudSL.GuardarEvaluacion(oSolicitudBE);

            }
            catch (Exception ex)
            {
                //Manejando Errores
                var error = ex.ToString();
            }
            var response = JsonConvert.SerializeObject(oResponseBE);
            return Content(response, "application/json");

        }

        [HttpGet]
        public IActionResult ListarHistoricoEvaluacion(int pIdSolicitud)
        {
            List<SolicitudEvaluacionBE> oLista = new List<SolicitudEvaluacionBE>();
            try
            {
                SolicitudSL oSolicitudSL = new SolicitudSL();
                //pUsuaio = HttpContext.User.Identity.Name;

                oLista = oSolicitudSL.ListarHistoricoEvaluacion(pIdSolicitud);

            }
            catch (Exception ex)
            {
                //Manejando Errores
                var error = ex.ToString();
            }
            var response = JsonConvert.SerializeObject(oLista);
            return Content(response, "application/json");


        }

        [HttpPost]
        public IActionResult GrabarDocumentoAdjunto([FromBody] SolicitudDocumentoRQ pSolicitudDocumentoRQ)
        {

            ResponseBE oResponseBE = new ResponseBE();
            try
            {
                SolicitudDocumentoBE oSolicitudDocumentoBE = new SolicitudDocumentoBE();
                SolicitudSL oSolicitudSL = new SolicitudSL();
                String pUsuario = HttpContext.Session.GetString("UserName");

                oSolicitudDocumentoBE.id_solicitud_documento = pSolicitudDocumentoRQ.id_solicitud_documento == null ? 0 : pSolicitudDocumentoRQ.id_solicitud_documento;
                oSolicitudDocumentoBE.id_solicitud = pSolicitudDocumentoRQ.id_solicitud;
                oSolicitudDocumentoBE.i010_tipo_documento = pSolicitudDocumentoRQ.id_tipo_documento;
                oSolicitudDocumentoBE.nombre = pSolicitudDocumentoRQ.nombre;
                oSolicitudDocumentoBE.descripcion = pSolicitudDocumentoRQ.comentario;
                oSolicitudDocumentoBE.documento = pSolicitudDocumentoRQ.documento_base64;
                oSolicitudDocumentoBE.usuario_modificacion = pUsuario;


                oResponseBE = oSolicitudSL.GrabarDocumentoAdjunto(oSolicitudDocumentoBE);

            }
            catch (Exception ex)
            {
                //Manejando Errores
                var error = ex.ToString();
            }
            var response = JsonConvert.SerializeObject(oResponseBE);
            return Content(response, "application/json");

        }

        [HttpGet]
        public IActionResult ListarBandeja(int pIdSolicitud, int pTipoDocumento, String pDocumento, String pApellidoPaterno, String pApellidoMaterno, String pNombres, String pFechaIni, String pFechaFin)
        {
            List<SolicitudBE> oLista = new List<SolicitudBE>();
            try
            {
                SolicitudSL oSolicitudSL = new SolicitudSL();
                String pUsuario = HttpContext.Session.GetString("UserName");

                pDocumento = pDocumento == null ? "" : pDocumento;
                pApellidoPaterno = pApellidoPaterno == null ? "" : pApellidoPaterno;
                pApellidoMaterno = pApellidoMaterno == null ? "" : pApellidoMaterno;
                pNombres = pNombres == null ? "" : pNombres;
                pFechaIni = pFechaIni == null ? "" : pFechaIni;
                pFechaFin = pFechaFin == null ? "" : pFechaFin;

                oLista = oSolicitudSL.ListarBandeja(pIdSolicitud, pTipoDocumento, pDocumento, pApellidoPaterno, pApellidoMaterno, pNombres, pFechaIni, pFechaFin, pUsuario);

            }
            catch (Exception ex)
            {
                //Manejando Errores
                var error = ex.ToString();
            }
            var response = JsonConvert.SerializeObject(oLista);
            return Content(response, "application/json");
        }

        [HttpGet]
        public IActionResult ListarReporteInicio()
        {
            List<ResumenSolicitudFechaBE> oLista = new List<ResumenSolicitudFechaBE>();
            try
            {
                SolicitudSL oSolicitudSL = new SolicitudSL();
                String pUsuario = HttpContext.Session.GetString("UserName");

                oLista = oSolicitudSL.ListarReporteInicio(45, pUsuario);

            }
            catch (Exception ex)
            {
                //Manejando Errores
                var error = ex.ToString();
            }
            var response = JsonConvert.SerializeObject(oLista);
            return Content(response, "application/json");
        }

        [HttpGet]
        public IActionResult ListarReporteMotivoRechazo()
        {
            List<ReporteSolicitudMotivoRechazoBE> oLista = new List<ReporteSolicitudMotivoRechazoBE>();
            try
            {
                SolicitudSL oSolicitudSL = new SolicitudSL();
                String pUsuario = HttpContext.Session.GetString("UserName");

                oLista = oSolicitudSL.ListarReporteMotivoRechazo(45, pUsuario);

            }
            catch (Exception ex)
            {
                //Manejando Errores
                var error = ex.ToString();
            }
            var response = JsonConvert.SerializeObject(oLista);
            return Content(response, "application/json");
        }

    }
}
