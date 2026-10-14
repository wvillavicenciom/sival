using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SIVAL.Comercial.BE;
using SIVAL.Comercial.SL;
using SIVAL.Generico.BE;
using SIVAL.Generico.SL;
using SIVAL_Web.Areas.Comercial.Models;
using SIVAL_Web.Servicios;
using System.Globalization;
using System.Reflection.Metadata.Ecma335;
using static SIVAL.Generico.BE.Enumerados;

namespace SIVAL_Web.Areas.Comercial.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SolicitudApiController : Controller
    {

        [HttpPost("Evaluar")]
        [Authorize]
        public IActionResult EvaluarFD([FromBody] EvaluarRQ request)
        {
            ResponseBE oResponseBE = new ResponseBE();
            Int32 vCodigoRespuesta = 0;
            String vMensajeRespuesta = "";
            try
            {

                Int32 pTipoDocumento = request.pTipoDocumento;
                String pDocumento = request.pDocumento;
                String pApellidoPaterno = request.pApellidoPaterno;
                String pApellidoMaterno = request.pApellidoMaterno;
                String pNombres = request.pNombres;
                String pFechaNacimiento = request.pFechaNacimiento;
                Int32 pGenero = request.pGenero;
                Int32 pActividadEconomica = request.pActividadEconomica;
                Int32 pConvenio = request.pConvenio;
                Int32 pDepartamento = request.pDepartamento;
                Decimal pNroCreditos = request.pNroCreditos;

                String vValidaciones = "";
                vValidaciones = ValidarDatos(request);

                //Si hay mensaje de error devolvemos el error
                if (vValidaciones.Length > 0)
                {
                    return Ok(new
                    {
                        codigo = 500,
                        mensaje = vValidaciones,
                        datosRecibidos = request,
                        resultado = "Rechazado"
                    });
                }else
                {
                    SolicitudSL oSolicitudSL = new SolicitudSL();
                    String pUsuario = "Api";
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
                        else
                        {
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

                            return Ok(new
                            {
                                codigo = 200,
                                mensaje = oResponseBE_CAL.msg,
                                segmento = oResponseBE_CAL.dato_a,
                                pd = oResponseBE_CAL.dato_b
                            });

                        }
                        else
                        {

                            return Ok(new
                            {
                                codigo = 400,
                                mensaje = oResponseBE_CAL.msg,
                                datosRecibidos = request,
                                resultado = "Rechazado"
                            });
                        }
                    }
                    else
                    {

                        return Ok(new
                        {
                            codigo = 400,
                            mensaje = "Error al realizar la evaluacion",
                            datosRecibidos = request,
                            resultado = "Rechazado"
                        });
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

                return Ok(new
                {
                    codigo = 500,
                    mensaje = "Error al realizar la evaluacion",
                    datosRecibidos = request,
                    resultado = "Rechazado"
                });
            }
        }

        [HttpGet("Listar")]
        [Authorize]
        public IActionResult ListarBusqueda(String pFechaIni, String pFechaFin)
        {
            List<SolicitudBE> oLista = new List<SolicitudBE>();
            try
            {
                SolicitudSL oSolicitudSL = new SolicitudSL();
                String pEmpresa = "1";                
                pFechaIni = pFechaIni == null ? "" : pFechaIni;
                pFechaFin = pFechaFin == null ? "" : pFechaFin;
                oLista = oSolicitudSL.Listar(0, 0, "", "", "", "", pFechaIni, pFechaFin, 0);
            }
            catch (Exception ex)
            {
                //Manejando Errores
                var error = ex.ToString();
            }
            var response = JsonConvert.SerializeObject(oLista);
            return Content(response, "application/json");
        }

        [HttpGet("Obtener")]
        [Authorize]
        public IActionResult Obtener(int pIdSolicitud)
        {
            SolicitudBE oLista = new SolicitudBE();
            try
            {
                SolicitudSL oSolicitudSL = new SolicitudSL();
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



        private String ValidarDatos(EvaluarRQ request)
        {
            String respuesta = "";
            try
            {
                if (request.pTipoDocumento != (int)TipoDocumento.DNI && request.pGenero != (int)TipoDocumento.CE)
                {
                    return "Tipo Documento incorrecto";
                }

                if (request.pDocumento.Length != 8 && request.pDocumento.Length != 9)
                {
                    return "Documento incorrecto (8 ó 9 Caracteres)";
                }

                if (request.pApellidoPaterno.Length < 3 || request.pApellidoPaterno.Length > 50)
                {

                    return "Apellido Paterno incorrecto (3 carac min y 50 máx)";
                }

                if (request.pApellidoMaterno.Length < 3 && request.pApellidoMaterno.Length > 50)
                {
                    return "Apellido Materno incorrecto (3 carac min y 50 máx)";
                }

                if (request.pNombres.Length < 3 && request.pNombres.Length > 50)
                {
                    return "Nombres incorrecto (3 carac min y 50 máx)";
                }

                if (request.pFechaNacimiento.Length != 10 || !ValidarFormatoFecha(request.pFechaNacimiento, "dd/MM/yyyy"))
                {
                    return "Fecha Nacimiento erroneo (Formato mm/dd/yyyy)";
                }

                if (request.pGenero != (int)Genero.Masculino && request.pGenero != (int)Genero.Femenino)
                {
                    return "Codigo de Genero incorrecto";
                }

                if (request.pActividadEconomica == 0 || request.pActividadEconomica == null)
                {
                    return "Actividad Economica incorrecta";
                }

                if (request.pConvenio == 0 || request.pConvenio == null)
                {
                    return "Convenio incorrecto";
                }

                if (request.pDepartamento == 0 || request.pDepartamento == null)
                {
                    return "Departamento incorrecto";
                }

                if (request.pNroCreditos < 0 || request.pNroCreditos == null)
                {
                    return "NroCreditos incorrecto";
                }

                return respuesta;
            }
            catch (Exception ex)
            {
                var error = ex.ToString();
                LogBE oLogBE = new LogBE();
                oLogBE.modulo = "SolicitudApi";
                oLogBE.sub_modulo = "EvaluarFD";
                oLogBE.opcion = "ValidarDatos";
                oLogBE.tipo = 1;
                oLogBE.error = "Error Método ValidarDatos";
                oLogBE.descripcion = ex.ToString();
                LogSL.Registrar(oLogBE);
                return "Errror al validar datos";
            }

        }

        public bool ValidarFormatoFecha(string fechaString, string formatoEsperado)
        {
            // formatoEsperado puede ser "dd/MM/yyyy", "yyyy-MM-dd", etc.
            bool esValida = DateTime.TryParseExact(
                fechaString,
                formatoEsperado,
                CultureInfo.InvariantCulture,
                DateTimeStyles.None,
                out DateTime fechaParseada);

            return esValida;
        }

        /*
        // MÉTODO 2: Evaluar (Obligatorio enviar token)
        [HttpPost("evaluar")]
        [Authorize]
        public IActionResult Evaluar([FromBody] EvaluarRequest request)
        {
            // Lógica de evaluación
            bool esValido = !string.IsNullOrEmpty(request.Documento) && request.FechaNacimiento < DateTime.Now;

            return Ok(new
            {
                mensaje = "Evaluación procesada correctamente",
                datosRecibidos = request,
                resultado = esValido ? "Aprobado" : "Rechazado"
            });
        }

        // MÉTODO 3: Listar (Obligatorio enviar token)
        [HttpPost("listar")]
        [Authorize]
        public IActionResult Listar([FromBody] ListarRequest request)
        {
            if (request.FechaInicio > request.FechaFin)
            {
                return BadRequest("La fecha de inicio no puede ser mayor a la fecha de fin.");
            }

            // Simulación de consulta a base de datos basada en los parámetros
            var listaSimulada = new List<DatoResponse>
            {
                new DatoResponse { Id = 1, Descripcion = $"Registro A para Solicitud {request.IdSolicitud}", FechaRegistro = request.FechaInicio.AddDays(1) },
                new DatoResponse { Id = 2, Descripcion = $"Registro B para Solicitud {request.IdSolicitud}", FechaRegistro = request.FechaInicio.AddDays(2) }
            };

            return Ok(listaSimulada);
        }*/

    }
}
