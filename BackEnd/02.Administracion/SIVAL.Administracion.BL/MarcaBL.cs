using SIVAL.Administracion.DO;
using SIVAL.Generico.BE;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SIVAL.Administracion.BL
{
    public class MarcaBL
    {


        public List<ComboBE> ListarCombo()
        {
            MarcaDO oMarcaDO = new MarcaDO();
            return oMarcaDO.ListarCombo();
        }
    }
}
