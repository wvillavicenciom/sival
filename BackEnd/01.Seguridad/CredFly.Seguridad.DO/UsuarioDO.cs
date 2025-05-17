using CredFly.AccesoDatos;
using CredFly.Generico.BE;
using CredFly.Seguridad.BE;
using System;
using System.Collections.Generic;
using System.Data;
using System.Numerics;

namespace CredFly.Seguridad.DO
{
    public class UsuarioDO
    {
        public ResponseBE ValidarInicio(String pUsuario, String pClave)
        {
            ResponseBE oLista = new ResponseBE();
            try
            {
                List<GParametrosBE> oParametros = new List<GParametrosBE>()
                {
                    new GParametrosBE() {pParName = "USUARIO", pValue = pUsuario, pTypeSQLServer = DbType.String},
                    new GParametrosBE() {pParName = "CLAVE", pValue = pClave, pTypeSQLServer = DbType.String},
                };

                ConexionDA conexionDA = new ConexionDA();
                oLista = conexionDA.ExecutePckT<ResponseBE>("UP_USUARIO_VALIDAR_INICIO", oParametros);
            }
            catch (Exception ex)
            {
                //Manejando Errores
                var error = ex.ToString();
                //Log.WhriteLogException(error, Constantes.strCapaDO, "UsuarioDO.ValidarInicio");
            }
            return oLista;
        }

        public ResponseBE Registrar(UsuarioBE pUsuarioBE)
        {
            ResponseBE oLista = new ResponseBE();
            try
            {
                List<GParametrosBE> oParametros = new List<GParametrosBE>()
                {
                    new GParametrosBE() {pParName = "ID_TIPO_DOCUMENTO", pValue = pUsuarioBE.i002_tipo_documento, pTypeSQLServer = DbType.Int32},
                    new GParametrosBE() {pParName = "DOCUMENTO", pValue = pUsuarioBE.documento, pTypeSQLServer = DbType.String},
                    new GParametrosBE() {pParName = "APELLIDO_PATERNO", pValue = pUsuarioBE.apellido_paterno, pTypeSQLServer = DbType.String},
                    new GParametrosBE() {pParName = "APELLIDO_MATERNO", pValue = pUsuarioBE.apellido_materno, pTypeSQLServer = DbType.String},
                    new GParametrosBE() {pParName = "NOMBRES", pValue = pUsuarioBE.nombres, pTypeSQLServer = DbType.String},
                    new GParametrosBE() {pParName = "ID_TIPO_USUARIO", pValue = pUsuarioBE.i009_tipo_usuario, pTypeSQLServer = DbType.Int32},
                    new GParametrosBE() {pParName = "USUARIO", pValue = pUsuarioBE.usuario, pTypeSQLServer = DbType.String},
                    new GParametrosBE() {pParName = "CLAVE", pValue = pUsuarioBE.clave, pTypeSQLServer = DbType.String},
                    new GParametrosBE() {pParName = "FLAG_ACTIVO", pValue = pUsuarioBE.flag_activo, pTypeSQLServer = DbType.Boolean},
                    new GParametrosBE() {pParName = "FLAG_ADMINISTRADOR", pValue = pUsuarioBE.flag_administrador, pTypeSQLServer = DbType.Boolean},
                    new GParametrosBE() {pParName = "USUARIO_CREACION", pValue = pUsuarioBE.usuario_creacion, pTypeSQLServer = DbType.String}
                };

                ConexionDA conexionDA = new ConexionDA();
                oLista = conexionDA.ExecutePckT<ResponseBE>("UP_USUARIO_REGISTRAR", oParametros);
            }
            catch (Exception ex)
            {
                //Manejando Errores
                var error = ex.ToString();
                //Log.WhriteLogException(error, Constantes.strCapaDO, "UsuarioDO.ValidarInicio");
            }
            return oLista;
        }

        public ResponseBE Actualizar(UsuarioBE pUsuarioBE)
        {
            ResponseBE oLista = new ResponseBE();
            try
            {
                List<GParametrosBE> oParametros = new List<GParametrosBE>()
                {
                    new GParametrosBE() {pParName = "ID_USUARIO", pValue = pUsuarioBE.id_usuario, pTypeSQLServer = DbType.Decimal},
                    new GParametrosBE() {pParName = "ID_TIPO_DOCUMENTO", pValue = pUsuarioBE.i002_tipo_documento, pTypeSQLServer = DbType.Int32},
                    new GParametrosBE() {pParName = "DOCUMENTO", pValue = pUsuarioBE.documento, pTypeSQLServer = DbType.String},
                    new GParametrosBE() {pParName = "APELLIDO_PATERNO", pValue = pUsuarioBE.apellido_paterno, pTypeSQLServer = DbType.String},
                    new GParametrosBE() {pParName = "APELLIDO_MATERNO", pValue = pUsuarioBE.apellido_materno, pTypeSQLServer = DbType.String},
                    new GParametrosBE() {pParName = "NOMBRES", pValue = pUsuarioBE.nombres, pTypeSQLServer = DbType.String},
                    new GParametrosBE() {pParName = "ID_TIPO_USUARIO", pValue = pUsuarioBE.i009_tipo_usuario, pTypeSQLServer = DbType.Int32},
                    new GParametrosBE() {pParName = "USUARIO", pValue = pUsuarioBE.usuario, pTypeSQLServer = DbType.String},
                    //new GParametrosBE() {pParName = "CLAVE", pValue = pUsuarioBE.clave, pTypeSQLServer = DbType.String},
                    new GParametrosBE() {pParName = "FLAG_ACTIVO", pValue = pUsuarioBE.flag_activo, pTypeSQLServer = DbType.Boolean},
                    new GParametrosBE() {pParName = "FLAG_ADMINISTRADOR", pValue = pUsuarioBE.flag_administrador, pTypeSQLServer = DbType.Boolean},
                    new GParametrosBE() {pParName = "USUARIO_MODIFICACION", pValue = pUsuarioBE.usuario_modificacion, pTypeSQLServer = DbType.String}
                };

                ConexionDA conexionDA = new ConexionDA();
                oLista = conexionDA.ExecutePckT<ResponseBE>("UP_USUARIO_ACTUALIZAR", oParametros);
            }
            catch (Exception ex)
            {
                //Manejando Errores
                var error = ex.ToString();
                //Log.WhriteLogException(error, Constantes.strCapaDO, "UsuarioDO.ValidarInicio");
            }
            return oLista;
        }

