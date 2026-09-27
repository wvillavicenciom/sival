using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SIVAL.Comercial.BE
{
    public class SolicitudDocumentoBE
    {
        public Int32 id_solicitud_documento { get; set; }
        public Decimal id_solicitud { get; set; }
        public Int32 i010_tipo_documento { get; set; }
        public Int32 i011_estado_documento { get; set; }
        public String nombre { get; set; }
        public String descripcion { get; set; }
        public String documento { get; set; }
        public Boolean flag_activo { get; set; }
        public Int32 i001_estado_registro { get; set; }
        public DateTime fecha_creacion { get; set; }
        public String usuario_creacion { get; set; }
        public DateTime fecha_modificacion { get; set; }
        public String usuario_modificacion { get; set; }
        public DateTime fecha_eliminacion { get; set; }
        public String usuario_eliminacion { get; set; }

        public String tipo_documento { get; set; }
        public String estado_documento { get; set; }
    }
}
