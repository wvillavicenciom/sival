using SIVAL.Generico.BE;
using System;
using System.Collections.Generic;
using System.Text;

namespace SIVAL.Administracion.BE
{
    public class TelefonoBE: AuditoriaBE
    {
        public Decimal id_telefono { get; set; }
        public Decimal id_cliente { get; set; }
        public Int32 i008_tipo_telefono { get; set; }
        public Int32 i007_operador { get; set; }
        public String prefijo { get; set; }
        public String numero { get; set; }
        public String comentario { get; set; }
        public Boolean flag_preventiva { get; set; }
        public Boolean flag_cobranza { get; set; }

        public String tipo_telefono { get; set; }
        public String operador { get; set; }
    }
}
