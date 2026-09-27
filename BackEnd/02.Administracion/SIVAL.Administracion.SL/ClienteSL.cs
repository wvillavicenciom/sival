using SIVAL.Administracion.BE;
using SIVAL.Administracion.BL;
using SIVAL.Administracion.DO;
using SIVAL.Generico.BE;
using System;
using System.Collections.Generic;

namespace SIVAL.Administracion.SL
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
