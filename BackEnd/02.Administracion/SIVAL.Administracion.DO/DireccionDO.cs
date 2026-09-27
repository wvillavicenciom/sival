using SIVAL.AccesoDatos;
using SIVAL.Administracion.BE;
using SIVAL.Generico.BE;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;

namespace SIVAL.Administracion.DO
{
    public class DireccionDO
    {
        public List<DireccionBE> ListarPorCliente(Int32 pIdEmpresa, Decimal pIdCliente)
        {
            List<DireccionBE> oLista = new List<DireccionBE>();
            try
            {
                List<GParametrosBE> oParametros = new List<GParametrosBE>()
                {
                    new GParametrosBE() {pParName = "ID_EMPRESA", pValue = pIdEmpresa, pTypeSQLServer = DbType.Decimal},
                    new GParametrosBE() {pParName = "ID_CLIENTE", pValue = pIdCliente, pTypeSQLServer = DbType.Decimal},
                };

                ConexionDA conexionDA = new ConexionDA();
                oLista = conexionDA.ExecutePckTT<DireccionBE>("UP_DIRECCION_LISTAR_POR_CLIENTE", oParametros);
            }
            catch (Exception ex)
            {
                //Manejando Errores
                var error = ex.ToString();
                //Log.WhriteLogException(error, Constantes.strCapaDO, "UsuarioDO.ValidarInicio");
            }
            return oLista;
        }

        public ResponseBE Registrar(DireccionBE pDireccionBE)
        {
            ResponseBE oResponse = new ResponseBE();
            try
            {
                List<GParametrosBE> oParametros = new List<GParametrosBE>()
                {
                    new GParametrosBE() {pParName = "ID_CLIENTE", pValue = pDireccionBE.id_cliente, pTypeSQLServer = DbType.Decimal},
                    new GParametrosBE() {pParName = "I010_TIPO_DIRECCION", pValue = pDireccionBE.i010_tipo_direccion, pTypeSQLServer = DbType.Int32},
                    new GParametrosBE() {pParName = "DIRECCION", pValue = pDireccionBE.direccion, pTypeSQLServer = DbType.String},
                    new GParametrosBE() {pParName = "REFERENCIA", pValue = pDireccionBE.referencia, pTypeSQLServer = DbType.String},
                    new GParametrosBE() {pParName = "COMENTARIO", pValue = pDireccionBE.comentario, pTypeSQLServer = DbType.String},
                    new GParametrosBE() {pParName = "ID_DEPARTAMENTO", pValue = pDireccionBE.id_departamento, pTypeSQLServer = DbType.String},
                    new GParametrosBE() {pParName = "ID_PROVINCIA", pValue = pDireccionBE.id_provincia, pTypeSQLServer = DbType.String},
                    new GParametrosBE() {pParName = "ID_DISTRITO", pValue = pDireccionBE.id_distrito, pTypeSQLServer = DbType.String},
                    new GParametrosBE() {pParName = "ACTIVO", pValue = pDireccionBE.activo, pTypeSQLServer = DbType.Boolean},
                    new GParametrosBE() {pParName = "USUARIO_CREADOR", pValue = pDireccionBE.usuario_creador, pTypeSQLServer = DbType.Decimal},

                };

                ConexionDA conexionDA = new ConexionDA();
                oResponse = conexionDA.ExecutePckT<ResponseBE>("UP_DIRECCION_REGISTRAR", oParametros);
            }
            catch (Exception ex)
            {
                //Manejando Errores
                var error = ex.ToString();
                //Log.WhriteLogException(error, Constantes.strCapaDO, "UsuarioDO.ValidarInicio");
            }
            return oResponse;
        }

        public ResponseBE Actualizar(DireccionBE pDireccionBE)
        {
            ResponseBE oResponse = new ResponseBE();
            try
            {
                List<GParametrosBE> oParametros = new List<GParametrosBE>()
                {
                    new GParametrosBE() {pParName = "ID_DIRECCION", pValue = pDireccionBE.id_direccion, pTypeSQLServer = DbType.Decimal},
                    new GParametrosBE() {pParName = "ID_CLIENTE", pValue = pDireccionBE.id_cliente, pTypeSQLServer = DbType.Decimal},
                    new GParametrosBE() {pParName = "I010_TIPO_DIRECCION", pValue = pDireccionBE.i010_tipo_direccion, pTypeSQLServer = DbType.Int32},
                    new GParametrosBE() {pParName = "DIRECCION", pValue = pDireccionBE.direccion, pTypeSQLServer = DbType.String},
                    new GParametrosBE() {pParName = "REFERENCIA", pValue = pDireccionBE.referencia, pTypeSQLServer = DbType.String},
                    new GParametrosBE() {pParName = "COMENTARIO", pValue = pDireccionBE.comentario, pTypeSQLServer = DbType.String},
                    new GParametrosBE() {pParName = "ID_DEPARTAMENTO", pValue = pDireccionBE.id_departamento, pTypeSQLServer = DbType.String},
                    new GParametrosBE() {pParName = "ID_PROVINCIA", pValue = pDireccionBE.id_provincia, pTypeSQLServer = DbType.String},
                    new GParametrosBE() {pParName = "ID_DISTRITO", pValue = pDireccionBE.id_distrito, pTypeSQLServer = DbType.String},
                    new GParametrosBE() {pParName = "ACTIVO", pValue = pDireccionBE.activo, pTypeSQLServer = DbType.Boolean},
                    new GParametrosBE() {pParName = "USUARIO_MODIFICADOR", pValue = pDireccionBE.usuario_modificador, pTypeSQLServer = DbType.Decimal},

                };

                ConexionDA conexionDA = new ConexionDA();
                oResponse = conexionDA.ExecutePckT<ResponseBE>("UP_DIRECCION_ACTUALIZAR", oParametros);
            }
            catch (Exception ex)
            {
                //Manejando Errores
                var error = ex.ToString();
                //Log.WhriteLogException(error, Constantes.strCapaDO, "UsuarioDO.ValidarInicio");
            }
            return oResponse;
        }

        public ResponseBE Eliminar(DireccionBE pDireccionBE)
        {
            ResponseBE oResponse = new ResponseBE();
            try
            {
                List<GParametrosBE> oParametros = new List<GParametrosBE>()
                {
                    new GParametrosBE() {pParName = "ID_DIRECCION", pValue = pDireccionBE.id_direccion, pTypeSQLServer = DbType.Decimal},
                    new GParametrosBE() {pParName = "USUARIO_ELIMINADOR", pValue = pDireccionBE.usuario_eliminador, pTypeSQLServer = DbType.Decimal},

                };

                ConexionDA conexionDA = new ConexionDA();
                oResponse = conexionDA.ExecutePckT<ResponseBE>("UP_DIRECCION_ELIMINAR", oParametros);
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
