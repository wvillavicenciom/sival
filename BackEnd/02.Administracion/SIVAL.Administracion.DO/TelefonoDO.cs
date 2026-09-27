using SIVAL.AccesoDatos;
using SIVAL.Administracion.BE;
using SIVAL.Generico.BE;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;

namespace SIVAL.Administracion.DO
{
    public class TelefonoDO
    {
        public List<TelefonoBE> ListarPorCliente(Int32 pIdEmpresa, Decimal pIdCliente)
        {
            List<TelefonoBE> oLista = new List<TelefonoBE>();
            try
            {
                List<GParametrosBE> oParametros = new List<GParametrosBE>()
                {
                    new GParametrosBE() {pParName = "ID_EMPRESA", pValue = pIdEmpresa, pTypeSQLServer = DbType.Decimal},
                    new GParametrosBE() {pParName = "ID_CLIENTE", pValue = pIdCliente, pTypeSQLServer = DbType.Decimal},
                };

                ConexionDA conexionDA = new ConexionDA();
                oLista = conexionDA.ExecutePckTT<TelefonoBE>("UP_TELEFONO_LISTAR_POR_CLIENTE", oParametros);
            }
            catch (Exception ex)
            {
                //Manejando Errores
                var error = ex.ToString();
                //Log.WhriteLogException(error, Constantes.strCapaDO, "UsuarioDO.ValidarInicio");
            }
            return oLista;
        }

        public ResponseBE Registrar(TelefonoBE pTelefonoBE)
        {
            ResponseBE oResponse = new ResponseBE();
            try
            {
                List<GParametrosBE> oParametros = new List<GParametrosBE>()
                {
                    new GParametrosBE() {pParName = "ID_CLIENTE", pValue = pTelefonoBE.id_cliente, pTypeSQLServer = DbType.Decimal},
                    new GParametrosBE() {pParName = "I008_TIPO_TELEFONO", pValue = pTelefonoBE.i008_tipo_telefono, pTypeSQLServer = DbType.Int32},
                    new GParametrosBE() {pParName = "NUMERO", pValue = pTelefonoBE.numero, pTypeSQLServer = DbType.String},
                    new GParametrosBE() {pParName = "I007_OPERADOR", pValue = pTelefonoBE.i007_operador, pTypeSQLServer = DbType.Int32},
                    new GParametrosBE() {pParName = "COMENTARIO", pValue = pTelefonoBE.comentario, pTypeSQLServer = DbType.String},
                    new GParametrosBE() {pParName = "ACTIVO", pValue = pTelefonoBE.activo, pTypeSQLServer = DbType.Boolean},
                    new GParametrosBE() {pParName = "USUARIO_CREADOR", pValue = pTelefonoBE.usuario_creador, pTypeSQLServer = DbType.Decimal},

                };

                ConexionDA conexionDA = new ConexionDA();
                oResponse = conexionDA.ExecutePckT<ResponseBE>("UP_TELEFONO_REGISTRAR", oParametros);
            }
            catch (Exception ex)
            {
                //Manejando Errores
                var error = ex.ToString();
                //Log.WhriteLogException(error, Constantes.strCapaDO, "UsuarioDO.ValidarInicio");
            }
            return oResponse;
        }

        public ResponseBE Actualizar(TelefonoBE pTelefonoBE)
        {
            ResponseBE oResponse = new ResponseBE();
            try
            {
                List<GParametrosBE> oParametros = new List<GParametrosBE>()
                {
                    new GParametrosBE() {pParName = "ID_TELEFONO", pValue = pTelefonoBE.id_telefono, pTypeSQLServer = DbType.Decimal},
                    new GParametrosBE() {pParName = "ID_CLIENTE", pValue = pTelefonoBE.id_cliente, pTypeSQLServer = DbType.Decimal},
                    new GParametrosBE() {pParName = "I008_TIPO_TELEFONO", pValue = pTelefonoBE.i008_tipo_telefono, pTypeSQLServer = DbType.Int32},
                    new GParametrosBE() {pParName = "NUMERO", pValue = pTelefonoBE.numero, pTypeSQLServer = DbType.String},
                    new GParametrosBE() {pParName = "I007_OPERADOR", pValue = pTelefonoBE.i007_operador, pTypeSQLServer = DbType.Int32},
                    new GParametrosBE() {pParName = "COMENTARIO", pValue = pTelefonoBE.comentario, pTypeSQLServer = DbType.String},
                    new GParametrosBE() {pParName = "ACTIVO", pValue = pTelefonoBE.activo, pTypeSQLServer = DbType.Boolean},
                    new GParametrosBE() {pParName = "USUARIO_MODIFICADOR", pValue = pTelefonoBE.usuario_modificador, pTypeSQLServer = DbType.Decimal},

                };

                ConexionDA conexionDA = new ConexionDA();
                oResponse = conexionDA.ExecutePckT<ResponseBE>("UP_TELEFONO_ACTUALIZAR", oParametros);
            }
            catch (Exception ex)
            {
                //Manejando Errores
                var error = ex.ToString();
                //Log.WhriteLogException(error, Constantes.strCapaDO, "UsuarioDO.ValidarInicio");
            }
            return oResponse;
        }

        public ResponseBE Eliminar(TelefonoBE pTelefonoBE)
        {
            ResponseBE oResponse = new ResponseBE();
            try
            {
                List<GParametrosBE> oParametros = new List<GParametrosBE>()
                {
                    new GParametrosBE() {pParName = "ID_TELEFONO", pValue = pTelefonoBE.id_telefono, pTypeSQLServer = DbType.Decimal},
                    new GParametrosBE() {pParName = "USUARIO_ELIMINADOR", pValue = pTelefonoBE.usuario_eliminador, pTypeSQLServer = DbType.Decimal},

                };

                ConexionDA conexionDA = new ConexionDA();
                oResponse = conexionDA.ExecutePckT<ResponseBE>("UP_TELEFONO_ELIMINAR", oParametros);
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
