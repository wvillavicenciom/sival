using CredFly.Generico.BE;
using CredFly.Generico.SL;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace CredFly_Web.Areas.Seguridad.Controllers
{
    [Area("Seguridad")]
    public class GenericoController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public IActionResult EstadoRegistroCombo()
        {
            List<ComboBE> oLista = new List<ComboBE>();
            try
            {
                TablaGenericaSL oTablaGenericaSL = new TablaGenericaSL();
                //pUsuaio = HttpContext.User.Identity.Name;
                Int32 pEmpresa = 1;

                oLista = oTablaGenericaSL.ListarCombo(pEmpresa, (int)Enumerados.TablaDefinicion.EstadoRegistro);

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
        public IActionResult TipoUsuarioCombo()
        {
            List<ComboBE> oLista = new List<ComboBE>();
            try
            {
                TablaGenericaSL oTablaGenericaSL = new TablaGenericaSL();
                //pUsuaio = HttpContext.User.Identity.Name;
                Int32 pEmpresa = 1;

                oLista = oTablaGenericaSL.ListarCombo(pEmpresa, (int)Enumerados.TablaDefinicion.TipoUsuario);

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
        public IActionResult CategoriaLaboralCombo()
        {
            List<ComboBE> oLista = new List<ComboBE>();
            try
            {
                TablaGenericaSL oTablaGenericaSL = new TablaGenericaSL();
                //pUsuaio = HttpContext.User.Identity.Name;
                Int32 pEmpresa = 1;

                oLista = oTablaGenericaSL.ListarCombo(pEmpresa, (int)Enumerados.TablaDefinicion.CategoriaLaboral);

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
        public IActionResult ResultadoEvaluacionCombo()
        {
            List<ComboBE> oLista = new List<ComboBE>();
            try
            {
                TablaGenericaSL oTablaGenericaSL = new TablaGenericaSL();
                //pUsuaio = HttpContext.User.Identity.Name;
                Int32 pEmpresa = 1;

                oLista = oTablaGenericaSL.ListarCombo(pEmpresa, (int)Enumerados.TablaDefinicion.ResultadoEvaluacion);

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
        public IActionResult MotivoRechazoCombo()
        {
            List<ComboBE> oLista = new List<ComboBE>();
            try
            {
                TablaGenericaSL oTablaGenericaSL = new TablaGenericaSL();
                //pUsuaio = HttpContext.User.Identity.Name;
                Int32 pEmpresa = 1;

                oLista = oTablaGenericaSL.ListarCombo(pEmpresa, (int)Enumerados.TablaDefinicion.MotivoRechazo);

            }
            catch (Exception ex)
            {
                //Manejando Errores
                var error = ex.ToString();
            }
            var response = JsonConvert.SerializeObject(oLista);
            return Content(response, "application/json");
        }

        public IActionResult TipoProductoCombo()
        {
            List<ComboBE> oLista = new List<ComboBE>();
            try
            {
                TablaGenericaSL oTablaGenericaSL = new TablaGenericaSL();
                //pUsuaio = HttpContext.User.Identity.Name;
                Int32 pEmpresa = 1;

                oLista = oTablaGenericaSL.ListarCombo(pEmpresa, (int)Enumerados.TablaDefinicion.TipoProducto);

            }
            catch (Exception ex)
            {
                //Manejando Errores
                var error = ex.ToString();
            }
            var response = JsonConvert.SerializeObject(oLista);
            return Content(response, "application/json");
        }

        public IActionResult EtapaSolicitudCombo()
        {
            List<ComboBE> oLista = new List<ComboBE>();
            try
            {
                TablaGenericaSL oTablaGenericaSL = new TablaGenericaSL();
                //pUsuaio = HttpContext.User.Identity.Name;
                Int32 pEmpresa = 1;

                oLista = oTablaGenericaSL.ListarCombo(pEmpresa, (int)Enumerados.TablaDefinicion.EtapaSolicitud);

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

        [HttpGet]
        public IActionResult SeguroBienCombo()
        {
            List<ComboBE> oLista = new List<ComboBE>();
            try
            {
                TablaGenericaSL oTablaGenericaSL = new TablaGenericaSL();
                //pUsuaio = HttpContext.User.Identity.Name;
                Int32 pEmpresa = 1;

                oLista = oTablaGenericaSL.ListarCombo(pEmpresa, (int)Enumerados.TablaDefinicion.SeguroBien);

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
        public IActionResult PlazoVehicularCombo()
        {
            List<ComboBE> oLista = new List<ComboBE>();
            try
            {
                TablaGenericaSL oTablaGenericaSL = new TablaGenericaSL();
                //pUsuaio = HttpContext.User.Identity.Name;
                Int32 pEmpresa = 1;

                oLista = oTablaGenericaSL.ListarCombo(pEmpresa, (int)Enumerados.TablaDefinicion.PlazoVehicular);

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
        public IActionResult TipoDocumentoAdjuntoCombo()
        {
            List<ComboBE> oLista = new List<ComboBE>();
            try
            {
                TablaGenericaSL oTablaGenericaSL = new TablaGenericaSL();
                //pUsuaio = HttpContext.User.Identity.Name;
                Int32 pEmpresa = 1;

                oLista = oTablaGenericaSL.ListarCombo(pEmpresa, (int)Enumerados.TablaDefinicion.TipoDocumentoAdjunto);

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
