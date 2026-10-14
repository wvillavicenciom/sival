using SIVAL.AccesoDatos;
using SIVAL.Generico.BE;
using System;
using System.Collections.Generic;
using System.Data;

namespace SIVAL.Generico.DO
{
    public class LogDO
    {
        public Boolean Registrar(LogBE pLogBE)
        {
            
            try
            {
                List<GParametrosBE> oParametros = new List<GParametrosBE>()
                {
                    new GParametrosBE() {pParName = "pModulo", pValue = pLogBE.modulo, pTypeSQLServer = DbType.String},
                    new GParametrosBE() {pParName = "pSubModulo", pValue = pLogBE.sub_modulo, pTypeSQLServer = DbType.String},
                    new GParametrosBE() {pParName = "pOpcion", pValue = pLogBE.opcion, pTypeSQLServer = DbType.String},
                    new GParametrosBE() {pParName = "pTipo", pValue = pLogBE.tipo, pTypeSQLServer = DbType.Int32},
                    new GParametrosBE() {pParName = "pError", pValue = pLogBE.error, pTypeSQLServer = DbType.String},
                    new GParametrosBE() {pParName = "pDescripcion", pValue = pLogBE.descripcion, pTypeSQLServer = DbType.String}
                };

                ConexionDA conexionDA = new ConexionDA();
                conexionDA.ExecutePckTT<ComboSBE>("UP_LOG_REGISTRAR", oParametros);
            }
            catch (Exception ex)
            {
                //Manejando Errores
                var error = ex.ToString();
            }
            return true;
        }
    }
}
