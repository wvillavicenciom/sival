using Microsoft.AspNetCore.Mvc;

namespace CredFly_Web.Controllers
{
    [Area("Seguridad")]
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

        public Int32 ObtenerIdUsuarioSesion()
        {
            String vUsuario = "";

            try
            {
                vUsuario = HttpContext.Session.GetString("IdUsuario");
            }
            catch (Exception ex)
            {
                var error = ex.ToString();
                vUsuario = "0";
            }

            return Int32.Parse(vUsuario);
        }

        public Int32 ObtenerCodigoEmpresa()
        {
            String vUsuario = "";

            try
            {
                vUsuario = HttpContext.Session.GetString("IdEmpresa");
            }
            catch (Exception ex)
            {
                var error = ex.ToString();
                vUsuario = "0";
            }

            return Int32.Parse(vUsuario);
        }

    }
}
