using SIVAL.Generico.BE;
using SIVAL.Generico.DO;
using System;
using System.Collections.Generic;

namespace SIVAL.Generico.BL
{
    public class TablaGenericaBL
    {

        public List<ComboBE> ListarCombo(Int32 pIdEmpresa, Int32 pIdentTabla)
        {
            TablaGenericaDO oTablaGenericaDO = new TablaGenericaDO();
            return oTablaGenericaDO.ListarCombo(pIdEmpresa, pIdentTabla);
        }

    }
}
