using SIVAL.Generico.BE;
using SIVAL.Generico.BL;
using System;
using System.Collections.Generic;

namespace SIVAL.Generico.SL
{
    public class UbigeoSL
    {
        public List<ComboSBE> ListarDepartamentoCombo(String pIdPais)
        {
            UbigeoBL oUbigeoBL = new UbigeoBL();
            return oUbigeoBL.ListarDepartamentoCombo(pIdPais);
        }


        public List<ComboSBE> ListarProvinciaCombo(String pIdDepartamento)
        {
            UbigeoBL oUbigeoBL = new UbigeoBL();
            return oUbigeoBL.ListarProvinciaCombo(pIdDepartamento);
        }

        public List<ComboSBE> ListarDistritoCombo(String pIdDepartamento, String pIdProvincia)
        {
            UbigeoBL oUbigeoBL = new UbigeoBL();
            return oUbigeoBL.ListarDistritoCombo(pIdDepartamento, pIdProvincia);
        }
    }
}
