using SIVAL.Administracion.BE;
using SIVAL.Administracion.SL;
using SIVAL.Generico.BE;
using SIVAL_Web.Controllers;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace SIVAL_Web.Areas.Administracion.Controllers
{
    [Area("Administracion")]
    public class CorreoController : BaseController
    {
        [HttpGet]
        public IActionResult ListarPorCliente(Decimal pIdCliente)
        {
            List<CorreoBE> oLista = new List<CorreoBE>();
            try
            {
                CorreoSL oCorreoSL = new CorreoSL();
                //pUsuaio = HttpContext.User.Identity.Name;
                Int32 pEmpresa = 1;

                oLista = oCorreoSL.ListarPorCliente(pEmpresa, pIdCliente);

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
        public IActionResult Registrar([FromBody] CorreoBE pCorreoBE)
        {
            ResponseBE oResponseBE = new ResponseBE();
            try
            {
                CorreoSL oCorreoSL = new CorreoSL();

                pCorreoBE.usuario_creador = ObtenerIdUsuarioSesion();

                oResponseBE = oCorreoSL.Registrar(pCorreoBE);

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
        public IActionResult Actualizar([FromBody] CorreoBE pCorreoBE)
        {
            ResponseBE oResponseBE = new ResponseBE();
            try
            {
                CorreoSL oCorreoSL = new CorreoSL();

                pCorreoBE.usuario_modificador = ObtenerIdUsuarioSesion();

                oResponseBE = oCorreoSL.Actualizar(pCorreoBE);

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
        public IActionResult Eliminar([FromBody] CorreoBE pCorreoBE)
        {
            ResponseBE oResponseBE = new ResponseBE();
            try
            {
                CorreoSL oCorreoSL = new CorreoSL();

                //CorreoBE oCorreoBE = new CorreoBE();

                //oCorreoBE.id_telefono = pIdCorreo;
                //oCorreoBE.id_cliente = pIdCliente;
                //oCorreoBE.usuario_eliminador = ObtenerIdUsuarioSesion();
                pCorreoBE.usuario_eliminador = ObtenerIdUsuarioSesion();

                oResponseBE = oCorreoSL.Eliminar(pCorreoBE);

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
