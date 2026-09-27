using SIVAL.Administracion.BE;
using SIVAL.Administracion.BL;
using SIVAL.Generico.BE;
using System;
using System.Collections.Generic;

namespace SIVAL.Administracion.SL
{
    public class DireccionSL
    {
        public List<DireccionBE> ListarPorCliente(Int32 pIdEmpresa, Decimal pIdCliente)
        {
            DireccionBL oDireccionBL = new DireccionBL();
            return oDireccionBL.ListarPorCliente(pIdEmpresa, pIdCliente);
        }

        public ResponseBE Registrar(DireccionBE pDireccionBE)
        {
            DireccionBL oDireccionBL = new DireccionBL();
            return oDireccionBL.Registrar(pDireccionBE);
        }

        public ResponseBE Actualizar(DireccionBE pDireccionBE)
        {
            DireccionBL oDireccionBL = new DireccionBL();
            return oDireccionBL.Actualizar(pDireccionBE);
        }

        public ResponseBE Eliminar(DireccionBE pDireccionBE)
        {
            DireccionBL oDireccionBL = new DireccionBL();
            return oDireccionBL.Eliminar(pDireccionBE);
        }

    }


}
