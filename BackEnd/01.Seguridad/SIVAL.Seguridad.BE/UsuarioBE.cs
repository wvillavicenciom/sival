using System;

namespace SIVAL.Seguridad.BE
{
    public class UsuarioBE 
    {
        public Int32 id_usuario { get; set; }
        public Int32 id_empresa { get; set; }
        public String usuario { get; set; }
        public String clave { get; set; }        
        public Int32 i003_tipo_documento { get; set; }
        public String documento { get; set; }
        public String apellido_paterno { get; set; }
        public String apellido_materno { get; set; }
        public String nombres { get; set; }
        public Int32 i002_tipo_usuario { get; set; }
        public Boolean flag_administrador { get; set; }
        public Boolean flag_activo { get; set; }
        public String usuario_creacion { get; set; }
        public DateTime fecha_creacion { get; set; }
        public String usuario_modificacion { get; set; }
        public DateTime fecha_modificacion { get; set; }
        public String usuario_eliminacion { get; set; }
        public DateTime fecha_eliminacion { get; set; }

        public String tipo_documento { get; set; }
        public String tipo_usuario { get; set; }
    }
}
