using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CollFly.Controllers;
using CollFly.Generico.BE;
using CollFly.Seguridad.SL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace CollFly.Areas.Seguridad.Controllers
{
    public class UsuarioController : BaseController
    {
        // GET: Usuario
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


        [HttpGet]
        public IActionResult UsuarioValidarInicio(String pUsuario, String pClave)
        {
            ResponseBE oResponseBE = new ResponseBE();
            try
            {
                UsuarioSL oUsuarioSL = new UsuarioSL();
                //pUsuaio = HttpContext.User.Identity.Name;
                oResponseBE = oUsuarioSL.ValidarInicio(pUsuario, pClave);

                // Add claims to signed in user 
                //var userClaims = HttpContext.User.Claims.ToList();
                //userClaims.Add(new Claim("usrLogin", pUsuario));
                HttpContext.Session.SetString("UserName", pUsuario);

                oResponseBE.dato = ObtenerUsuarioSesion();
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

    }
}