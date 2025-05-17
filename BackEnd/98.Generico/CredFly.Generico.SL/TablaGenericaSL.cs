using CredFly.Generico.BE;
using CredFly.Generico.BL;
using System;
using System.Collections.Generic;

namespace CredFly.Generico.SL
{
    public class TablaGenericaSL
    {
        public List<ComboBE> ListarCombo(Int32 pIdEmpresa, Int32 pIdentTabla)
        {
            TablaGenericaBL oTablaGenericaBL = new TablaGenericaBL();
            return oTablaGenericaBL.ListarCombo(pIdEmpresa, pIdentTabla);
        }
    }
}
