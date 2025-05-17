using CredFly.Administracion.BE;
using CredFly.Administracion.DO;
using CredFly.Generico.BE;
using System;
using System.Collections.Generic;
using System.Text;

namespace CredFly.Administracion.BL
{
    public class TelefonoBL
    {
        public List<TelefonoBE> ListarPorCliente(Int32 pIdEmpresa, Decimal pIdCliente)
        {
            TelefonoDO oTelefonoDO = new TelefonoDO();
            return oTelefonoDO.ListarPorCliente(pIdEmpresa, pIdCliente);
        }

        public ResponseBE Registrar(TelefonoBE pTelefonoBE)
        {
            TelefonoDO oTelefonoDO = new TelefonoDO();
            return oTelefonoDO.Registrar(pTelefonoBE);
        }

        public ResponseBE Actualizar(TelefonoBE pTelefonoBE)
        {
            TelefonoDO oTelefonoDO = new TelefonoDO();
            return oTelefonoDO.Actualizar(pTelefonoBE);
        }

        public ResponseBE Eliminar(TelefonoBE pTelefonoBE)
        {
            TelefonoDO oTelefonoDO = new TelefonoDO();
            return oTelefonoDO.Eliminar(pTelefonoBE);
        }

    }
}
