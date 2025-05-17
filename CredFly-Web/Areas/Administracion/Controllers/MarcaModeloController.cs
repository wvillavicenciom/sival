using CredFly.Administracion.SL;
using CredFly.Generico.BE;
using CredFly.Generico.SL;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace CredFly_Web.Areas.Administracion.Controllers
{
    [Area("Administracion")]
    public class MarcaModeloController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }


        [HttpGet]
        public IActionResult ListarMarcaCombo()
        {
            List<ComboBE> oLista = new List<ComboBE>();
            try
            {
                MarcaSL oMarcaSL = new MarcaSL();
                //pUsuaio = HttpContext.User.Identity.Name;

                oLista = oMarcaSL.ListarCombo();

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
        public IActionResult ListarModeloCombo( Int32 pIdMarca)
        {
            List<ComboBE> oLista = new List<ComboBE>();
            try
            {
                ModeloSL oModeloSL = new ModeloSL();
                //pUsuaio = HttpContext.User.Identity.Name;
                Int32 pEmpresa = 1;

                oLista = oModeloSL.ListarCombo(pIdMarca);

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
