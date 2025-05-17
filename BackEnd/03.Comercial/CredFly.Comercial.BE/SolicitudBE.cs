namespace CredFly.Comercial.BE
{
    public class SolicitudBE 
    {

        public Decimal id_solicitud { get; set; }
        public Int32 i002_tipo_documento { get; set; }
        public String documento { get; set; }
        public String apellido_paterno { get; set; }
        public String apellido_materno { get; set; }
        public String nombres { get; set; }
        public DateTime fecha_nacimiento { get; set; }
        public Int32 i003_categoria_laboral { get; set; }
        public Decimal mto_ingreso_bruto { get; set; }
        public DateTime fecha_ingreso_laboral { get; set; }
        public DateTime fecha_solicitud { get; set; }
        public String telefono { get; set; }
        public String correo { get; set; }
        public Int32 id_ubigeo_direccion { get; set; }
        public String direccion { get; set; }
        public String referencia { get; set; }
        public DateTime fecha_primera_evaluacion { get; set; }
        public Int32 i004_resultado_primer_evaluacion { get; set; }
        public Int32 i004_resultado_evaluacion { get; set; }
        public DateTime fecha_ult_evaluacion  { get; set; }
        public Int32 i006_tipo_producto { get; set; }
        public Decimal mto_precio_bien { get; set; }
        public Decimal mto_inicial_bien { get; set; }
        public Double porc_inicial_bien { get; set; }
        public Decimal mto_precio_bien_min { get; set; }
        public Decimal mto_precio_bien_max { get; set; }
        public Double porc_inicial_bien_min { get; set; }
        public Double porc_inicial_bien_max { get; set; }
        public Double tea { get; set; }
        public Int32 plazo { get; set; }
        public Int32 i007_etapa_solicitud { get; set; }        
        public Int32 i008_seguro_bien { get; set; }
        public Double porc_seguro_bien { get; set; }
        public Decimal mto_financiar { get; set; }
        public Decimal mto_cuota { get; set; }
        public DateTime fecha_inicio_cronograma { get; set; }
        public DateTime fecha_eval_validador { get; set; }
        public Int32 i004_resultado_eval_validador { get; set; }
        public Int32 i005_motivo_eval_validador { get; set; }
        public String comentario_eval_validador { get; set; }
        public Double rmi { get; set; }
        public Double rci { get; set; }
        public Double rsfi { get; set; }
        public Double rti { get; set; }
        public Decimal mto_carga_interna { get; set; }
        public Decimal mto_carga_externa { get; set; }
        public Decimal mto_carga_total { get; set; }
        public Int32 cant_solicitudes_mes { get; set; }
        public Int32 cant_solicitudes_apr_mes { get; set; }
        public Int32 cant_solicitudes_rch_mes { get; set; }
        public Int32 cant_operaciones { get; set; }
        public Int32 dias_atraso_actual { get; set; }
        public Decimal mto_deuda_interna { get; set; }
        public Decimal mto_ult_ingreso { get; set; }
        public DateTime fecha_eval_analista { get; set; }
        public Int32 i004_resultado_eval_analista { get; set; }
        public Int32 i005_motivo_eval_analista { get; set; }
        public String comentario_eval_analista { get; set; }
        public String periodo_eval_rcc { get; set; }
        public Int32 id_usuario_ejecutivo { get; set; }
        public Int32 id_usuario_validador { get; set; }
        public Int32 id_usuario_analista { get; set; }
        public Boolean flag_activo { get; set; }
        public Int32 i001_estado_registro { get; set; }
        public DateTime fecha_creacion { get; set; }
        public String usuario_creacion { get; set; }
        public DateTime fecha_modificacion { get; set; }
        public String  usuario_modificacion { get; set; }
        public DateTime fecha_eliminacion { get; set; }
        public String usuario_eliminacion { get; set; }


        public String cliente { get; set; }
        public String tipo_documento { get; set; }
        public String etapa { get; set; }
        public String fecha_solicitud_str { get; set; }

        public String id_departamento { get; set; }
        public String id_provincia { get; set; }
        public String id_distrito { get; set; }
        public Int32 id_marca { get; set; }
        public Int32 id_marca_modelo { get; set; }


        public Boolean flag_aprobado { get; set; }       
        public Boolean flag_solicitud_mes { get; set; }    
    }
}