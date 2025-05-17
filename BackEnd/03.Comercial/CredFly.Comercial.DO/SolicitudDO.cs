using CredFly.AccesoDatos;
using CredFly.Comercial.BE;
using CredFly.Comercial.BE.Reportes;
using CredFly.Generico.BE;
using System.Data;

namespace CredFly.Comercial.DO
{
    public class SolicitudDO
    {
        public List<SolicitudBE> Listar(int pIdSolicitud, int pTipoDocumento, String pDocumento, String pApellidoPaterno, String pApellidoMaterno, String pNombres, String pFechaIni, String pFechaFin, int pEtapaSolicitud)
        {
            List<SolicitudBE> oLista = new List<SolicitudBE>();
            try
            {
                List<GParametrosBE> oParametros = new List<GParametrosBE>()
                {
                    new GParametrosBE() {pParName = "ID_SOLICITUD", pValue = pIdSolicitud, pTypeSQLServer = DbType.Decimal},
                    new GParametrosBE() {pParName = "I002_TIPO_DOCUMENTO", pValue = pTipoDocumento, pTypeSQLServer = DbType.Int32},
                    new GParametrosBE() {pParName = "DOCUMENTO", pValue = pDocumento, pTypeSQLServer = DbType.String},
                    new GParametrosBE() {pParName = "APELLIDO_PATERNO", pValue = pApellidoPaterno, pTypeSQLServer = DbType.String},
                    new GParametrosBE() {pParName = "APELLIDO_MATERNO", pValue = pApellidoMaterno, pTypeSQLServer = DbType.String},
                    new GParametrosBE() {pParName = "NOMBRES", pValue = pNombres, pTypeSQLServer = DbType.String},
                    new GParametrosBE() {pParName = "FECHA_INI", pValue = pFechaIni, pTypeSQLServer = DbType.String},
                    new GParametrosBE() {pParName = "FECHA_FIN", pValue = pFechaFin, pTypeSQLServer = DbType.String},
                    new GParametrosBE() {pParName = "I007_ETAPA_SOLICITUD", pValue = pEtapaSolicitud, pTypeSQLServer = DbType.Int32},
                };

                ConexionDA conexionDA = new ConexionDA();
                oLista = conexionDA.ExecutePckTT<SolicitudBE>("UP_SOLICITUD_LISTAR", oParametros);
            }
            catch (Exception ex)
            {
                //Manejando Errores
                var error = ex.ToString();
                //Log.WhriteLogException(error, Constantes.strCapaDO, "UsuarioDO.ValidarInicio");
            }
            return oLista;
        }

        public SolicitudBE Obtener(int pIdSolicitud)
        {
            SolicitudBE oLista = new SolicitudBE();
            try
            {
                List<GParametrosBE> oParametros = new List<GParametrosBE>()
                {
                    new GParametrosBE() {pParName = "ID_SOLICITUD", pValue = pIdSolicitud, pTypeSQLServer = DbType.Decimal}
                };

                ConexionDA conexionDA = new ConexionDA();
                oLista = conexionDA.ExecutePckT<SolicitudBE>("UP_SOLICITUD_OBTENER", oParametros);
            }
            catch (Exception ex)
            {
                //Manejando Errores
                var error = ex.ToString();
                //Log.WhriteLogException(error, Constantes.strCapaDO, "UsuarioDO.ValidarInicio");
            }
            return oLista;
        }

