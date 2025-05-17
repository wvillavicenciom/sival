using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CredFly.Comercial.BE
{
    public class SolicitudPlazoBE
    {

        public Int32 id_solicitud_plazo { get; set; }
        public Decimal id_solicitud { get; set; }
        public Int32 plazo { get; set; }
        public Decimal mto_cuota { get; set; }
        public Decimal mto_cuota_seguro { get; set; }
        public Decimal mto_cuota_total { get; set; }
        public Boolean flag_seleccion { get; set; }
        public Boolean flag_activo { get; set; }
        public Int32 i001_estado_registro { get; set; }
        public DateTime fecha_creacion { get; set; }
        public String usuario_creacion { get; set; }
        public DateTime fecha_modificacion { get; set; }
        public String usuario_modificacion { get; set; }
        public DateTime fecha_eliminacion { get; set; }
        public String usuario_eliminacion { get; set; }
    }
}
