using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CredFly.Comercial.BE
{
    public class SolicitudEvaluacionBE
    {
        public Int32 id_solicitud_evaluacion { get; set; }
        public Decimal id_solicitud { get; set; }
        public Int32 id_usuario_evaluador { get; set; }
        public Int32 i004_resultado_evaluacion { get; set; }
        public Int32 i005_motivo_rechazo { get; set; }
        public Int32 i007_etapa_solicitud { get; set; }
        public String descripcion { get; set; }
        public Boolean flag_activo { get; set; }
        public Int32 i001_estado_registro { get; set; }
        public DateTime fecha_creacion { get; set; }
        public String usuario_creacion { get; set; }


        public String fecha_str { get; set; }
        public String usuario { get; set; }
        public String resultado { get; set; }
        public String motivo { get; set; }
        public String etapa { get; set; }
    }
}
