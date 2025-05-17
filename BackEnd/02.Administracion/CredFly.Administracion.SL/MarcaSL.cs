using CredFly.Administracion.BL;
using CredFly.Generico.BE;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CredFly.Administracion.SL
{
    public class MarcaSL
    {

        public List<ComboBE> ListarCombo()
        {
            MarcaBL oMarcaBL = new MarcaBL();
            return oMarcaBL.ListarCombo();
        }

    }
}
