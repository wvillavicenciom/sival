using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using NuGet.Protocol.Plugins;
using SIVAL.Comercial.BE;
using SIVAL.Comercial.SL;
using SIVAL.Generico.BE;
using SIVAL.Generico.SL;
using SIVAL_Web.Areas.Comercial.Models;
using SIVAL_Web.Areas.Seguridad.Models;
using SIVAL_Web.Servicios;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using static SIVAL.Generico.BE.Enumerados;

namespace SIVAL_Web.Areas.Seguridad.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioApiController : Controller
    {
        private readonly IConfiguration _config;

        public UsuarioApiController(IConfiguration config)
        {
            _config = config;
        }

        // MÉTODO 1: Autenticación y generación de Token (No requiere token)
        [HttpPost("login")]
        [AllowAnonymous]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            // Aquí deberías validar contra tu base de datos (SQL Server, etc.)
            if (request.Usuario == "admin" && request.Password == "12345")
            {
                var token = GenerarTokenJWT(request.Usuario);
                return Ok(new { token = token, mensaje = "Autenticación exitosa" });
            }

            return Unauthorized("Usuario o contraseña incorrectos");
        }

        // MÉTODO PRIVADO: Lógica de generación del JWT
        private string GenerarTokenJWT(string usuario)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, usuario),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            int duracionMinutos = Convert.ToInt32(_config["Jwt:DurationInMinutes"]);

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(duracionMinutos),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
