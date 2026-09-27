using SIVAL.AccesoDatos;
using SIVAL.Administracion.BE;
using SIVAL.Generico.BE;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;

namespace SIVAL.Administracion.DO
{
    public class CorreoDO
    {
        public List<CorreoBE> ListarPorCliente(Int32 pIdEmpresa, Decimal pIdCliente)
        {
            List<CorreoBE> oLista = new List<CorreoBE>();
            try
            {
                List<GParametrosBE> oParametros = new List<GParametrosBE>()
                {
                    new GParametrosBE() {pParName = "ID_EMPRESA", pValue = pIdEmpresa, pTypeSQLServer = DbType.Decimal},
                    new GParametrosBE() {pParName = "ID_CLIENTE", pValue = pIdCliente, pTypeSQLServer = DbType.Decimal},
                };

                ConexionDA conexionDA = new ConexionDA();
                oLista = conexionDA.ExecutePckTT<CorreoBE>("UP_CORREO_LISTAR_POR_CLIENTE", oParametros);
            }
            catch (Exception ex)
            {
                //Manejando Errores
                var error = ex.ToString();
                //Log.WhriteLogException(error, Constantes.strCapaDO, "UsuarioDO.ValidarInicio");
            }
            return oLista;
        }

        public ResponseBE Registrar(CorreoBE pCorreoBE)
        {
            ResponseBE oResponse = new ResponseBE();
            try
            {
                List<GParametrosBE> oParametros = new List<GParametrosBE>()
                {
                    new GParametrosBE() {pParName = "ID_CLIENTE", pValue = pCorreoBE.id_cliente, pTypeSQLServer = DbType.Decimal},
                    new GParametrosBE() {pParName = "I009_TIPO_CORREO", pValue = pCorreoBE.i009_tipo_correo, pTypeSQLServer = DbType.Int32},
                    new GParametrosBE() {pParName = "CORREO", pValue = pCorreoBE.correo, pTypeSQLServer = DbType.String},
                    new GParametrosBE() {pParName = "COMENTARIO", pValue = pCorreoBE.comentario, pTypeSQLServer = DbType.String},
                    new GParametrosBE() {pParName = "ACTIVO", pValue = pCorreoBE.activo, pTypeSQLServer = DbType.Boolean},
                    new GParametrosBE() {pParName = "USUARIO_CREADOR", pValue = pCorreoBE.usuario_creador, pTypeSQLServer = DbType.Decimal},

                };

                ConexionDA conexionDA = new ConexionDA();
                oResponse = conexionDA.ExecutePckT<ResponseBE>("UP_CORREO_REGISTRAR", oParametros);
            }
            catch (Exception ex)
            {
                //Manejando Errores
                var error = ex.ToString();
                //Log.WhriteLogException(error, Constantes.strCapaDO, "UsuarioDO.ValidarInicio");
            }
            return oResponse;
        }

        public ResponseBE Actualizar(CorreoBE pCorreoBE)
        {
            ResponseBE oResponse = new ResponseBE();
            try
            {
                List<GParametrosBE> oParametros = new List<GParametrosBE>()
                {
                    new GParametrosBE() {pParName = "ID_CORREO", pValue = pCorreoBE.id_correo, pTypeSQLServer = DbType.Decimal},
                    new GParametrosBE() {pParName = "ID_CLIENTE", pValue = pCorreoBE.id_cliente, pTypeSQLServer = DbType.Decimal},
                    new GParametrosBE() {pParName = "I009_TIPO_CORREO", pValue = pCorreoBE.i009_tipo_correo, pTypeSQLServer = DbType.Int32},
                    new GParametrosBE() {pParName = "CORREO", pValue = pCorreoBE.correo, pTypeSQLServer = DbType.String},
                    new GParametrosBE() {pParName = "COMENTARIO", pValue = pCorreoBE.comentario, pTypeSQLServer = DbType.String},
                    new GParametrosBE() {pParName = "ACTIVO", pValue = pCorreoBE.activo, pTypeSQLServer = DbType.Boolean},
                    new GParametrosBE() {pParName = "USUARIO_MODIFICADOR", pValue = pCorreoBE.usuario_modificador, pTypeSQLServer = DbType.Decimal},

                };

                ConexionDA conexionDA = new ConexionDA();
                oResponse = conexionDA.ExecutePckT<ResponseBE>("UP_CORREO_ACTUALIZAR", oParametros);
            }
            catch (Exception ex)
            {
                //Manejando Errores
                var error = ex.ToString();
                //Log.WhriteLogException(error, Constantes.strCapaDO, "UsuarioDO.ValidarInicio");
            }
            return oResponse;
        }

        public ResponseBE Eliminar(CorreoBE pCorreoBE)
        {
            ResponseBE oResponse = new ResponseBE();
            try
            {
                List<GParametrosBE> oParametros = new List<GParametrosBE>()
                {
                    new GParametrosBE() {pParName = "ID_CORREO", pValue = pCorreoBE.id_correo, pTypeSQLServer = DbType.Decimal},
                    new GParametrosBE() {pParName = "USUARIO_ELIMINADOR", pValue = pCorreoBE.usuario_eliminador, pTypeSQLServer = DbType.Decimal},

                };

                ConexionDA conexionDA = new ConexionDA();
                oResponse = conexionDA.ExecutePckT<ResponseBE>("UP_CORREO_ELIMINAR", oParametros);
            }
            catch (Exception ex)
            {
                //Manejando Errores
                var error = ex.ToString();
                //Log.WhriteLogException(error, Constantes.strCapaDO, "UsuarioDO.ValidarInicio");
            }
            return oResponse;
        }


    }
}
