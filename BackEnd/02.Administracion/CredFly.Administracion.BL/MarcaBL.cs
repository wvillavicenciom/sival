using CredFly.Administracion.DO;
using CredFly.Generico.BE;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CredFly.Administracion.BL
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
