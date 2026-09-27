using Microsoft.AspNetCore.Mvc;

namespace SIVAL_Web.Areas.Admision.Controllers
{
    [Area("Admision")]
    public class MesaCreditoController : Controller
    {
        public IActionResult Busqueda()
        {
            return View();
        }

        public IActionResult Bandeja()
        {
            return View();
        }
    }
}
