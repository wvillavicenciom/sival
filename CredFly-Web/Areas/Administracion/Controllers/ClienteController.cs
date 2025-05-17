using CredFly.Administracion.BE;
using CredFly.Administracion.SL;
using CredFly.Generico.BE;
using CredFly_Web.Areas.Administracion.Data;
using CredFly_Web.Controllers;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace CredFly_Web.Areas.Administracion.Controllers
{
    [Area("Administracion")]
    public class ClienteController : BaseController
    {

        public IActionResult BusquedaCliente()
        {
            return View();
        }

        public IActionResult RegistroCliente()
        {
            return View();
        }


        [HttpGet]
        public IActionResult ClienteListar(String pDocumento)
        {
            List<ClienteBE> oLista = new List<ClienteBE>();
            try
            {
                ClienteSL oClienteSL = new ClienteSL();
                //pUsuaio = HttpContext.User.Identity.Name;
                Int32 pEmpresa = 1;

                pDocumento = pDocumento == null ? "" : pDocumento;

                oLista = oClienteSL.Listar(pEmpresa, pDocumento);

            }
            catch (Exception ex)
            {
                //Manejando Errores
                var error = ex.ToString();
            }
            var response = JsonConvert.SerializeObject(oLista);
            return Content(response, "application/json");
        }

        [HttpGet]
        public IActionResult ClienteObtener(Decimal pIdCliente)
        {
            ClienteBE oLista = new ClienteBE();
            try
            {
                ClienteSL oClienteSL = new ClienteSL();
                //pUsuaio = HttpContext.User.Identity.Name;
                Int32 pEmpresa = 1;

                oLista = oClienteSL.Obtener(pEmpresa, pIdCliente);

            }
            catch (Exception ex)
            {
                //Manejando Errores
                var error = ex.ToString();
            }
            var response = JsonConvert.SerializeObject(oLista);
            return Content(response, "application/json");
        } 
        
        [HttpPost]
        public IActionResult GuardarCliente([FromBody] ClienteBE pClienteBE)
        {
            ResponseBE oResponseBE = new ResponseBE();

            ClienteSL oClienteSL = new ClienteSL();
            //pUsuaio = HttpContext.User.Identity.Name;
            Int32 pEmpresa = 1;

            ClienteBE oClienteBE = new ClienteBE();

            //oClienteBE.id_empresa = ObtenerCodigoEmpresa();
            //oClienteBE.usuario_creador = ObtenerIdUsuarioSesion();

            pClienteBE.id_empresa = ObtenerCodigoEmpresa();

            oResponseBE = oClienteSL.Guardar(pClienteBE);

            var response = JsonConvert.SerializeObject(oResponseBE);
            return Content(response, "application/json");
        }

        [HttpGet]
        public IActionResult ListarDeudasRCC(Int32 pTipoPersona, Int32 pTipoDocumento, String pDocumento)
        {
            List<RCCDeudaResumenBE> oLista = new List<RCCDeudaResumenBE>();
            try
            {
                ClienteSL oClienteSL = new ClienteSL();
                //pUsuaio = HttpContext.User.Identity.Name;
                Int32 pEmpresa = 1;

                oLista = oClienteSL.ListarDeudasRCC(pTipoPersona, pTipoDocumento, pDocumento);

            }
            catch (Exception ex)
            {
                //Manejando Errores
                var error = ex.ToString();
            }
            var response = JsonConvert.SerializeObject(oLista);
            return Content(response, "application/json");
        }




    }
}
