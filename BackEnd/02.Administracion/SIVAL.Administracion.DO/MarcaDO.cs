using SIVAL.AccesoDatos;
using SIVAL.Generico.BE;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SIVAL.Administracion.DO
{
    public class MarcaDO
    {

        public List<ComboBE> ListarCombo()
        {
            List<ComboBE> oLista = new List<ComboBE>();
            try
            {
                List<GParametrosBE> oParametros = new List<GParametrosBE>();

                ConexionDA conexionDA = new ConexionDA();
                oLista = conexionDA.ExecutePckTT<ComboBE>("UP_MARCA_LISTAR_COMBO", oParametros);
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
