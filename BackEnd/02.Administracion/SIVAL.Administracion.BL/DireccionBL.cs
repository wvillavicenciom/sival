using SIVAL.Administracion.BE;
using SIVAL.Administracion.DO;
using SIVAL.Generico.BE;
using System;
using System.Collections.Generic;
using System.Text;

namespace SIVAL.Administracion.BL
{
    public class DireccionBL
    {
        public List<DireccionBE> ListarPorCliente(Int32 pIdEmpresa, Decimal pIdCliente)
        {
            DireccionDO oDireccionDO = new DireccionDO();
            return oDireccionDO.ListarPorCliente(pIdEmpresa, pIdCliente);
        }

        public ResponseBE Registrar(DireccionBE pDireccionBE)
        {
            DireccionDO oDireccionDO = new DireccionDO();
            return oDireccionDO.Registrar(pDireccionBE);
        }

        public ResponseBE Actualizar(DireccionBE pDireccionBE)
        {
            DireccionDO oDireccionDO = new DireccionDO();
            return oDireccionDO.Actualizar(pDireccionBE);
        }

        public ResponseBE Eliminar(DireccionBE pDireccionBE)
        {
            DireccionDO oDireccionDO = new DireccionDO();
            return oDireccionDO.Eliminar(pDireccionBE);
        }

    }
}
