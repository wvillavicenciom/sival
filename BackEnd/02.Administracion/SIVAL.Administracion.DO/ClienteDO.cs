using SIVAL.AccesoDatos;
using SIVAL.Administracion.BE;
using SIVAL.Generico.BE;
using System;
using System.Collections.Generic;
using System.Data;

namespace SIVAL.Administracion.DO
{
    public class ClienteDO
    {
        public List<ClienteBE> Listar(Int32 pIdEmpresa, String pDocumento)
        {
            List<ClienteBE> oLista = new List<ClienteBE>();
            try
            {
                List<GParametrosBE> oParametros = new List<GParametrosBE>()
                {
                    new GParametrosBE() {pParName = "ID_EMPRESA", pValue = pIdEmpresa, pTypeSQLServer = DbType.Int32},
                    new GParametrosBE() {pParName = "DOCUMENTO", pValue = pDocumento, pTypeSQLServer = DbType.String},
                };

                ConexionDA conexionDA = new ConexionDA();
                oLista = conexionDA.ExecutePckTT<ClienteBE>("UP_CLIENTE_LISTAR", oParametros);
            }
            catch (Exception ex)
            {
                //Manejando Errores
                var error = ex.ToString();
                //Log.WhriteLogException(error, Constantes.strCapaDO, "UsuarioDO.ValidarInicio");
            }
            return oLista;
        }

        public ClienteBE Obtener(Int32 pIdEmpresa, Decimal pIdCliente)
        {
            ClienteBE oLista = new ClienteBE();
            try
            {
                List<GParametrosBE> oParametros = new List<GParametrosBE>()
                {
                    new GParametrosBE() {pParName = "ID_EMPRESA", pValue = pIdEmpresa, pTypeSQLServer = DbType.Int32},
                    new GParametrosBE() {pParName = "ID_CLIENTE", pValue = pIdCliente, pTypeSQLServer = DbType.Decimal}
                };

                ConexionDA conexionDA = new ConexionDA();
                oLista = conexionDA.ExecutePckT<ClienteBE>("UP_CLIENTE_OBTENER", oParametros);
            }
            catch (Exception ex)
            {
                //Manejando Errores
                var error = ex.ToString();
                //Log.WhriteLogException(error, Constantes.strCapaDO, "UsuarioDO.ValidarInicio");
            }
            return oLista;
        }

        public ResponseBE Guardar(ClienteBE pCliente)
        {
            ResponseBE oResponseBE = new ResponseBE();
            try
            {
                List<GParametrosBE> oParametros = new List<GParametrosBE>()
                {
                    new GParametrosBE() {pParName = "ID_EMPRESA", pValue = pCliente.id_empresa, pTypeSQLServer = DbType.Decimal},
                    new GParametrosBE() {pParName = "ID_CLIENTE", pValue = pCliente.id_cliente, pTypeSQLServer = DbType.Decimal},
                    new GParametrosBE() {pParName = "I002_TIPO_DOCUMENTO", pValue = pCliente.i002_tipo_documento, pTypeSQLServer = DbType.Decimal},
                    new GParametrosBE() {pParName = "DOCUMENTO", pValue = pCliente.documento, pTypeSQLServer = DbType.String},
                    new GParametrosBE() {pParName = "APELLIDO_PATERNO", pValue = pCliente.apellido_paterno, pTypeSQLServer = DbType.String},
                    new GParametrosBE() {pParName = "APELLIDO_MATERNO", pValue = pCliente.apellido_materno, pTypeSQLServer = DbType.String},
                    new GParametrosBE() {pParName = "NOMBRES", pValue = pCliente.nombres, pTypeSQLServer = DbType.String},
                    new GParametrosBE() {pParName = "FECHA_NACIMIENTO", pParValueDateTime = pCliente.fecha_nacimiento, pTypeSQLServer = DbType.Date},
                    new GParametrosBE() {pParName = "I011_GENERO", pValue = pCliente.i011_genero, pTypeSQLServer = DbType.Int32},
                    new GParametrosBE() {pParName = "I012_ESTADO_CIVIL", pValue = pCliente.i012_estado_civil, pTypeSQLServer = DbType.Int32},
                    new GParametrosBE() {pParName = "TELEFONO", pValue = pCliente.telefono, pTypeSQLServer = DbType.String},
                    new GParametrosBE() {pParName = "CORREO", pValue = pCliente.correo, pTypeSQLServer = DbType.String},
                    new GParametrosBE() {pParName = "DIRECCION", pValue = pCliente.direccion, pTypeSQLServer = DbType.String},
                    new GParametrosBE() {pParName = "ID_DEPARTAMENTO", pValue = pCliente.id_departamento, pTypeSQLServer = DbType.Int32},
                    new GParametrosBE() {pParName = "ID_PROVINCIA", pValue = pCliente.id_provincia, pTypeSQLServer = DbType.Int32},
                    new GParametrosBE() {pParName = "ID_DISTRITO", pValue = pCliente.id_distrito, pTypeSQLServer = DbType.Int32},
                    new GParametrosBE() {pParName = "USUARIO_CREADOR", pValue = pCliente.usuario_creador, pTypeSQLServer = DbType.Int32}
                };

                ConexionDA conexionDA = new ConexionDA();
                oResponseBE = conexionDA.ExecutePckT<ResponseBE>("UP_CLIENTE_GUARDAR", oParametros);
            }
            catch (Exception ex)
            {
                //Manejando Errores
                var error = ex.ToString();
                //Log.WhriteLogException(error, Constantes.strCapaDO, "UsuarioDO.ValidarInicio");
            }
            return oResponseBE;
        }

        public List<RCCDeudaResumenBE> ListarDeudasRCC(Int32 pTipoPersona, Int32 pTipoDocumento, String pDocumento)
        {
            List<RCCDeudaResumenBE> oLista = new List<RCCDeudaResumenBE>();
            try
            {
                List<GParametrosBE> oParametros = new List<GParametrosBE>()
                {
                    new GParametrosBE() {pParName = "TIPO_PERSONA", pValue = pTipoPersona, pTypeSQLServer = DbType.Int32},
                    new GParametrosBE() {pParName = "TIPO_DOCUMENTO", pValue = pTipoDocumento, pTypeSQLServer = DbType.Int32},
                    new GParametrosBE() {pParName = "DOCUMENTO", pValue = pDocumento, pTypeSQLServer = DbType.String},
                };

                ConexionDA conexionDA = new ConexionDA();
                oLista = conexionDA.ExecutePckTT<RCCDeudaResumenBE>("UP_RCC_DEUDAS_LISTAR", oParametros);
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