        public ResponseBE EvaluarFD(Int32 pTipoDocumento, String pDocumento, String pFechaNacimiento, Int32 pCategoriaLaboral, Decimal pIngresoBruto, String pFechaIngresoLaboral, String pUsuario)
        {
            ResponseBE oLista = new ResponseBE();
            try
            {
                List<GParametrosBE> oParametros = new List<GParametrosBE>()
                {
                    new GParametrosBE() {pParName = "@TIPO_DOCUMENTO", pValue = pTipoDocumento, pTypeSQLServer = DbType.Int32},
                    new GParametrosBE() {pParName = "@DOCUMENTO", pValue = pDocumento, pTypeSQLServer = DbType.String},
                    new GParametrosBE() {pParName = "@FECHA_NACIMIENTO", pValue = pFechaNacimiento, pTypeSQLServer = DbType.String},
                    new GParametrosBE() {pParName = "@CATEGORIA_LABORAL", pValue = pCategoriaLaboral, pTypeSQLServer = DbType.Int32},
                    new GParametrosBE() {pParName = "@INGRESO_BRUTO", pValue = pIngresoBruto, pTypeSQLServer = DbType.Decimal},
                    new GParametrosBE() {pParName = "@FECHA_INGRESO_LABORAL", pValue = pFechaIngresoLaboral, pTypeSQLServer = DbType.String},
                    new GParametrosBE() {pParName = "@USUARIO", pValue = pUsuario, pTypeSQLServer = DbType.String}
                };

                ConexionDA conexionDA = new ConexionDA();
                oLista = conexionDA.ExecutePckT<ResponseBE>("UP_SOLICITUD_EVALUAR_FD", oParametros);
            }
            catch (Exception ex)
            {
                //Manejando Errores
                var error = ex.ToString();
                //Log.WhriteLogException(error, Constantes.strCapaDO, "UsuarioDO.ValidarInicio");
            }
            return oLista;
        }

        public List<SolicitudPlazoBE> ListarPlazos(int pIdSolicitud)
        {
            List<SolicitudPlazoBE> oLista = new List<SolicitudPlazoBE>();
            try
            {
                List<GParametrosBE> oParametros = new List<GParametrosBE>()
                {
                    new GParametrosBE() {pParName = "ID_SOLICITUD", pValue = pIdSolicitud, pTypeSQLServer = DbType.Decimal}
                };

                ConexionDA conexionDA = new ConexionDA();
                oLista = conexionDA.ExecutePckTT<SolicitudPlazoBE>("UP_SOLICITUD_PLAZO_LISTAR", oParametros);
            }
            catch (Exception ex)
            {
                //Manejando Errores
                var error = ex.ToString();
                //Log.WhriteLogException(error, Constantes.strCapaDO, "UsuarioDO.ValidarInicio");
            }
            return oLista;
        }

