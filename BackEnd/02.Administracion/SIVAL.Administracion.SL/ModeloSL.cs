using SIVAL.Administracion.BL;
using SIVAL.Generico.BE;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SIVAL.Administracion.SL
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
