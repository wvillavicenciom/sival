using System;
using System.Collections.Generic;
using System.Data;
using System.Text;

namespace SIVAL.AccesoDatos
{
    public class GParametrosBE
    {
        public String pParName { get; set; }
        //public OracleType pTypeOracle { get; set; }
        public DbType pTypeSQLServer { get; set; }
        public String pParValue { get; set; }
        public DateTime? pParValueDateTime { get; set; }
        public Boolean pParValueBool { get; set; }
        public Object pValue { get; set; }
    }
}
