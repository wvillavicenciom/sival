using SIVAL.Generico.BE;
using SIVAL.Seguridad.BE;
using SIVAL.Seguridad.DO;
using System;
using System.Collections.Generic;

namespace SIVAL.Seguridad.BL
{
    public class UsuarioBL
    {

        public ResponseBE ValidarInicio(String pUsuario, String pClave)
        {
            UsuarioDO oUsuarioDO = new UsuarioDO();
            return oUsuarioDO.ValidarInicio(pUsuario, pClave);
        }

        public ResponseBE Registrar(UsuarioBE pUsuarioBE)
        {
            UsuarioDO oUsuarioDO = new UsuarioDO();
            return oUsuarioDO.Registrar(pUsuarioBE);
        }

        public ResponseBE Actualizar(UsuarioBE pUsuarioBE)
        {
            UsuarioDO oUsuarioDO = new UsuarioDO();
            return oUsuarioDO.Actualizar(pUsuarioBE);
        }

        public ResponseBE Eliminar(UsuarioBE pUsuarioBE)
        {
            UsuarioDO oUsuarioDO = new UsuarioDO();
            return oUsuarioDO.Eliminar(pUsuarioBE);
        }

        public List<UsuarioBE> Listar(UsuarioBE pUsuarioBE)
        {
            UsuarioDO oUsuarioDO = new UsuarioDO();
            return oUsuarioDO.Listar(pUsuarioBE);
        }

        public UsuarioBE Obtener(Int32 pIdUsuario)
        {
            UsuarioDO oUsuarioDO = new UsuarioDO();
            return oUsuarioDO.Obtener(pIdUsuario);
        }

        public ResponseBE CambiarClave(UsuarioBE pUsuarioBE)
        {
            UsuarioDO oUsuarioDO = new UsuarioDO();
            return oUsuarioDO.CambiarClave(pUsuarioBE);
        }

    }
}
