using System;

namespace SIVAL.Administracion.BE
{
    public class ClienteBE
    {
        public Decimal id_cliente { get; set; }
        public Int32 id_empresa { get; set; }
        public Int32 i002_tipo_documento { get; set; }
        public String documento { get; set; } 
        public String apellido_paterno { get; set; } 
        public String apellido_materno  { get; set; }
        public String nombres { get; set; }
        public String razon_social { get; set; } 
        public DateTime fecha_nacimiento  { get; set; }
        public Int32 i011_genero  { get; set; } 
        public Int32 i012_estado_civil  { get; set; }
        public Boolean flg_gestion_cobranza { get; set; }
        public Boolean flg_gestion_preventiva { get; set; }
        public Boolean flg_gestion_pagos { get; set; }
        public Boolean flg_envio_msn { get; set; }
        public Boolean flg_envio_whatsapp { get; set; }
        public Boolean flg_envio_correo { get; set; }
        public Boolean activo { get; set; } 
        public Int32 i001_estado { get; set; }
        public Decimal usuario_creador  { get; set; }
        public DateTime fecha_creacion { get; set; }


        public String cliente { get; set; }
        public Int32 contratos { get; set; }
        public Decimal mto_financiado { get; set; }
        public Decimal mto_saldo { get; set; }


        public String telefono { get; set; }
        public String correo { get; set; }
        public String direccion { get; set; }
        public Int32 id_departamento { get; set; }
        public Int32 id_provincia { get; set; }
        public Int32 id_distrito { get; set; }

    }
}
