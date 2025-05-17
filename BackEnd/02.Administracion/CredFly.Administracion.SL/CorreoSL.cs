using CredFly.Administracion.BE;
using CredFly.Administracion.BL;
using CredFly.Generico.BE;
using System;
using System.Collections.Generic;
using System.Text;

namespace CredFly.Administracion.SL
{
    public class CorreoSL
    {
        public List<CorreoBE> ListarPorCliente(Int32 pIdEmpresa, Decimal pIdCliente)
        {
            CorreoBL oCorreoBL = new CorreoBL();
            return oCorreoBL.ListarPorCliente(pIdEmpresa, pIdCliente);
        }

        public ResponseBE Registrar(CorreoBE pCorreoBE)
        {
            CorreoBL oCorreoBL = new CorreoBL();
            return oCorreoBL.Registrar(pCorreoBE);
        }

        public ResponseBE Actualizar(CorreoBE pCorreoBE)
        {
            CorreoBL oCorreoBL = new CorreoBL();
            return oCorreoBL.Actualizar(pCorreoBE);
        }

        public ResponseBE Eliminar(CorreoBE pCorreoBE)
        {
            CorreoBL oCorreoBL = new CorreoBL();
            return oCorreoBL.Eliminar(pCorreoBE);
        }
    }
}
