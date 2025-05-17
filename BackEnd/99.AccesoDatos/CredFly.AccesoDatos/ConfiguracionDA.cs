using Newtonsoft.Json;
using System;
using System.IO;

namespace CredFly.AccesoDatos
{
    public class ConfiguracionDA
    {
        /// <summary>
        /// Método para obtener la cadena de conexión del ambiente que deseemos
        /// </summary>
        /// <param name="strClaveConfiguracion"></param>
        /// <returns>Cadena de conexión</returns>
        /// <remarks>
        /// Creador :  - Sistema de Subastas  – 2017-08-03
        /// </remarks>
        public String CadenaConexion()
        {
            //String strCadena = "";
            //strCadena = ConfigurationManager.ConnectionStrings[strClaveConfiguracion].ConnectionString.ToString();
            //return strCadena;
            //primer metodo para leer appsettings
            //var Path2 = Directory.GetParent(AppContext.BaseDirectory).FullName; por si hay error cuando se hace el deploy
            var Path = System.IO.Directory.GetCurrentDirectory() + "\\appsettings.json";
            StreamReader r = new StreamReader(Path);
            string jsonString = r.ReadToEnd();
            AppsettingsEntidad myDeserializedClass = JsonConvert.DeserializeObject<AppsettingsEntidad>(jsonString);

            //test
            return myDeserializedClass.ConnectionStrings.DefaultConnection;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="pAmbiente"></param>
        /// <param name="pDataBase"></param>
        /// <returns></returns>
        /// <remarks>
        /// Creador :  - Sistema de Subastas  – 2017-08-03
        /// </remarks>
        public String GetStrConection(Int32 pAmbiente, Int32 pDataBase)
        {

            var strConnexion = "";

            //switch (pDataBase)
            //{
            //    case (int)Enumerados.DataBase.CV:
            //        {
            //            //strConnexion = "Data Source=180.194.16.237;Initial Catalog=GOCREDITOS; User Id=sa;Password=M1xtur4.;EnList=false"; break;
            //            strConnexion = "Data Source=180.186.211.63;Initial Catalog=GOCREDITOS; User Id=PRIFBISE;Password=Pu_Dc19#PseCnx;EnList=false"; break;
            //        }
            //    case (int)Enumerados.DataBase.BD_DAAN:
            //        {
            //            strConnexion = "Data Source=app-database.cxwmnhxpdadu.us-east-1.rds.amazonaws.com;Initial Catalog=MIGCREDITOS_DEV; User Id=migsise;Password=migsise@2022;EnList=false"; break;
            //            //strConnexion = "Data Source=app-database.cxwmnhxpdadu.us-east-1.rds.amazonaws.com;Initial Catalog=MIGCREDITOS; User Id=migsise;Password=migsise@2022;EnList=false"; break;
            //            //strConnexion = "Data Source=sisra.cxkzauq12qhd.us-east-1.rds.amazonaws.com;Initial Catalog=MIGCREDITOS; User Id=migsise;Password=@sisemigperu@2206@13@;EnList=false"; break;
            //        }
            //}

            strConnexion = CadenaConexion();

            return strConnexion;
        }


    }
}
