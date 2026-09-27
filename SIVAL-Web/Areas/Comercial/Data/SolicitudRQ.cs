namespace SIVAL_Web.Areas.Comercial.Data
{
    public class SolicitudRQ
    {

        public Decimal id_solicitud { get; set; }
        public Int32 id_tipo_documento { get; set; }
        public String documento { get; set; }
        public String apellido_paterno { get; set; }
        public String apellido_materno { get; set; }
        public String nombres { get; set; }
        public DateTime fecha_nacimiento { get; set; }
        public Int32 id_categoria_laboral { get; set; }
        public Decimal mto_ingreso_bruto { get; set; }
        public DateTime fecha_ingreso_laboral { get; set; }
        public DateTime fecha_solicitud { get; set; }
        public String telefono { get; set; }
        public String correo { get; set; }
        public String id_departamento { get; set; }
        public String id_distrito { get; set; }
        public String id_provincia { get; set; }
        public String direccion { get; set; }
        public String referencia { get; set; }
        public Int32 id_marca { get; set; }
        public Int32 id_marca_modelo { get; set; }

        public Decimal mto_precio_bien { get; set; }
        public Decimal mto_inicial_bien { get; set; }
        public Int32 id_seguro_bien { get; set; }
        public float porc_seguro_bien { get; set; }

        public Int32 id_resultado_evaluacion { get; set; }
        public Int32 id_motivo_evaluacion { get; set; }
        public String comentario_evaluacion { get; set; }

        public Int32 id_resultado_validacion { get; set; }
        public Int32 id_motivo_validacion { get; set; }
        public String comentario_validacion { get; set; }


    }
}
