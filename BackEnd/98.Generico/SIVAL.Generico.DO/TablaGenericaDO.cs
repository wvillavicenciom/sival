using SIVAL.AccesoDatos;
using SIVAL.Generico.BE;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;

namespace SIVAL.Generico.DO
{
    public class TablaGenericaDO
    {

        public List<ComboBE> ListarCombo(Int32 pIdEmpresa, Int32 pIdentTabla)
        {
            List<ComboBE> oLista = new List<ComboBE>();
            try
            {
                List<GParametrosBE> oParametros = new List<GParametrosBE>()
                {
                    //new GParametrosBE() {pParName = "ID_EMPRESA", pValue = pIdEmpresa, pTypeSQLServer = DbType.Int32},
                    new GParametrosBE() {pParName = "ID_TABLA", pValue = pIdentTabla, pTypeSQLServer = DbType.Int32}
                };

                ConexionDA conexionDA = new ConexionDA();
                oLista = conexionDA.ExecutePckTT<ComboBE>("UP_TABLA_GENERICA_LISTAR_COMBO", oParametros);
            }
            catch (Exception ex)
            {
                //Manejando Errores
                var error = ex.ToString();
                //Log.WhriteLogException(error, Constantes.strCapaDO, "UsuarioDO.ValidarInicio");
            }
            return oLista;
        }

    }
}
