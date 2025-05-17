using CredFly.Administracion.BE;
using CredFly.Administracion.BL;
using CredFly.Generico.BE;
using System;
using System.Collections.Generic;
using System.Text;

namespace CredFly.Administracion.SL
{
    public class TelefonoSL
    {
        public List<TelefonoBE> ListarPorCliente(Int32 pIdEmpresa, Decimal pIdCliente)
        {
            TelefonoBL oTelefonoBL = new TelefonoBL();
            return oTelefonoBL.ListarPorCliente(pIdEmpresa, pIdCliente);
        }

        public ResponseBE Registrar(TelefonoBE pTelefonoBE)
        {
            TelefonoBL oTelefonoBL = new TelefonoBL();
            return oTelefonoBL.Registrar(pTelefonoBE);
        }

        public ResponseBE Actualizar(TelefonoBE pTelefonoBE)
        {
            TelefonoBL oTelefonoBL = new TelefonoBL();
            return oTelefonoBL.Actualizar(pTelefonoBE);
        }

        public ResponseBE Eliminar(TelefonoBE pTelefonoBE)
        {
            TelefonoBL oTelefonoBL = new TelefonoBL();
            return oTelefonoBL.Eliminar(pTelefonoBE);
        }
    }
}
