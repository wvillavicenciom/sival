using CredFly.AccesoDatos;
using CredFly.Generico.BE;
using System;
using System.Collections.Generic;
using System.Data;

namespace CredFly.Generico.DO
{
    public class UbigeoDO
    {

        public List<ComboSBE> ListarDepartamentoCombo(String pIdPais)
        {
            List<ComboSBE> oLista = new List<ComboSBE>();
            try
            {
                List<GParametrosBE> oParametros = new List<GParametrosBE>()
                {
                    new GParametrosBE() {pParName = "ID_PAIS", pValue = pIdPais, pTypeSQLServer = DbType.String}
                };

                ConexionDA conexionDA = new ConexionDA();
                oLista = conexionDA.ExecutePckTT<ComboSBE>("UP_UBIGEO_DEPARTAMENTO_LISTAR", oParametros);
            }
            catch (Exception ex)
            {
                //Manejando Errores
                var error = ex.ToString();
                //Log.WhriteLogException(error, Constantes.strCapaDO, "UsuarioDO.ValidarInicio");
            }
            return oLista;
        }

        public List<ComboSBE> ListarProvinciaCombo(String pIdDepartamento)
        {
            List<ComboSBE> oLista = new List<ComboSBE>();
            try
            {
                List<GParametrosBE> oParametros = new List<GParametrosBE>()
                {
                    new GParametrosBE() {pParName = "ID_DEPARTAMENTO", pValue = pIdDepartamento, pTypeSQLServer = DbType.String},
                };

                ConexionDA conexionDA = new ConexionDA();
                oLista = conexionDA.ExecutePckTT<ComboSBE>("UP_UBIGEO_PROVINCIA_LISTAR", oParametros);
            }
            catch (Exception ex)
            {
                //Manejando Errores
                var error = ex.ToString();
                //Log.WhriteLogException(error, Constantes.strCapaDO, "UsuarioDO.ValidarInicio");
            }
            return oLista;
        }

        public List<ComboSBE> ListarDistritoCombo(String pIdDepartamento, String pIdProvincia)
        {
            List<ComboSBE> oLista = new List<ComboSBE>();
            try
            {
                List<GParametrosBE> oParametros = new List<GParametrosBE>()
                {
                    new GParametrosBE() {pParName = "ID_DEPARTAMENTO", pValue = pIdDepartamento, pTypeSQLServer = DbType.String},
                    new GParametrosBE() {pParName = "ID_PROVINCIA", pValue = pIdProvincia, pTypeSQLServer = DbType.String}
                };

                ConexionDA conexionDA = new ConexionDA();
                oLista = conexionDA.ExecutePckTT<ComboSBE>("UP_UBIGEO_DISTRITO_LISTAR", oParametros);
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