        public ResponseBE Guardar(SolicitudBE pSolicitudBE)
        {
            ResponseBE oResponseBE = new ResponseBE();
            try
            {
                List<GParametrosBE> oParametros = new List<GParametrosBE>()
                {
                    new GParametrosBE() {pParName = "@ID_SOLICITUD", pValue = pSolicitudBE.id_solicitud, pTypeSQLServer = DbType.Decimal},
                    new GParametrosBE() {pParName = "@ID_TIPO_DOCUMENTO", pValue = pSolicitudBE.i002_tipo_documento, pTypeSQLServer = DbType.Int32},
                    new GParametrosBE() {pParName = "@DOCUMENTO", pValue = pSolicitudBE.documento, pTypeSQLServer = DbType.String},
                    new GParametrosBE() {pParName = "@APELLIDO_PATERNO", pValue = pSolicitudBE.apellido_paterno, pTypeSQLServer = DbType.String},
                    new GParametrosBE() {pParName = "@APELLIDO_MATERNO", pValue = pSolicitudBE.apellido_materno, pTypeSQLServer = DbType.String},
                    new GParametrosBE() {pParName = "@NOMBRES", pValue = pSolicitudBE.nombres, pTypeSQLServer = DbType.String},
                    new GParametrosBE() {pParName = "@FECHA_NACIMIENTO", pParValueDateTime = pSolicitudBE.fecha_nacimiento, pTypeSQLServer = DbType.DateTime},
                    new GParametrosBE() {pParName = "@ID_CATEGORIA_LABORAL", pValue = pSolicitudBE.i003_categoria_laboral, pTypeSQLServer = DbType.Int32},
                    new GParametrosBE() {pParName = "@MTO_INGRESO_BRUTO", pValue = pSolicitudBE.mto_ingreso_bruto, pTypeSQLServer = DbType.Decimal},
                    new GParametrosBE() {pParName = "@FECHA_INGRESO_LABORAL", pParValueDateTime = pSolicitudBE.fecha_ingreso_laboral, pTypeSQLServer = DbType.DateTime},
                    new GParametrosBE() {pParName = "@TELEFONO", pValue = pSolicitudBE.telefono, pTypeSQLServer = DbType.String},
                    new GParametrosBE() {pParName = "@CORREO", pValue = pSolicitudBE.correo, pTypeSQLServer = DbType.String},
                    new GParametrosBE() {pParName = "@ID_DEPARTAMENTO", pValue = pSolicitudBE.id_departamento, pTypeSQLServer = DbType.String},
                    new GParametrosBE() {pParName = "@ID_PROVINCIA", pValue = pSolicitudBE.id_provincia, pTypeSQLServer = DbType.String},
                    new GParametrosBE() {pParName = "@ID_DISTRITO", pValue = pSolicitudBE.id_distrito, pTypeSQLServer = DbType.String},
                    new GParametrosBE() {pParName = "@DIRECCION", pValue = pSolicitudBE.direccion, pTypeSQLServer = DbType.String},
                    new GParametrosBE() {pParName = "@REFERENCIA", pValue = pSolicitudBE.referencia, pTypeSQLServer = DbType.String},
                    new GParametrosBE() {pParName = "@ID_MARCA", pValue = pSolicitudBE.id_marca, pTypeSQLServer = DbType.Int32},
                    new GParametrosBE() {pParName = "@ID_MARCA_MODELO", pValue = pSolicitudBE.id_marca_modelo, pTypeSQLServer = DbType.Int32},
                    new GParametrosBE() {pParName = "@USUARIO", pValue = pSolicitudBE.usuario_modificacion, pTypeSQLServer = DbType.String}
                };

                ConexionDA conexionDA = new ConexionDA();
                oResponseBE = conexionDA.ExecutePckT<ResponseBE>("UP_SOLICITUD_GUARDAR", oParametros);
            }
            catch (Exception ex)
            {
                //Manejando Errores
                var error = ex.ToString();
                //Log.WhriteLogException(error, Constantes.strCapaDO, "UsuarioDO.ValidarInicio");
            }
            return oResponseBE;
        }

        public ResponseBE Anular(SolicitudBE pSolicitudBE)
        {
            ResponseBE oResponseBE = new ResponseBE();
            try
            {
                List<GParametrosBE> oParametros = new List<GParametrosBE>()
                {
                    new GParametrosBE() {pParName = "@ID_SOLICITUD", pValue = pSolicitudBE.id_solicitud, pTypeSQLServer = DbType.Decimal},
                    new GParametrosBE() {pParName = "@USUARIO", pValue = pSolicitudBE.usuario_modificacion, pTypeSQLServer = DbType.String}
                };

                ConexionDA conexionDA = new ConexionDA();
                oResponseBE = conexionDA.ExecutePckT<ResponseBE>("UP_SOLICITUD_ANULAR", oParametros);
            }
            catch (Exception ex)
            {
                //Manejando Errores
                var error = ex.ToString();
                //Log.WhriteLogException(error, Constantes.strCapaDO, "UsuarioDO.ValidarInicio");
            }
            return oResponseBE;
        }

        public ResponseBE Eliminar(SolicitudBE pSolicitudBE)
        {
            ResponseBE oResponseBE = new ResponseBE();
            try
            {
                List<GParametrosBE> oParametros = new List<GParametrosBE>()
                {
                    new GParametrosBE() {pParName = "@ID_SOLICITUD", pValue = pSolicitudBE.id_solicitud, pTypeSQLServer = DbType.Decimal},
                    new GParametrosBE() {pParName = "@USUARIO", pValue = pSolicitudBE.usuario_eliminacion, pTypeSQLServer = DbType.String}
                };

                ConexionDA conexionDA = new ConexionDA();
                oResponseBE = conexionDA.ExecutePckT<ResponseBE>("UP_SOLICITUD_ELIMINAR", oParametros);
            }
            catch (Exception ex)
            {
                //Manejando Errores
                var error = ex.ToString();
                //Log.WhriteLogException(error, Constantes.strCapaDO, "UsuarioDO.ValidarInicio");
            }
            return oResponseBE;
        }


