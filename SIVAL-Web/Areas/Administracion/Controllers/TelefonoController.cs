using SIVAL.Administracion.BE;
using SIVAL.Administracion.SL;
using SIVAL.Generico.BE;
using SIVAL_Web.Controllers;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace SIVAL_Web.Areas.Administracion.Controllers
{
    [Area("Administracion")]
    public class TelefonoController : BaseController
    {
        [HttpGet]
        public IActionResult ListarPorCliente(Decimal pIdCliente)
        {
            List<TelefonoBE> oLista = new List<TelefonoBE>();
            try
            {
                TelefonoSL oTelefonoSL = new TelefonoSL();
                //pUsuaio = HttpContext.User.Identity.Name;
                Int32 pEmpresa = 1;

                oLista = oTelefonoSL.ListarPorCliente(pEmpresa, pIdCliente);

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
        public IActionResult Registrar([FromBody] TelefonoBE pTelefonoBE)
        {
            ResponseBE oResponseBE = new ResponseBE();
            try
            {
                TelefonoSL oTelefonoSL = new TelefonoSL();

                pTelefonoBE.usuario_creador = ObtenerIdUsuarioSesion();

                oResponseBE = oTelefonoSL.Registrar(pTelefonoBE);

            }
            catch (Exception ex)
            {
                //Manejando Errores
                var error = ex.ToString();
            }
            var response = JsonConvert.SerializeObject(oResponseBE);
            return Content(response, "application/json");
        }

        [HttpPost]
        public IActionResult Actualizar([FromBody] TelefonoBE pTelefonoBE)
        {
            ResponseBE oResponseBE = new ResponseBE();
            try
            {
                TelefonoSL oTelefonoSL = new TelefonoSL();

                pTelefonoBE.usuario_modificador = ObtenerIdUsuarioSesion();

                oResponseBE = oTelefonoSL.Actualizar(pTelefonoBE);

            }
            catch (Exception ex)
            {
                //Manejando Errores
                var error = ex.ToString();
            }
            var response = JsonConvert.SerializeObject(oResponseBE);
            return Content(response, "application/json");
        }

        [HttpPost]
        public IActionResult Eliminar([FromBody] TelefonoBE pTelefonoBE)
        {
            ResponseBE oResponseBE = new ResponseBE();
            try
            {
                TelefonoSL oTelefonoSL = new TelefonoSL();

                //TelefonoBE oTelefonoBE = new TelefonoBE();

                //oTelefonoBE.id_telefono = pIdTelefono;
                //oTelefonoBE.id_cliente = pIdCliente;
                //oTelefonoBE.usuario_eliminador = ObtenerIdUsuarioSesion();
                pTelefonoBE.usuario_eliminador = ObtenerIdUsuarioSesion();

                oResponseBE = oTelefonoSL.Eliminar(pTelefonoBE);

            }
            catch (Exception ex)
            {
                //Manejando Errores
                var error = ex.ToString();
            }
            var response = JsonConvert.SerializeObject(oResponseBE);
            return Content(response, "application/json");
        }

    }
}
