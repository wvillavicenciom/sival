using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SIVAL.Comercial.BE.Reportes
{
    public class ResumenSolicitudFechaBE
    {
        public String fecha { get; set; }
        public Int32 cant_aprobados { get; set; }
        public Int32 cant_rechazados { get; set; }
        public Int32 cant_seg_a { get; set; }
        public Int32 cant_seg_b { get; set; }
        public Int32 cant_seg_c { get; set; }
        public Int32 cant_seg_d { get; set; }
        public Int32 cant_seg_e { get; set; }
        public Int32 cant_solicitudes_mes { get; set; }
    }
}
