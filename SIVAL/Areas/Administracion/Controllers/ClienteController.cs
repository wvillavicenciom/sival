using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CollFly.Administracion.BE;
using CollFly.Administracion.SL;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace CollFly.Areas.Administracion.Controllers
{
    public class ClienteController : Controller
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

        [HttpGet]
        public IActionResult TelefonoListar(Decimal pIdCliente)
        {
            List<TelefonoBE> oLista = new List<TelefonoBE>();
            try
            {
                TelefonoSL oTelefonoSL= new TelefonoSL();
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

        [HttpGet]
        public IActionResult DireccionListar(Decimal pIdCliente)
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

        [HttpGet]
        public IActionResult CorreoListar(Decimal pIdCliente)
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


    }
}