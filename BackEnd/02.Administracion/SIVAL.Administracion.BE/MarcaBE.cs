using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SIVAL.Administracion.BE
{
    public class MarcaBE
    {

        public Int32 id_marca  { get; set; }
        public String marca  { get; set; }
        public String descripcion  { get; set; }
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
