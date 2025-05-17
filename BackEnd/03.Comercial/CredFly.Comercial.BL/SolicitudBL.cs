using CredFly.Comercial.BE;
using CredFly.Comercial.BE.Reportes;
using CredFly.Comercial.DO;
using CredFly.Generico.BE;

namespace CredFly.Comercial.BL
{
    public class SolicitudBL
    {
        public List<SolicitudBE> Listar(int pIdSolicitud, int pTipoDocumento, String pDocumento, String pApellidoPaterno, String pApellidoMaterno, String pNombres, String pFechaIni, String pFechaFin, int pEtapaSolicitud)
        {
            SolicitudDO oSolicitudDO = new SolicitudDO();
            return oSolicitudDO.Listar(pIdSolicitud, pTipoDocumento, pDocumento, pApellidoPaterno, pApellidoMaterno, pNombres, pFechaIni, pFechaFin, pEtapaSolicitud);
        }

        public SolicitudBE Obtener(int pIdSolicitud)
        {
            SolicitudDO oSolicitudDO = new SolicitudDO();
            return oSolicitudDO.Obtener(pIdSolicitud);
        }

        public ResponseBE EvaluarFD(Int32 pTipoDocumento, String pDocumento, String pFechaNacimiento, Int32 pCategoriaLaboral, Decimal pIngresoBruto, String pFechaIngresoLaboral, String pUsuario)
        {
            SolicitudDO oSolicitudDO = new SolicitudDO();
            return oSolicitudDO.EvaluarFD(pTipoDocumento, pDocumento, pFechaNacimiento, pCategoriaLaboral, pIngresoBruto, pFechaIngresoLaboral, pUsuario);
        }

        public List<SolicitudPlazoBE> ListarPlazos(int pIdSolicitud)
        {
            SolicitudDO oSolicitudDO = new SolicitudDO();
            return oSolicitudDO.ListarPlazos(pIdSolicitud);
        }

        public ResponseBE Guardar(SolicitudBE pSolicitudBE)
        {
            SolicitudDO oSolicitudDO = new SolicitudDO();
            return oSolicitudDO.Guardar(pSolicitudBE);
        }

        public ResponseBE Anular(SolicitudBE pSolicitudBE)
        {
            SolicitudDO oSolicitudDO = new SolicitudDO();
            return oSolicitudDO.Anular(pSolicitudBE);
        }

        public ResponseBE Eliminar(SolicitudBE pSolicitudBE)
        {
            SolicitudDO oSolicitudDO = new SolicitudDO();
            return oSolicitudDO.Eliminar(pSolicitudBE);
        }

        public ResponseBE Simular(SolicitudBE pSolicitudBE)
        {
            SolicitudDO oSolicitudDO = new SolicitudDO();
            return oSolicitudDO.Simular(pSolicitudBE);
        }


        public List<SolicitudDocumentoBE> ListarDocumentos(int pIdSolicitud)
        {
            SolicitudDO oSolicitudDO = new SolicitudDO();
            return oSolicitudDO.ListarDocumentos(pIdSolicitud);
        }

        public ResponseBE Avanzar(SolicitudBE pSolicitudBE)
        {
            SolicitudDO oSolicitudDO = new SolicitudDO();
            return oSolicitudDO.Avanzar(pSolicitudBE);
        }

        public ResponseBE CalcularEvaluacion(SolicitudBE pSolicitudBE)
        {
            SolicitudDO oSolicitudDO = new SolicitudDO();
            return oSolicitudDO.CalcularEvaluacion(pSolicitudBE);
        }

        public ResponseBE GuardarValidacion(SolicitudBE pSolicitudBE)
        {
            SolicitudDO oSolicitudDO = new SolicitudDO();
            return oSolicitudDO.GuardarValidacion(pSolicitudBE);
        }

        public ResponseBE GuardarEvaluacion(SolicitudBE pSolicitudBE)
        {
            SolicitudDO oSolicitudDO = new SolicitudDO();
            return oSolicitudDO.GuardarEvaluacion(pSolicitudBE);
        }

        public List<SolicitudEvaluacionBE> ListarHistoricoEvaluacion(int pIdSolicitud)
        {
            SolicitudDO oSolicitudDO = new SolicitudDO();
            return oSolicitudDO.ListarHistoricoEvaluacion(pIdSolicitud);
        }

        public ResponseBE GrabarDocumentoAdjunto(SolicitudDocumentoBE pSolicitudDocumentoBE)
        {
            SolicitudDO oSolicitudDO = new SolicitudDO();
            return oSolicitudDO.GrabarDocumentoAdjunto(pSolicitudDocumentoBE);
        }

        public List<SolicitudBE> ListarBandeja(int pIdSolicitud, int pTipoDocumento, String pDocumento, String pApellidoPaterno, String pApellidoMaterno, String pNombres, String pFechaIni, String pFechaFin, String pUsuario)
        {
            SolicitudDO oSolicitudDO = new SolicitudDO();
            return oSolicitudDO.ListarBandeja(pIdSolicitud, pTipoDocumento, pDocumento, pApellidoPaterno, pApellidoMaterno, pNombres, pFechaIni, pFechaFin, pUsuario);
        }

        public List<ResumenSolicitudFechaBE> ListarReporteInicio(int pDias, String pUsuario)
        {
            SolicitudDO oSolicitudDO = new SolicitudDO();
            return oSolicitudDO.ListarReporteInicio(pDias, pUsuario);
        }

        public List<ReporteSolicitudMotivoRechazoBE> ListarReporteMotivoRechazo(int pDias, String pUsuario)
        {
            SolicitudDO oSolicitudDO = new SolicitudDO();
            return oSolicitudDO.ListarReporteMotivoRechazo(pDias, pUsuario);
        }

    }
}