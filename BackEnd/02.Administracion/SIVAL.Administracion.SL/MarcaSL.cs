using SIVAL.Administracion.BL;
using SIVAL.Generico.BE;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SIVAL.Administracion.SL
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
