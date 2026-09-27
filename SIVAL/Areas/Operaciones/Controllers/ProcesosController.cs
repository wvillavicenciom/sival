using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace CollFly.Areas.Operaciones.Controllers
{
    public class ProcesosController : Controller
    {
        public IActionResult CargaMasiva()
        {
            return View();
        }

        public IActionResult CargaCliente()
        {
            return View();
        }

        public IActionResult CargaContrato()
        {
            return View();
        }

        public IActionResult CargaCronograma()
        {
            return View();
        }
    }
}