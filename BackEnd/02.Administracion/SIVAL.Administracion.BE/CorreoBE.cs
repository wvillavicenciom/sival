using SIVAL.Generico.BE;
using System;
using System.Collections.Generic;
using System.Text;

namespace SIVAL.Administracion.BE
{
    public class CorreoBE : AuditoriaBE
    {
        public Decimal id_correo { get; set; }
        public Decimal id_cliente { get; set; }
        public Int32 i009_tipo_correo { get; set; }
        public String correo { get; set; }
        public Boolean flag_preventiva { get; set; }
        public Boolean flag_cobranza { get; set; }
        public String tipo_correo { get; set; }
        public String comentario { get; set; }
    }
}
