using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CollFly.Controllers
{
    public class BaseController : Controller
    {
        public String ObtenerUsuarioSesion()
        {
            String vUsuario = "";

            try
            {
                vUsuario = HttpContext.Session.GetString("UserName");
            }
            catch (Exception ex)
            {
                var error = ex.ToString();
                vUsuario = "N/A";
            }

            return vUsuario;
        }
    }
}