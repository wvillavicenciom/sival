using SIVAL.Generico.BE;
using System;
using System.Collections.Generic;
using System.Text;

namespace SIVAL.Administracion.BE
{
    public class DireccionBE : AuditoriaBE
    {
        public Decimal id_direccion { get; set; }
        public Decimal id_cliente { get; set; }
        public Int32 i010_tipo_direccion { get; set; }
        public String direccion { get; set; }
        public String referencia { get; set; }
        public String comentario { get; set; }
        public Decimal id_ubigeo { get; set; }
        public String id_departamento { get; set; }
        public String id_provincia { get; set; }
        public String id_distrito { get; set; }
        public Boolean flag_georeferenciacion { get; set; }
        public Boolean flag_zona_peligrosa { get; set; }
        public String tipo_direccion { get; set; }
        public String departamento { get; set; }
        public String provincia { get; set; }
        public String distrito { get; set; }

    }
}
