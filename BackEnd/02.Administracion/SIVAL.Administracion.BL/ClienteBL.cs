using SIVAL.Administracion.BE;
using SIVAL.Administracion.DO;
using SIVAL.Generico.BE;
using System;
using System.Collections.Generic;

namespace SIVAL.Administracion.BL
{
    public class ClienteBL
    {
        public List<ClienteBE> Listar(Int32 pIdEmpresa, String pDocumento)
        {
            ClienteDO oClienteDO = new ClienteDO();
            return oClienteDO.Listar(pIdEmpresa, pDocumento);
        }

        public ClienteBE Obtener(Int32 pIdEmpresa, Decimal pIdCliente)
        {
            ClienteDO oClienteDO = new ClienteDO();
            return oClienteDO.Obtener(pIdEmpresa, pIdCliente);
        }

        public ResponseBE Guardar(ClienteBE pClienteBE)
        {
            ClienteDO oClienteDO = new ClienteDO();
            return oClienteDO.Guardar(pClienteBE);
        }

        public List<RCCDeudaResumenBE> ListarDeudasRCC(Int32 pTipoPersona, Int32 pTipoDocumento, String pDocumento)
        {
            ClienteDO oClienteDO = new ClienteDO();
            return oClienteDO.ListarDeudasRCC(pTipoPersona, pTipoDocumento, pDocumento);
        }


    }
}
