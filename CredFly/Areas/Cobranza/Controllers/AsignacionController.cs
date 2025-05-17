using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace CollFly.Areas.Cobranza.Controllers
{
    public class AsignacionController : Controller
    {
        public IActionResult Busqueda()
        {
            return View();
        }
    }
}