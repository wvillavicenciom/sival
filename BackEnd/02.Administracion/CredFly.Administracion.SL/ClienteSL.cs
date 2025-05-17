using CredFly.Administracion.BE;
using CredFly.Administracion.BL;
using CredFly.Administracion.DO;
using CredFly.Generico.BE;
using System;
using System.Collections.Generic;

namespace CredFly.Administracion.SL
{
    public class ClienteSL
    {
        public List<ClienteBE> Listar(Int32 pIdEmpresa, String pDocumento)
        {
            ClienteBL oClienteBL = new ClienteBL();
            return oClienteBL.Listar(pIdEmpresa, pDocumento);
        }

        public ClienteBE Obtener(Int32 pIdEmpresa, Decimal pIdCliente)
        {
            ClienteBL oClienteBL = new ClienteBL();
            return oClienteBL.Obtener(pIdEmpresa, pIdCliente);
        }

        public ResponseBE Guardar(ClienteBE pClienteBE)
        {
            ClienteBL oClienteBL = new ClienteBL();
            return oClienteBL.Guardar(pClienteBE);
        }

        public List<RCCDeudaResumenBE> ListarDeudasRCC(Int32 pTipoPersona, Int32 pTipoDocumento, String pDocumento)
        {
            ClienteBL oClienteBL = new ClienteBL();
            return oClienteBL.ListarDeudasRCC(pTipoPersona, pTipoDocumento, pDocumento);
        }

    }
}
