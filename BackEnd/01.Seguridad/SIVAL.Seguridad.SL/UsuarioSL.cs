using SIVAL.Generico.BE;
using SIVAL.Seguridad.BE;
using SIVAL.Seguridad.BL;
using System;
using System.Collections.Generic;

namespace SIVAL.Seguridad.SL
{
    public class UsuarioSL
    {

        public ResponseBE ValidarInicio(String pUsuario, String pClave)
        {
            UsuarioBL oUsuarioBL = new UsuarioBL();
            return oUsuarioBL.ValidarInicio(pUsuario, pClave);
        }

        public ResponseBE Registrar(UsuarioBE pUsuarioBE)
        {
            UsuarioBL oUsuarioBL = new UsuarioBL();
            return oUsuarioBL.Registrar(pUsuarioBE);
        }

        public ResponseBE Actualizar(UsuarioBE pUsuarioBE)
        {
            UsuarioBL oUsuarioBL = new UsuarioBL();
            return oUsuarioBL.Actualizar(pUsuarioBE);
        }

        public ResponseBE Eliminar(UsuarioBE pUsuarioBE)
        {
            UsuarioBL oUsuarioBL = new UsuarioBL();
            return oUsuarioBL.Eliminar(pUsuarioBE);
        }

        public List<UsuarioBE> Listar(UsuarioBE pUsuarioBE)
        {
            UsuarioBL oUsuarioBL = new UsuarioBL();
            return oUsuarioBL.Listar(pUsuarioBE);
        }

        public UsuarioBE Obtener(Int32 pIdUsuario)
        {
            UsuarioBL oUsuarioBL = new UsuarioBL();
            return oUsuarioBL.Obtener(pIdUsuario);
        }

        public ResponseBE CambiarClave(UsuarioBE pUsuarioBE)
        {
            UsuarioBL oUsuarioBL = new UsuarioBL();
            return oUsuarioBL.CambiarClave(pUsuarioBE);
        }


    }
}
