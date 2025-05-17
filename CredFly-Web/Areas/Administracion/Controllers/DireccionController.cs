using CredFly.Administracion.BE;
using CredFly.Administracion.SL;
using CredFly.Generico.BE;
using CredFly_Web.Controllers;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace CredFly_Web.Areas.Administracion.Controllers
{
    [Area("Administracion")]
    public class DireccionController : BaseController
    {

        [HttpGet]
        public IActionResult ListarPorCliente(Decimal pIdCliente)
        {
            List<DireccionBE> oLista = new List<DireccionBE>();
            try
            {
                DireccionSL oDireccionSL = new DireccionSL();
                //pUsuaio = HttpContext.User.Identity.Name;
                Int32 pEmpresa = 1;

                oLista = oDireccionSL.ListarPorCliente(pEmpresa, pIdCliente);

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
        public IActionResult Registrar([FromBody] DireccionBE pDireccionBE)
        {
            ResponseBE oResponseBE = new ResponseBE();
            try
            {
                DireccionSL oDireccionSL = new DireccionSL();

                pDireccionBE.usuario_creador = ObtenerIdUsuarioSesion();

                oResponseBE = oDireccionSL.Registrar(pDireccionBE);

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
        public IActionResult Actualizar([FromBody] DireccionBE pDireccionBE)
        {
            ResponseBE oResponseBE = new ResponseBE();
            try
            {
                DireccionSL oDireccionSL = new DireccionSL();

                pDireccionBE.usuario_modificador = ObtenerIdUsuarioSesion();

                oResponseBE = oDireccionSL.Actualizar(pDireccionBE);

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
        public IActionResult Eliminar([FromBody] DireccionBE pDireccionBE)
        {
            ResponseBE oResponseBE = new ResponseBE();
            try
            {
                DireccionSL oDireccionSL = new DireccionSL();

                //DireccionBE oDireccionBE = new DireccionBE();

                //oDireccionBE.id_telefono = pIdDireccion;
                //oDireccionBE.id_cliente = pIdCliente;
                //oDireccionBE.usuario_eliminador = ObtenerIdUsuarioSesion();
                pDireccionBE.usuario_eliminador = ObtenerIdUsuarioSesion();

                oResponseBE = oDireccionSL.Eliminar(pDireccionBE);

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