        public ResponseBE Simular(SolicitudBE pSolicitudBE)
        {
            ResponseBE oResponseBE = new ResponseBE();
            try
            {
                List<GParametrosBE> oParametros = new List<GParametrosBE>()
                {
                    new GParametrosBE() {pParName = "@ID_SOLICITUD", pValue = pSolicitudBE.id_solicitud, pTypeSQLServer = DbType.Decimal},
                    new GParametrosBE() {pParName = "@PRECIO_BIEN", pValue = pSolicitudBE.mto_precio_bien, pTypeSQLServer = DbType.Decimal},
                    new GParametrosBE() {pParName = "@INICIAL_BIEN", pValue = pSolicitudBE.mto_inicial_bien, pTypeSQLServer = DbType.Decimal},
                    new GParametrosBE() {pParName = "@ID_SEGURO_BIEN", pValue = pSolicitudBE.i008_seguro_bien, pTypeSQLServer = DbType.Int32},
                    new GParametrosBE() {pParName = "@PORC_SEGURO_BIEN", pValue = pSolicitudBE.porc_seguro_bien, pTypeSQLServer = DbType.Decimal},
                    new GParametrosBE() {pParName = "@USUARIO", pValue = pSolicitudBE.usuario_modificacion, pTypeSQLServer = DbType.String}
                };

                ConexionDA conexionDA = new ConexionDA();
                oResponseBE = conexionDA.ExecutePckT<ResponseBE>("UP_SOLICITUD_SIMULAR", oParametros);
            }
            catch (Exception ex)
            {
                //Manejando Errores
                var error = ex.ToString();
                //Log.WhriteLogException(error, Constantes.strCapaDO, "UsuarioDO.ValidarInicio");
            }
            return oResponseBE;
        }

        public List<SolicitudDocumentoBE> ListarDocumentos(int pIdSolicitud)
        {
            List<SolicitudDocumentoBE> oLista = new List<SolicitudDocumentoBE>();
            try
            {
                List<GParametrosBE> oParametros = new List<GParametrosBE>()
                {
                    new GParametrosBE() {pParName = "ID_SOLICITUD", pValue = pIdSolicitud, pTypeSQLServer = DbType.Decimal}
                };

                ConexionDA conexionDA = new ConexionDA();
                oLista = conexionDA.ExecutePckTT<SolicitudDocumentoBE>("UP_SOLICITUD_DOCUMENTOS_LISTAR", oParametros);
            }
            catch (Exception ex)
            {
                //Manejando Errores
                var error = ex.ToString();
                //Log.WhriteLogException(error, Constantes.strCapaDO, "UsuarioDO.ValidarInicio");
            }
            return oLista;
        }

        public ResponseBE Avanzar(SolicitudBE pSolicitudBE)
        {
            ResponseBE oResponseBE = new ResponseBE();
            try
            {
                List<GParametrosBE> oParametros = new List<GParametrosBE>()
                {
                    new GParametrosBE() {pParName = "@ID_SOLICITUD", pValue = pSolicitudBE.id_solicitud, pTypeSQLServer = DbType.Decimal},
                    new GParametrosBE() {pParName = "@USUARIO", pValue = pSolicitudBE.usuario_modificacion, pTypeSQLServer = DbType.String}
                };

                ConexionDA conexionDA = new ConexionDA();
                oResponseBE = conexionDA.ExecutePckT<ResponseBE>("UP_SOLICITUD_AVANZAR", oParametros);
            }
            catch (Exception ex)
            {
                //Manejando Errores
                var error = ex.ToString();
                //Log.WhriteLogException(error, Constantes.strCapaDO, "UsuarioDO.ValidarInicio");
            }
            return oResponseBE;
        }


