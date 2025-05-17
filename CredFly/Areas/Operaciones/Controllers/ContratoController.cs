using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CollFly.Operaciones.BE;
using CollFly.Operaciones.SL;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace CollFly.Areas.Operaciones.Controllers
{
    public class ContratoController : Controller
    {
        public IActionResult BusquedaContrato()
        {
            return View();
        }

        [HttpGet]
        public IActionResult ContratosListar(Decimal pIdCliente, String pIdentContrato, String pDocumento, String pApellidoPaterno,
            String pFechaInicio, String pFechaFin)
        {
            List<ContratoBE> oLista = new List<ContratoBE>();
            try
            {
                ContratoSL oContratoSL = new ContratoSL();
                //pUsuaio = HttpContext.User.Identity.Name;
                Int32 pEmpresa = 1;

                pDocumento = pDocumento == null ? "" : pDocumento;
                pIdentContrato = pIdentContrato == null ? "" : pIdentContrato;
                pApellidoPaterno = pApellidoPaterno == null ? "" : pApellidoPaterno;
                pFechaInicio = pFechaInicio == null ? "" : pFechaInicio;
                pFechaFin = pFechaFin == null ? "" : pFechaFin;

                oLista = oContratoSL.Listar(pEmpresa, pIdCliente, pIdentContrato, pDocumento, pApellidoPaterno, pFechaInicio, pFechaFin);

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
        public IActionResult CronogramaListar(Decimal pIdContrato)
        {
            List<CronogramaBE> oLista = new List<CronogramaBE>();
            try
            {
                CronogramaSL oCronogramaSL = new CronogramaSL();

                oLista = oCronogramaSL.Listar(pIdContrato);

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