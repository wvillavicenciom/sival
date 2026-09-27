using SIVAL.Comercial.BE;
using SIVAL.Comercial.BE.Reportes;
using SIVAL.Comercial.BL;
using SIVAL.Comercial.DO;
using SIVAL.Generico.BE;

namespace SIVAL.Comercial.SL
{
    public class SolicitudSL
    {
        public List<SolicitudBE> Listar(int pIdSolicitud, int pTipoDocumento, String pDocumento, String pApellidoPaterno, String pApellidoMaterno, String pNombres, String pFechaIni, String pFechaFin, int pTopResultado)
        {
            SolicitudBL oSolicitudBL = new SolicitudBL();
            return oSolicitudBL.Listar(pIdSolicitud, pTipoDocumento, pDocumento, pApellidoPaterno, pApellidoMaterno, pNombres, pFechaIni, pFechaFin, pTopResultado);
        }

        public SolicitudBE Obtener(int pIdSolicitud)
        {
            SolicitudBL oSolicitudBL = new SolicitudBL();
            return oSolicitudBL.Obtener(pIdSolicitud);
        }

        public ResponseBE EvaluarFD(Int32 pTipoDocumento, String pDocumento, String pApellidoPaterno, String pApellidoMaterno, String pNombres, String pFechaNacimiento, Int32 pGenero, Int32 pActividadEconomica, Int32 pConvenio, Int32 pDepartamento, Decimal pNroCreditos, String pUsuario)
        {
            SolicitudBL oSolicitudBL = new SolicitudBL();
            return oSolicitudBL.EvaluarFD(pTipoDocumento, pDocumento, pApellidoPaterno,  pApellidoMaterno, pNombres, pFechaNacimiento, pGenero, pActividadEconomica, pConvenio, pDepartamento, pNroCreditos, pUsuario);
        }

        public List<SolicitudPlazoBE> ListarPlazos(int pIdSolicitud)
        {
            SolicitudBL oSolicitudBL = new SolicitudBL();
            return oSolicitudBL.ListarPlazos(pIdSolicitud);
        }


        public ResponseBE Guardar(SolicitudBE pSolicitudBE)
        {
            SolicitudBL oSolicitudBL = new SolicitudBL();
            return oSolicitudBL.Guardar(pSolicitudBE);
        }

        public ResponseBE Anular(SolicitudBE pSolicitudBE)
        {
            SolicitudBL oSolicitudBL = new SolicitudBL();
            return oSolicitudBL.Anular(pSolicitudBE);
        }

        public ResponseBE Eliminar(SolicitudBE pSolicitudBE)
        {
            SolicitudBL oSolicitudBL = new SolicitudBL();
            return oSolicitudBL.Eliminar(pSolicitudBE);
        }

        public ResponseBE Simular(SolicitudBE pSolicitudBE)
        {
            SolicitudBL oSolicitudBL = new SolicitudBL();
            return oSolicitudBL.Simular(pSolicitudBE);
        }

        public List<SolicitudDocumentoBE> ListarDocumentos(int pIdSolicitud)
        {
            SolicitudBL oSolicitudBL = new SolicitudBL();
            return oSolicitudBL.ListarDocumentos(pIdSolicitud);
        }

        public ResponseBE Avanzar(SolicitudBE pSolicitudBE)
        {
            SolicitudBL oSolicitudBL = new SolicitudBL();
            return oSolicitudBL.Avanzar(pSolicitudBE);
        }

        public ResponseBE CalcularEvaluacion(SolicitudBE pSolicitudBE)
        {
            SolicitudBL oSolicitudBL = new SolicitudBL();
            return oSolicitudBL.CalcularEvaluacion(pSolicitudBE);
        }

        public ResponseBE GuardarValidacion(SolicitudBE pSolicitudBE)
        {
            SolicitudBL oSolicitudBL = new SolicitudBL();
            return oSolicitudBL.GuardarValidacion(pSolicitudBE);
        }

        public ResponseBE GuardarEvaluacion(SolicitudBE pSolicitudBE)
        {
            SolicitudBL oSolicitudBL = new SolicitudBL();
            return oSolicitudBL.GuardarEvaluacion(pSolicitudBE);
        }

        public List<SolicitudEvaluacionBE> ListarHistoricoEvaluacion(int pIdSolicitud)
        {
            SolicitudBL oSolicitudBL = new SolicitudBL();
            return oSolicitudBL.ListarHistoricoEvaluacion(pIdSolicitud);
        }
        public ResponseBE GrabarDocumentoAdjunto(SolicitudDocumentoBE pSolicitudDocumentoBE)
        {
            SolicitudBL oSolicitudBL = new SolicitudBL();
            return oSolicitudBL.GrabarDocumentoAdjunto(pSolicitudDocumentoBE);
        }

        public List<SolicitudBE> ListarBandeja(int pIdSolicitud, int pTipoDocumento, String pDocumento, String pApellidoPaterno, String pApellidoMaterno, String pNombres, String pFechaIni, String pFechaFin, String pUsuario)
        {
            SolicitudBL oSolicitudBL = new SolicitudBL();
            return oSolicitudBL.ListarBandeja(pIdSolicitud, pTipoDocumento, pDocumento, pApellidoPaterno, pApellidoMaterno, pNombres, pFechaIni, pFechaFin, pUsuario);
        }

        public List<ResumenSolicitudFechaBE> ListarReporteInicio(int pDias, String pUsuario)
        {
            SolicitudBL oSolicitudBL = new SolicitudBL();
            return oSolicitudBL.ListarReporteInicio(pDias, pUsuario);
        }

        public List<ReporteSolicitudMotivoRechazoBE> ListarReporteMotivoRechazo(int pDias, String pUsuario)
        {
            SolicitudBL oSolicitudBL = new SolicitudBL();
            return oSolicitudBL.ListarReporteMotivoRechazo(pDias, pUsuario);
        }
    }
}