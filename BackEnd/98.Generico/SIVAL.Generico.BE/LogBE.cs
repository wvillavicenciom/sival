using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SIVAL.Generico.BE
{
    public class LogBE : AuditoriaBE
    {
        public String modulo { get; set; }
        public String sub_modulo { get; set; }
        public String opcion { get; set; }
        public Int32 tipo { get; set; }
        public String error { get; set; }
        public String descripcion { get; set; }
    }
}
