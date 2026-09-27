namespace SIVAL_Web.Areas.Comercial.Data
{
    public class SolicitudDocumentoRQ
    {
        public Int32 id_solicitud_documento { get; set; }
        public Decimal id_solicitud { get; set; }
        public Int32 id_tipo_documento { get; set; }
        public String nombre { get; set; }
        public String comentario { get; set; }
        public String documento_base64 { get; set; }
    }
}