        public ResponseBE Eliminar(UsuarioBE pUsuarioBE)
        {
            ResponseBE oLista = new ResponseBE();
            try
            {
                List<GParametrosBE> oParametros = new List<GParametrosBE>()
                {
                    new GParametrosBE() {pParName = "ID_USUARIO", pValue = pUsuarioBE.id_usuario, pTypeSQLServer = DbType.Decimal},
                    new GParametrosBE() {pParName = "USUARIO_ELIMINACION", pValue = pUsuarioBE.usuario_eliminacion, pTypeSQLServer = DbType.String}
                };

                ConexionDA conexionDA = new ConexionDA();
                oLista = conexionDA.ExecutePckT<ResponseBE>("UP_USUARIO_ELIMINAR", oParametros);
            }
            catch (Exception ex)
            {
                //Manejando Errores
                var error = ex.ToString();
                //Log.WhriteLogException(error, Constantes.strCapaDO, "UsuarioDO.ValidarInicio");
            }
            return oLista;
        }

        public List<UsuarioBE> Listar(UsuarioBE pUsuarioBE)
        {
            List<UsuarioBE> oLista = new List<UsuarioBE>();
            try
            {
                List<GParametrosBE> oParametros = new List<GParametrosBE>()
                {
                    new GParametrosBE() {pParName = "USUARIO", pValue = pUsuarioBE.usuario, pTypeSQLServer = DbType.String},
                    new GParametrosBE() {pParName = "ID_TIPO_DOCUMENTO", pValue = pUsuarioBE.i002_tipo_documento, pTypeSQLServer = DbType.Int32},
                    new GParametrosBE() {pParName = "DOCUMENTO", pValue = pUsuarioBE.documento, pTypeSQLServer = DbType.String},
                    new GParametrosBE() {pParName = "NOMBRES", pValue = pUsuarioBE.nombres, pTypeSQLServer = DbType.String},
                    new GParametrosBE() {pParName = "APE_PATERNO", pValue = pUsuarioBE.apellido_paterno, pTypeSQLServer = DbType.String},
                    new GParametrosBE() {pParName = "APE_MATERNO", pValue = pUsuarioBE.apellido_materno, pTypeSQLServer = DbType.String},
                    new GParametrosBE() {pParName = "ID_TIPO_USUARIO", pValue = pUsuarioBE.i009_tipo_usuario, pTypeSQLServer = DbType.Int32}
                };

                ConexionDA conexionDA = new ConexionDA();
                oLista = conexionDA.ExecutePckTT<UsuarioBE>("UP_USUARIO_LISTAR", oParametros);
            }
            catch (Exception ex)
            {
                //Manejando Errores
                var error = ex.ToString();
                //Log.WhriteLogException(error, Constantes.strCapaDO, "UsuarioDO.ValidarInicio");
            }
            return oLista;
        }

        public UsuarioBE Obtener(Int32 pIdUsuario)
        {
            UsuarioBE oLista = new UsuarioBE();
            try
            {
                List<GParametrosBE> oParametros = new List<GParametrosBE>()
                {
                    new GParametrosBE() {pParName = "ID_USUARIO", pValue = pIdUsuario, pTypeSQLServer = DbType.Int32}
                };

                ConexionDA conexionDA = new ConexionDA();
                oLista = conexionDA.ExecutePckT<UsuarioBE>("UP_USUARIO_OBTENER", oParametros);
            }
            catch (Exception ex)
            {
                //Manejando Errores
                var error = ex.ToString();
                //Log.WhriteLogException(error, Constantes.strCapaDO, "UsuarioDO.ValidarInicio");
            }
            return oLista;
        }

        public ResponseBE CambiarClave(UsuarioBE pUsuarioBE)
        {
            ResponseBE oLista = new ResponseBE();
            try
            {
                List<GParametrosBE> oParametros = new List<GParametrosBE>()
                {
                    new GParametrosBE() {pParName = "ID_USUARIO", pValue = pUsuarioBE.id_usuario, pTypeSQLServer = DbType.Decimal},
                    new GParametrosBE() {pParName = "USUARIO", pValue = pUsuarioBE.usuario, pTypeSQLServer = DbType.String},
                    new GParametrosBE() {pParName = "CLAVE", pValue = pUsuarioBE.clave, pTypeSQLServer = DbType.String},
                    new GParametrosBE() {pParName = "USUARIO_MODIFICACION", pValue = pUsuarioBE.usuario_modificacion, pTypeSQLServer = DbType.String}
                };

                ConexionDA conexionDA = new ConexionDA();
                oLista = conexionDA.ExecutePckT<ResponseBE>("UP_USUARIO_CAMBIO_CLAVE", oParametros);
            }
            catch (Exception ex)
            {
                //Manejando Errores
                var error = ex.ToString();
                //Log.WhriteLogException(error, Constantes.strCapaDO, "UsuarioDO.ValidarInicio");
            }
            return oLista;
        }


    }
}
