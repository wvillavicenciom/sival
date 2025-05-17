using CredFly.Generico.BE;
using CredFly.Generico.DO;
using System;
using System.Collections.Generic;

namespace CredFly.Generico.BL
{
    public class UbigeoBL
    {

        public List<ComboSBE> ListarDepartamentoCombo(String pIdPais)
        {
            UbigeoDO oUbigeoDO = new UbigeoDO();
            return oUbigeoDO.ListarDepartamentoCombo(pIdPais);
        }


        public List<ComboSBE> ListarProvinciaCombo(String pIdDepartamento)
        {
            UbigeoDO oUbigeoDO = new UbigeoDO();
            return oUbigeoDO.ListarProvinciaCombo(pIdDepartamento);
        }

        public List<ComboSBE> ListarDistritoCombo(String pIdDepartamento, String pIdProvincia)
        {
            UbigeoDO oUbigeoDO = new UbigeoDO();
            return oUbigeoDO.ListarDistritoCombo(pIdDepartamento, pIdProvincia);
        }


    }
}
