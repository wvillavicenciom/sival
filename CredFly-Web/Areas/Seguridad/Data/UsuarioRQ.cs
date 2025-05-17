namespace CredFly_Web.Areas.Seguridad.Data
{
    public class UsuarioRQ
    {
        public Int32 id_usuario {get; set;}
        public Int32 id_tipo_documento { get; set; }
        public String documento { get; set; }
        public String nombres { get; set; }
        public String apellido_paterno { get; set; }
        public String apellido_materno { get; set; }
        public Int32 id_tipo_usuario { get; set; }
        public String usuario { get; set; }
        public String clave { get; set; }
        public Boolean flag_administrador { get; set; }
        public Boolean flag_activo { get; set; }
    }
}
