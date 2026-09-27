using SIVAL.Generico.BE;
using SIVAL.Generico.BL;
using System;
using System.Collections.Generic;

namespace SIVAL.Generico.SL
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