        public ResponseBE CalcularEvaluacion(SolicitudBE pSolicitudBE)
        {
            ResponseBE oResponseBE = new ResponseBE();
            try
            {
                List<GParametrosBE> oParametros = new List<GParametrosBE>()
                {
                    new GParametrosBE() {pParName = "@ID_SOLICITUD", pValue = pSolicitudBE.id_solicitud, pTypeSQLServer = DbType.Decimal},
                    new GParametrosBE() {pParName = "@USUARIO", pValue = pSolicitudBE.usuario_modificacion, pTypeSQLServer = DbType.String}
                };

                ConexionDA conexionDA = new ConexionDA();
                oResponseBE = conexionDA.ExecutePckT<ResponseBE>("UP_SOLICITUD_CALCULAR_DATOS_EVALUACION", oParametros);
            }
            catch (Exception ex)
            {
                //Manejando Errores
                var error = ex.ToString();
                //Log.WhriteLogException(error, Constantes.strCapaDO, "UsuarioDO.ValidarInicio");
            }
            return oResponseBE;
        }

        public ResponseBE GuardarValidacion(SolicitudBE pSolicitudBE)
        {
            ResponseBE oResponseBE = new ResponseBE();
            try
            {
                List<GParametrosBE> oParametros = new List<GParametrosBE>()
                {
                    new GParametrosBE() {pParName = "@ID_SOLICITUD", pValue = pSolicitudBE.id_solicitud, pTypeSQLServer = DbType.Decimal},
                    new GParametrosBE() {pParName = "@ID_RESULTADO_VALIDACION", pValue = pSolicitudBE.i004_resultado_eval_validador, pTypeSQLServer = DbType.Int32},
                    new GParametrosBE() {pParName = "@ID_MOTIVO_VALIDACION", pValue = pSolicitudBE.i005_motivo_eval_validador, pTypeSQLServer = DbType.Int32},
                    new GParametrosBE() {pParName = "@COMENTARIO_VALIDACION", pValue = pSolicitudBE.comentario_eval_validador, pTypeSQLServer = DbType.String},
                    new GParametrosBE() {pParName = "@USUARIO", pValue = pSolicitudBE.usuario_modificacion, pTypeSQLServer = DbType.String}
                };

                ConexionDA conexionDA = new ConexionDA();
                oResponseBE = conexionDA.ExecutePckT<ResponseBE>("UP_SOLICITUD_VALIDACION_GRABAR", oParametros);
            }
            catch (Exception ex)
            {
                //Manejando Errores
                var error = ex.ToString();
                //Log.WhriteLogException(error, Constantes.strCapaDO, "UsuarioDO.ValidarInicio");
            }
            return oResponseBE;
        }

        public ResponseBE GuardarEvaluacion(SolicitudBE pSolicitudBE)
        {
            ResponseBE oResponseBE = new ResponseBE();
            try
            {
                List<GParametrosBE> oParametros = new List<GParametrosBE>()
                {
                    new GParametrosBE() {pParName = "@ID_SOLICITUD", pValue = pSolicitudBE.id_solicitud, pTypeSQLServer = DbType.Decimal},
                    new GParametrosBE() {pParName = "@ID_RESULTADO_EVALUACION", pValue = pSolicitudBE.i004_resultado_eval_analista, pTypeSQLServer = DbType.Int32},
                    new GParametrosBE() {pParName = "@ID_MOTIVO_EVALUACION", pValue = pSolicitudBE.i005_motivo_eval_analista, pTypeSQLServer = DbType.Int32},
                    new GParametrosBE() {pParName = "@COMENTARIO_EVALUACION", pValue = pSolicitudBE.comentario_eval_analista, pTypeSQLServer = DbType.String},
                    new GParametrosBE() {pParName = "@USUARIO", pValue = pSolicitudBE.usuario_modificacion, pTypeSQLServer = DbType.String}
                };

                ConexionDA conexionDA = new ConexionDA();
                oResponseBE = conexionDA.ExecutePckT<ResponseBE>("UP_SOLICITUD_EVALUACION_GRABAR", oParametros);
            }
            catch (Exception ex)
            {
                //Manejando Errores
                var error = ex.ToString();
                //Log.WhriteLogException(error, Constantes.strCapaDO, "UsuarioDO.ValidarInicio");
            }
            return oResponseBE;
        }

