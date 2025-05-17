using Microsoft.AspNetCore.Mvc;

namespace CredFly_Web.Areas.Seguridad.Controllers
{
    [Area("Seguridad")]
    public class ConfiguracionController : Controller
    {
        public IActionResult Preventiva()
        {
            return View();
        }

        public IActionResult Cobranza()
        {
            return View();
        }

        public IActionResult Pagos()
        {
            return View();
        }

        public IActionResult Alertas()
        {
            return View();
        }

        public IActionResult MensajeTexto()
        {
            return View();
        }

        public IActionResult Whatsapp()
        {
            return View();
        }

        public IActionResult CorreoElectronico()
        {
            return View();
        }
    }
}
