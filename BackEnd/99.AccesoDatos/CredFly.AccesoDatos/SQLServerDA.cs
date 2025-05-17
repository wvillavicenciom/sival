using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Reflection;

namespace CredFly.AccesoDatos
{
    public class SQLServerDA
    {

        private String _ConnectionString;
        private ConfiguracionDA Configuracion;

        private SqlConnection _SQLConnection;
        private SqlCommand _SQLCommand;

        /// <summary>
        /// Constructor de la clase para inicializar las variables
        /// </summary>
        /// <remarks>
        /// Creador :  - Sistema de Subastas  – 2017-08-03
        /// </remarks>
        public SQLServerDA(int pAmbiente, int pDataBase)
        {
            Configuracion = new ConfiguracionDA();
            _ConnectionString = Configuracion.GetStrConection(pAmbiente, pDataBase);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        /// <remarks>
        /// Creador :  - Sistema de Subastas  – 2019-03-07
        /// </remarks>
        public SqlTransaction IniciaTransaccion()
        {
            try
            {
                _SQLConnection = new SqlConnection(_ConnectionString);
                SqlTransaction transaction;
                _SQLConnection.Open();
                // Start a local transaction.
                transaction = _SQLConnection.BeginTransaction("SampleTransaction");
                return transaction;
            }
            catch (Exception ex)
            {
                //Log.WhriteLogSqlException(ex.ToString(), "Abrir Transacción");
                return null;
            }
            
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        /// <remarks>
        /// Creador :  - Sistema de Subastas  – 2017-08-03
        /// </remarks>
        public SqlConnection ObtenerConexion()
        {
            _SQLConnection = new SqlConnection(_ConnectionString);
            return _SQLConnection;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="commandType"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        /// <remarks>
        /// Creador :  - Sistema de Subastas  – 2017-08-03
        /// </remarks>
        public List<T> ExecuteTT<T>(CommandType commandType, String commandText, SqlParameter[] pSqlParameterArray)
        {
            List<T> queryResult = new List<T>();
            DataTable datatable = new DataTable();

            datatable = ExecuteDataSet(commandType, commandText, pSqlParameterArray);

            queryResult = ConvertTo<T>(datatable);

            return queryResult;
        }


        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="commandType"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        /// <remarks>
        /// Creador :  - Sistema de Subastas  – 2017-08-03
        /// </remarks>
        public DataTable ExecuteDT(CommandType commandType, String commandText, SqlParameter[] pSqlParameterArray)
        {
            DataTable datatable = new DataTable();

            datatable = ExecuteDataSet(commandType, commandText, pSqlParameterArray);

            //queryResult = ConvertTo<T>(datatable);
            return datatable;
        }

        /// <summary>
        /// Método para obtener la entidad enviada como parametros
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="commandType"></param>
        /// <param name="commandText"></param>
        /// <param name="pSqlParameterArray"></param>
        /// <returns></returns>
        /// <remarks>
        /// Creador :  - Sistema de Subastas  – 2017-08-03
        /// </remarks>
        public T ExecuteT<T>(CommandType commandType, String commandText, SqlParameter[] pSqlParameterArray, SqlTransaction psqlTran = null)
        {
            List<T> queryResult = new List<T>();
            T entidad = default(T);
            DataTable datatable = new DataTable();

            datatable = ExecuteDataSet(commandType, commandText, pSqlParameterArray, psqlTran);
            //datatable.Load(dtr)

            queryResult = ConvertTo<T>(datatable);
            if (queryResult.Count > 0)
            {
                entidad = queryResult[0];
            }
            return entidad;
        }

        /// <summary>
        /// Método para ejecutar la consulta ingresada
        /// </summary>
        /// <param name="commandType"></param>
        /// <param name="commandText"></param>
        /// <returns></returns>
        /// <remarks>
        /// Creador :  - Sistema de Subastas  – 2017-08-03
        /// </remarks>
        private DataTable ExecuteDataSet(CommandType commandType, String commandText, SqlParameter[] pSqlParameterArray, SqlTransaction psqlTran = null)
        {
            DataTable oDataTable = new DataTable();
            SqlDataReader oSqlDataReader;
            try
            {
                if (psqlTran != null)
                {
                    _SQLConnection = psqlTran.Connection;
                    _SQLCommand = _SQLConnection.CreateCommand();
                    _SQLCommand.Connection = _SQLConnection;
                    _SQLCommand.Transaction = psqlTran;
                }
                else
                {
                    _SQLConnection = new SqlConnection(_ConnectionString);
                    _SQLCommand = new SqlCommand();
                    _SQLCommand.Connection = _SQLConnection;
                }

                _SQLCommand.CommandType = commandType;
                _SQLCommand.CommandText = commandText;

                //SI TIENE PARAMETROS SE LE ASIGNA
                if (pSqlParameterArray != null)
                {
                    _SQLCommand.Parameters.AddRange(pSqlParameterArray);
                }

                if (psqlTran == null)
                {
                    _SQLConnection.Open();
                }

                oSqlDataReader = _SQLCommand.ExecuteReader();
                oDataTable.Load(oSqlDataReader);
                if (psqlTran == null)
                {
                    _SQLConnection.Close();
                }
                oSqlDataReader.Close();
            }
            catch (SqlException sqlEx)
            {
                //Manejando Errores
                var datoAdicional = "CommandText  : " + commandText;
                var error = sqlEx.ToString();
                //Log.WhriteLogSqlException(error, datoAdicional);
            }
            return oDataTable;
        }

        /// <summary>
        /// Método para crear la lista de la clase default ingresada como parametro
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="table"></param>
        /// <returns></returns>
        /// <remarks>
        /// Creador :  - Sistema de Subastas  – 2017-08-03
        /// </remarks>
        private List<T> ConvertTo<T>(DataTable table)
        {
            if (table == null)
            {
                return new List<T>();
            }
            else
            {
                List<T> rows = new List<T>();
                foreach (DataRow row in table.Rows)
                {
                    T item;
                    item = CreateItem<T>(row);
                    rows.Add(item);
                }
                return rows;
            }
        }

        /// <summary>
        /// Método para crear el item de la clase default ingresada como parametro
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="row"></param>
        /// <returns></returns>
        /// <remarks>
        /// Creador :  - Sistema de Subastas  – 2017-08-03
        /// </remarks>
        private T CreateItem<T>(DataRow row)
        {
            String columnName = "";
            T obj = default(T);
            if (row != null)
            {
                obj = Activator.CreateInstance<T>();
                foreach (DataColumn column in row.Table.Columns)
                {
                    columnName = column.ColumnName.ToLower();
                    PropertyInfo prop = obj.GetType().GetProperty(columnName);
                    try
                    {
                        if (prop != null)
                        {
                            if (!row[columnName].GetType().Name.Equals("DBNull"))
                            {
                                Object value = row[columnName];
                                prop.SetValue(obj, value, null);
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        //Manejando Errores
                        var datoAdicional = "Columna  : " + columnName;
                        var error = ex.ToString();
                        //Log.WhriteLogSqlException(error, datoAdicional);
                    }
                }
            }
            return obj;
        }

    }

    
}
