using CredFly.Generico.BE;
using CredFly.Generico.DO;
using System;
using System.Collections.Generic;

namespace CredFly.Generico.BL
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
