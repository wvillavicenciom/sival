using CredFly.Generico.BE;
using CredFly.Seguridad.BE;
using CredFly.Seguridad.SL;
using CredFly_Web.Areas.Seguridad.Data;
using CredFly_Web.Controllers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace CredFly_Web.Areas.Seguridad.Controllers
{
    [Area("Seguridad")]
    public class UsuarioController : BaseController
    {        
        public ActionResult Login()
        {
            return View();
        }
 
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Busqueda()
        {
            return View();
        }

        public IActionResult MiPerfil()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Registrar([FromBody] UsuarioRQ pUsuarioRQ)
        {
            ResponseBE oResponseBE = new ResponseBE();
            try
            {
                UsuarioBE oUsuarioBE = new UsuarioBE();
                UsuarioSL oUsuarioSL = new UsuarioSL();

                String pUsuario = HttpContext.Session.GetString("UserName");

                oUsuarioBE.i002_tipo_documento = pUsuarioRQ.id_tipo_documento;
                oUsuarioBE.documento = pUsuarioRQ.documento;
                oUsuarioBE.nombres = pUsuarioRQ.nombres;
                oUsuarioBE.apellido_paterno = pUsuarioRQ.apellido_paterno;
                oUsuarioBE.apellido_materno = pUsuarioRQ.apellido_materno;
                oUsuarioBE.usuario = pUsuarioRQ.usuario;
                oUsuarioBE.clave = pUsuarioRQ.clave;
                oUsuarioBE.i009_tipo_usuario = pUsuarioRQ.id_tipo_usuario;
                oUsuarioBE.flag_administrador = pUsuarioRQ.flag_administrador;
                oUsuarioBE.flag_activo = pUsuarioRQ.flag_activo;
                oUsuarioBE.usuario_creacion = pUsuario;

                oResponseBE = oUsuarioSL.Registrar(oUsuarioBE);

            }
            catch (Exception ex)
            {
                //Manejando Errores
                var error = ex.ToString();
                oResponseBE.st = 0;
                oResponseBE.msg = "Error al Registrar el usuario";
            }
            var response = JsonConvert.SerializeObject(oResponseBE);
            return Content(response, "application/json");
        }

        [HttpPost]
        public IActionResult Actualizar([FromBody] UsuarioRQ pUsuarioRQ)
        {
            ResponseBE oResponseBE = new ResponseBE();
            try
            {
                UsuarioBE oUsuarioBE = new UsuarioBE();
                UsuarioSL oUsuarioSL = new UsuarioSL();

                String pUsuario = HttpContext.Session.GetString("UserName");

                oUsuarioBE.id_usuario = pUsuarioRQ.id_usuario;
                oUsuarioBE.i002_tipo_documento = pUsuarioRQ.id_tipo_documento;
                oUsuarioBE.documento = pUsuarioRQ.documento;
                oUsuarioBE.nombres = pUsuarioRQ.nombres;
                oUsuarioBE.apellido_paterno = pUsuarioRQ.apellido_paterno;
                oUsuarioBE.apellido_materno = pUsuarioRQ.apellido_materno;
                oUsuarioBE.i009_tipo_usuario = pUsuarioRQ.id_tipo_usuario;
                oUsuarioBE.usuario = pUsuarioRQ.usuario;
                //oUsuarioBE.clave = pUsuarioRQ.clave;
                oUsuarioBE.flag_administrador = pUsuarioRQ.flag_administrador;
                oUsuarioBE.flag_activo = pUsuarioRQ.flag_activo;
                oUsuarioBE.usuario_modificacion = pUsuario;

                oResponseBE = oUsuarioSL.Actualizar(oUsuarioBE);

            }
            catch (Exception ex)
            {
                //Manejando Errores
                var error = ex.ToString();
                oResponseBE.st = 0;
                oResponseBE.msg = "Error al Actualizar el usuario";

            }
            var response = JsonConvert.SerializeObject(oResponseBE);
            return Content(response, "application/json");
        }

        [HttpPost]
        public IActionResult Eliminar([FromBody] UsuarioRQ pUsuarioRQ)
        {
            ResponseBE oResponseBE = new ResponseBE();
            try
            {
                UsuarioBE oUsuarioBE = new UsuarioBE();
                UsuarioSL oUsuarioSL = new UsuarioSL();

                String pUsuario = HttpContext.Session.GetString("UserName");

                oUsuarioBE.id_usuario = pUsuarioRQ.id_usuario;
                oUsuarioBE.usuario_eliminacion = pUsuario;

                oResponseBE = oUsuarioSL.Eliminar(oUsuarioBE);

            }
            catch (Exception ex)
            {
                //Manejando Errores
                var error = ex.ToString();
                oResponseBE.st = 0;
                oResponseBE.msg = "Error al Actualizar el usuario";

            }
            var response = JsonConvert.SerializeObject(oResponseBE);
            return Content(response, "application/json");
        }


        [HttpGet]
        public IActionResult ValidarInicio(String pUsuario, String pClave)
        {
            ResponseBE oResponseBE = new ResponseBE();
            try
            {
                UsuarioSL oUsuarioSL = new UsuarioSL();
                //pUsuaio = HttpContext.User.Identity.Name;
                oResponseBE = oUsuarioSL.ValidarInicio(pUsuario, pClave);

                if (oResponseBE.st == 1)
                {
                    HttpContext.Session.SetString("UserName", pUsuario);
                    HttpContext.Session.SetString("IdUsuario", oResponseBE.dato_a);
                    HttpContext.Session.SetString("TipoPerfil", oResponseBE.dato_b);
                }               

            }
            catch (Exception ex)
            {
                //Manejando Errores
                var error = ex.ToString();
                oResponseBE = new ResponseBE();
                oResponseBE.st = 0;
                oResponseBE.msg = "Error al iniciar Sessión";
                oResponseBE.dato = ex.ToString();
            }
            var response = JsonConvert.SerializeObject(oResponseBE);
            return Content(response, "application/json");
        }

        [HttpPost]
        public IActionResult ObtnerPerfil()
        {
            ResponseBE oResponseBE = new ResponseBE();
            try
            {

                oResponseBE.st = 1;
                oResponseBE.dato = HttpContext.Session.GetString("UserName");
                oResponseBE.dato_a = HttpContext.Session.GetString("IdUsuario");
                oResponseBE.dato_b = HttpContext.Session.GetString("TipoPerfil");

            }
            catch (Exception ex)
            {
                //Manejando Errores
                var error = ex.ToString();
                oResponseBE = new ResponseBE();
                oResponseBE.st = 0;
                oResponseBE.msg = "Error al iniciar Sessión";
                oResponseBE.dato = ex.ToString();
            }
            var response = JsonConvert.SerializeObject(oResponseBE);
            return Content(response, "application/json");
        }

        [HttpPost]
        public IActionResult CerrarSession()
        {
            ResponseBE oResponseBE = new ResponseBE();
            try
            {
                HttpContext.Session.Clear();

            }
            catch (Exception ex)
            {
                //Manejando Errores
                var error = ex.ToString();
                oResponseBE = new ResponseBE();
                oResponseBE.st = 0;
                oResponseBE.msg = "Error al iniciar Sessión";
                oResponseBE.dato = ex.ToString();
            }
            var response = JsonConvert.SerializeObject(oResponseBE);
            return Content(response, "application/json");
        }

        [HttpGet]
        public IActionResult ListarBusqueda()
        {
            List<UsuarioBE> oLista = new List<UsuarioBE>();
            try
            {
                UsuarioSL oUsuarioSL = new UsuarioSL();
                UsuarioBE oUsuarioBE = new UsuarioBE();

                oUsuarioBE.usuario = "";
                oUsuarioBE.i002_tipo_documento = 0;
                oUsuarioBE.documento = "";
                oUsuarioBE.nombres = "";
                oUsuarioBE.apellido_paterno = "";
                oUsuarioBE.apellido_materno = "";
                oUsuarioBE.i009_tipo_usuario = 0;

                oLista = oUsuarioSL.Listar(oUsuarioBE);

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
        public IActionResult Obtener()
        {
            UsuarioBE oUsuarioBE = new UsuarioBE();
            try
            {
                UsuarioSL oUsuarioSL = new UsuarioSL();

                Int32 pUsuario = Int32.Parse(HttpContext.Session.GetString("IdUsuario"));

                oUsuarioBE = oUsuarioSL.Obtener(pUsuario);

            }
            catch (Exception ex)
            {
                //Manejando Errores
                var error = ex.ToString();

            }
            var response = JsonConvert.SerializeObject(oUsuarioBE);
            return Content(response, "application/json");
        }

        [HttpPost]
        public IActionResult CambiarClave([FromBody] UsuarioRQ pUsuarioRQ)
        {
            ResponseBE oResponseBE = new ResponseBE();
            try
            {
                UsuarioBE oUsuarioBE = new UsuarioBE();
                UsuarioSL oUsuarioSL = new UsuarioSL();

                String pUsuario = HttpContext.Session.GetString("UserName");

                oUsuarioBE.id_usuario = pUsuarioRQ.id_usuario;
                oUsuarioBE.usuario = pUsuarioRQ.usuario;
                oUsuarioBE.clave = pUsuarioRQ.clave;
                oUsuarioBE.usuario_modificacion = pUsuario;

                oResponseBE = oUsuarioSL.CambiarClave(oUsuarioBE);

            }
            catch (Exception ex)
            {
                //Manejando Errores
                var error = ex.ToString();
                oResponseBE.st = 0;
                oResponseBE.msg = "Error al cambiar la clave  del usuario";

            }
            var response = JsonConvert.SerializeObject(oResponseBE);
            return Content(response, "application/json");
        }

    }
}
