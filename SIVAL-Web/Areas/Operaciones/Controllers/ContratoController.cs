using Microsoft.AspNetCore.Mvc;


namespace SIVAL_Web.Areas.Operaciones.Controllers
{
    [Area("Operaciones")]
    public class ContratoController : Controller
    {
        public IActionResult Busqueda()
        {
            return View();
        }


        public IActionResult RegistroOperacion()
        {
            return View();
        }

    }
}