        public List<SolicitudEvaluacionBE> ListarHistoricoEvaluacion(int pIdSolicitud)
        {
            List<SolicitudEvaluacionBE> oLista = new List<SolicitudEvaluacionBE>();
            try
            {
                List<GParametrosBE> oParametros = new List<GParametrosBE>()
                {
                    new GParametrosBE() {pParName = "ID_SOLICITUD", pValue = pIdSolicitud, pTypeSQLServer = DbType.Decimal}
                };

                ConexionDA conexionDA = new ConexionDA();
                oLista = conexionDA.ExecutePckTT<SolicitudEvaluacionBE>("UP_SOLICITUD_EVALUACION_LISTAR", oParametros);
            }
            catch (Exception ex)
            {
                //Manejando Errores
                var error = ex.ToString();
                //Log.WhriteLogException(error, Constantes.strCapaDO, "UsuarioDO.ValidarInicio");
            }
            return oLista;
        }

        public ResponseBE GrabarDocumentoAdjunto(SolicitudDocumentoBE pSolicitudDocumentoBE)
        {
            ResponseBE oResponseBE = new ResponseBE();
            try
            {
                List<GParametrosBE> oParametros = new List<GParametrosBE>()
                {
                    new GParametrosBE() {pParName = "@ID_SOLICITUD_DOCUMENTO", pValue = pSolicitudDocumentoBE.id_solicitud_documento, pTypeSQLServer = DbType.Int32},
                    new GParametrosBE() {pParName = "@ID_SOLICITUD", pValue = pSolicitudDocumentoBE.id_solicitud, pTypeSQLServer = DbType.Decimal},
                    new GParametrosBE() {pParName = "@ID_TIPO_DOCUMENTO", pValue = pSolicitudDocumentoBE.i010_tipo_documento, pTypeSQLServer = DbType.Int32},
                    new GParametrosBE() {pParName = "@NOMBRE", pValue = pSolicitudDocumentoBE.nombre, pTypeSQLServer = DbType.String},
                    new GParametrosBE() {pParName = "@DESCRIPCION", pValue = pSolicitudDocumentoBE.descripcion, pTypeSQLServer = DbType.String},
                    new GParametrosBE() {pParName = "@DOCUMENTO", pValue = pSolicitudDocumentoBE.documento, pTypeSQLServer = DbType.String},
                    new GParametrosBE() {pParName = "@USUARIO", pValue = pSolicitudDocumentoBE.usuario_modificacion, pTypeSQLServer = DbType.String}
                };

                ConexionDA conexionDA = new ConexionDA();
                oResponseBE = conexionDA.ExecutePckT<ResponseBE>("UP_SOLICITUD_DOCUMENTO_GRABAR", oParametros);
            }
            catch (Exception ex)
            {
                //Manejando Errores
                var error = ex.ToString();
                //Log.WhriteLogException(error, Constantes.strCapaDO, "UsuarioDO.ValidarInicio");
            }
            return oResponseBE;
        }

