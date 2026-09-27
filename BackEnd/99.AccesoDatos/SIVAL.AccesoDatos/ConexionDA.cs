using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;

namespace SIVAL.AccesoDatos
{
    public class ConexionDA
    {
        #region Variables

        private int pDataBase = 4;// Int32.Parse(ConfiguracionDA.ObtenerBaseDatosDefault().ToString());
        private int pAmbiente = 0;// Int32.Parse(ConfiguracionDA.ObtenerAmbienteDefault().ToString());

        #endregion

        //public SqlTransaction IniciaTransaccion()
        //{
        //    //switch (pDataBase)
        //    //{
        //    //    case (int)Enumerados.DataBase.SQLServer:
        //    //        {
        //    //            SQLServerDA oSQLServerDA = new SQLServerDA(pAmbiente, pDataBase);
        //    //            return oSQLServerDA.IniciaTransaccion();
        //    //        }
        //    //    default: return null;
        //    //}
        //    SQLServerDA oSQLServerDA = new SQLServerDA(pAmbiente, pDataBase);
        //    return oSQLServerDA.IniciaTransaccion();
        //}

        public T ExecutePckT<T>(String commandText, List<GParametrosBE> oListaParametros/*, SqlTransaction psqlTran = null*/)
        {
            T entidad = default(T);
            try
            {
                SQLServerDA oSQLServerDA = new SQLServerDA(pAmbiente, pDataBase);
                SqlParameter[] pSqlParameterArray = new SqlParameter[oListaParametros.Count];
                var cont = 0;
                foreach (GParametrosBE item in oListaParametros)
                {
                    switch (item.pTypeSQLServer)
                    {
                        case System.Data.DbType.Date:
                            pSqlParameterArray[cont] = new SqlParameter(item.pParName, item.pTypeSQLServer) { Value = item.pParValueDateTime }; break;
                        case System.Data.DbType.DateTime:
                            pSqlParameterArray[cont] = new SqlParameter(item.pParName, item.pTypeSQLServer) { Value = item.pParValueDateTime }; break;
                        default:
                            pSqlParameterArray[cont] = new SqlParameter(item.pParName, item.pTypeSQLServer) { Value = item.pValue }; break;
                    }
                    cont++;
                }
                entidad = oSQLServerDA.ExecuteT<T>(System.Data.CommandType.StoredProcedure, commandText, pSqlParameterArray/*, psqlTran*/);
            }
            catch (Exception sqlEx)
            {
                var error = sqlEx.ToString();
                //Log.WhriteLogException(error, Constantes.strCapaDA, "ExecutePckT<T>");
            }
            return entidad;

        }


        public List<T> ExecutePckTT<T>(String commandText, List<GParametrosBE> oListaParametros)
        {
            List<T> queryResult = new List<T>();
            try
            {
                SQLServerDA oSQLServerDA = new SQLServerDA(pAmbiente, pDataBase);
                SqlParameter[] pSqlParameterArray = new SqlParameter[oListaParametros.Count];
                var cont = 0;
                foreach (GParametrosBE item in oListaParametros)
                {
                    switch (item.pTypeSQLServer)
                    {
                        case System.Data.DbType.Date:
                            pSqlParameterArray[cont] = new SqlParameter(item.pParName, item.pTypeSQLServer) { Value = item.pParValueDateTime }; break;
                        case System.Data.DbType.DateTime:
                            pSqlParameterArray[cont] = new SqlParameter(item.pParName, item.pTypeSQLServer) { Value = item.pParValueDateTime }; break;
                        default:
                            pSqlParameterArray[cont] = new SqlParameter(item.pParName, item.pTypeSQLServer) { Value = item.pValue }; break;
                    }
                    //pSqlParameterArray[cont] = new SqlParameter(item.pParName, item.pTypeOracle) { Value = item.pParValue };
                    cont++;
                }
                queryResult = oSQLServerDA.ExecuteTT<T>(System.Data.CommandType.StoredProcedure, commandText, pSqlParameterArray);
            }
            catch (Exception sqlEx)
            {
                var error = sqlEx.ToString();
                //Log.WhriteLogException(error, Constantes.strCapaDA , "ExecutePckTT<T>");
            }
            return queryResult;

        }
    }
}
