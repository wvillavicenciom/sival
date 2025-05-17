using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CollFly.Generico.BE;
using CollFly.Generico.SL;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace CollFly.Areas.Seguridad.Controllers
{
    public class GenericoController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }


        [HttpGet]
        public IActionResult TipoDocumentoCombo()
        {
            List<ComboBE> oLista = new List<ComboBE>();
            try
            {
                TablaGenericaSL oTablaGenericaSL = new TablaGenericaSL();
                //pUsuaio = HttpContext.User.Identity.Name;
                Int32 pEmpresa = 1;
                
                oLista = oTablaGenericaSL.ListarCombo(pEmpresa, (int)Enumerados.TablaDefinicion.TipoDocumento);

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
        public IActionResult GeneroCombo()
        {
            List<ComboBE> oLista = new List<ComboBE>();
            try
            {
                TablaGenericaSL oTablaGenericaSL = new TablaGenericaSL();
                //pUsuaio = HttpContext.User.Identity.Name;
                Int32 pEmpresa = 1;

                oLista = oTablaGenericaSL.ListarCombo(pEmpresa, (int)Enumerados.TablaDefinicion.Genero);

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
        public IActionResult EstadoCivilCombo()
        {
            List<ComboBE> oLista = new List<ComboBE>();
            try
            {
                TablaGenericaSL oTablaGenericaSL = new TablaGenericaSL();
                //pUsuaio = HttpContext.User.Identity.Name;
                Int32 pEmpresa = 1;

                oLista = oTablaGenericaSL.ListarCombo(pEmpresa, (int)Enumerados.TablaDefinicion.EstadoCivil);

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
        public IActionResult DepartamentoCombo()
        {
            List<ComboSBE> oLista = new List<ComboSBE>();
            try
            {
                UbigeoSL oUbigeoSL = new UbigeoSL();
                //pUsuaio = HttpContext.User.Identity.Name;
                String pEmpresa = "1";

                oLista = oUbigeoSL.ListarDepartamentoCombo(pEmpresa);

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
        public IActionResult ProvinciaCombo(String pIdDepartamento)
        {
            List<ComboSBE> oLista = new List<ComboSBE>();
            try
            {
                UbigeoSL oUbigeoSL = new UbigeoSL();
                //pUsuaio = HttpContext.User.Identity.Name;
                String pEmpresa = "1";

                oLista = oUbigeoSL.ListarProvinciaCombo(pIdDepartamento);

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
        public IActionResult DistritoCombo(String pIdDepartamento, String pIdProvincia)
        {
            List<ComboSBE> oLista = new List<ComboSBE>();
            try
            {
                UbigeoSL oUbigeoSL = new UbigeoSL();
                //pUsuaio = HttpContext.User.Identity.Name;
                String pEmpresa = "1";

                oLista = oUbigeoSL.ListarDistritoCombo(pIdDepartamento, pIdProvincia);

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