        public List<SolicitudBE> ListarBandeja(int pIdSolicitud, int pTipoDocumento, String pDocumento, String pApellidoPaterno, String pApellidoMaterno, String pNombres, String pFechaIni, String pFechaFin, String pUsuario)
        {
            List<SolicitudBE> oLista = new List<SolicitudBE>();
            try
            {
                List<GParametrosBE> oParametros = new List<GParametrosBE>()
                {
                    new GParametrosBE() {pParName = "ID_SOLICITUD", pValue = pIdSolicitud, pTypeSQLServer = DbType.Decimal},
                    new GParametrosBE() {pParName = "I002_TIPO_DOCUMENTO", pValue = pTipoDocumento, pTypeSQLServer = DbType.Int32},
                    new GParametrosBE() {pParName = "DOCUMENTO", pValue = pDocumento, pTypeSQLServer = DbType.String},
                    new GParametrosBE() {pParName = "APELLIDO_PATERNO", pValue = pApellidoPaterno, pTypeSQLServer = DbType.String},
                    new GParametrosBE() {pParName = "APELLIDO_MATERNO", pValue = pApellidoMaterno, pTypeSQLServer = DbType.String},
                    new GParametrosBE() {pParName = "NOMBRES", pValue = pNombres, pTypeSQLServer = DbType.String},
                    new GParametrosBE() {pParName = "FECHA_INI", pValue = pFechaIni, pTypeSQLServer = DbType.String},
                    new GParametrosBE() {pParName = "FECHA_FIN", pValue = pFechaFin, pTypeSQLServer = DbType.String},
                    new GParametrosBE() {pParName = "USUARIO", pValue = pUsuario, pTypeSQLServer = DbType.String},
                };

                ConexionDA conexionDA = new ConexionDA();
                oLista = conexionDA.ExecutePckTT<SolicitudBE>("UP_SOLICITUD_LISTAR_BANDEJA", oParametros);
            }
            catch (Exception ex)
            {
                //Manejando Errores
                var error = ex.ToString();
                //Log.WhriteLogException(error, Constantes.strCapaDO, "UsuarioDO.ValidarInicio");
            }
            return oLista;
        }

        public List<ResumenSolicitudFechaBE> ListarReporteInicio(int pDias, String pUsuario)
        {
            List<ResumenSolicitudFechaBE> oLista = new List<ResumenSolicitudFechaBE>();
            try
            {
                List<GParametrosBE> oParametros = new List<GParametrosBE>()
                {
                    new GParametrosBE() {pParName = "DIAS", pValue = pDias, pTypeSQLServer = DbType.Int32},
                    new GParametrosBE() {pParName = "USUARIO", pValue = pUsuario, pTypeSQLServer = DbType.String},
                };

                ConexionDA conexionDA = new ConexionDA();
                oLista = conexionDA.ExecutePckTT<ResumenSolicitudFechaBE>("UP_SOLICITUD_LISTAR_REPORTE_INICIO", oParametros);
            }
            catch (Exception ex)
            {
                //Manejando Errores
                var error = ex.ToString();
                //Log.WhriteLogException(error, Constantes.strCapaDO, "UsuarioDO.ValidarInicio");
            }
            return oLista;
        }


        public List<ReporteSolicitudMotivoRechazoBE> ListarReporteMotivoRechazo(int pDias, String pUsuario)
        {
            List<ReporteSolicitudMotivoRechazoBE> oLista = new List<ReporteSolicitudMotivoRechazoBE>();
            try
            {
                List<GParametrosBE> oParametros = new List<GParametrosBE>()
                {
                    new GParametrosBE() {pParName = "DIAS", pValue = pDias, pTypeSQLServer = DbType.Int32},
                    new GParametrosBE() {pParName = "USUARIO", pValue = pUsuario, pTypeSQLServer = DbType.String},
                };

                ConexionDA conexionDA = new ConexionDA();
                oLista = conexionDA.ExecutePckTT<ReporteSolicitudMotivoRechazoBE>("UP_SOLICITUD_LISTAR_REPORTE_MOTIVO_RECHAZO", oParametros);
            }
            catch (Exception ex)
            {
                //Manejando Errores
                var error = ex.ToString();
                //Log.WhriteLogException(error, Constantes.strCapaDO, "UsuarioDO.ValidarInicio");
            }
            return oLista;
        }



    }
}