using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SIVAL.Administracion.BE
{
    public class RCCDeudaResumenBE
    {
        public Int32 anio { get; set; }
        public Int32 mes { get; set; }
        public String periodo { get; set; }
        public Decimal codigo_deudor_sbs { get; set; }
        public Decimal total { get; set; }
        public Decimal corporativo { get; set; }
        public Decimal grande { get; set; }
        public Decimal mediana { get; set; }
        public Decimal pequenia { get; set; }
        public Decimal micro { get; set; }
        public Decimal consumo { get; set; }
        public Decimal hipotecariio { get; set; }
        public Decimal vehicular { get; set; }
        public Decimal linea_disponible { get; set; }
        public Decimal castigo { get; set; }
        public Decimal refinanciado { get; set; }
        public Decimal clasificacion_max { get; set; }
        public Decimal dias_atraso_max { get; set; }
        public Int32 empresas { get; set; }
        public Int32 empresas_deuda { get; set; }
        public Decimal carga_mensual { get; set; }
        public Decimal porc_nor { get; set; }
        public Decimal porc_cpp { get; set; }
        public Decimal porc_def { get; set; }
        public Decimal porc_dud { get; set; }
        public Decimal porc_per { get; set; }

        public Decimal total_t1 { get; set; }
        public Decimal total_t2 { get; set; }
        public Decimal var_total_t1 { get; set; }
        public Decimal var_total_t2 { get; set; }
        public Decimal var_linea_disponible_t1 { get; set; }
        public Decimal carga_mensual_t1 { get; set; }
        public Decimal var_carga_mensual_t1 { get; set; }
        public Int32 dias_atraso_1m { get; set; }
        public Int32 dias_atraso_6m { get; set; }
        public Int32 dias_atraso_12m { get; set; }

    }
}
