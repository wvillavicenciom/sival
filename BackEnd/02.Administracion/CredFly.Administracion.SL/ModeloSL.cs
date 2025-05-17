using CredFly.Administracion.BL;
using CredFly.Generico.BE;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CredFly.Administracion.SL
{
    public class ModeloSL
    {

        public List<ComboBE> ListarCombo(Int32 pIdMarca)
        {
            ModeloBL oModeloBL = new ModeloBL();
            return oModeloBL.ListarCombo(pIdMarca);
        }

    }
}
