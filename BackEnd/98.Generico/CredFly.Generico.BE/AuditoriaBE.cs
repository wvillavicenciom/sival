using System;
using System.Collections.Generic;
using System.Text;

namespace CredFly.Generico.BE
{
    public class AuditoriaBE
    {
        public Boolean activo { get; set; }
        public Int32 i001_estado { get; set; }
        public Decimal usuario_creador { get; set; }
        public DateTime fecha_creacion { get; set; }
        public Decimal usuario_modificador { get; set; }
        public DateTime fecha_modificacion { get; set; }
        public Decimal usuario_eliminador { get; set; }
        public DateTime fecha_eliminacion { get; set; }
    }
}
