using CredFly.Administracion.BE;
using CredFly.Administracion.DO;
using CredFly.Generico.BE;
using System;
using System.Collections.Generic;
using System.Text;

namespace CredFly.Administracion.BL
{
    public class CorreoBL
    {
        public List<CorreoBE> ListarPorCliente(Int32 pIdEmpresa, Decimal pIdCliente)
        {
            CorreoDO oCorreoDO = new CorreoDO();
            return oCorreoDO.ListarPorCliente(pIdEmpresa, pIdCliente);
        }

        public ResponseBE Registrar(CorreoBE pCorreoBE)
        {
            CorreoDO oCorreoDO = new CorreoDO();
            return oCorreoDO.Registrar(pCorreoBE);
        }

        public ResponseBE Actualizar(CorreoBE pCorreoBE)
        {
            CorreoDO oCorreoDO = new CorreoDO();
            return oCorreoDO.Actualizar(pCorreoBE);
        }

        public ResponseBE Eliminar(CorreoBE pCorreoBE)
        {
            CorreoDO oCorreoDO = new CorreoDO();
            return oCorreoDO.Eliminar(pCorreoBE);
        }

    }
}
