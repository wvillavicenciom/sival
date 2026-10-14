namespace SIVAL_Web.Areas.Comercial.Models
{
    public class EvaluarRQ
    {
        public Int32 pTipoDocumento { get; set; }
        public String pDocumento { get; set; }
        public String pApellidoPaterno { get; set; }
        public String pApellidoMaterno { get; set; }
        public String pNombres { get; set; }
        public String pFechaNacimiento { get; set; }
        public Int32 pGenero { get; set; }
        public Int32 pActividadEconomica { get; set; }
        public Int32 pConvenio { get; set; }
        public Int32 pDepartamento { get; set; }
        public Int32 pNroCreditos { get; set; }
    }
}
