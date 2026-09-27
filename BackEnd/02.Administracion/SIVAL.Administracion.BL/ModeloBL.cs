using SIVAL.Administracion.DO;
using SIVAL.Generico.BE;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SIVAL.Administracion.BL
{
    public class ModeloBL
    {

        public List<ComboBE> ListarCombo(Int32 pIdMarca)
        {
            ModeloDO oModeloDO = new ModeloDO();
            return oModeloDO.ListarCombo(pIdMarca);
        }

    }
}
