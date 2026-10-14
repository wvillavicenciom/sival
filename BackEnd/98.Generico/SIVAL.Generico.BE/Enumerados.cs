using System;
using System.Collections.Generic;
using System.Text;

namespace SIVAL.Generico.BE
{
    public class Enumerados
    {
        public enum TablaDefinicion
        {
            EstadoRegistro = 1,
            TipoDocumento = 3,
            CategoriaLaboral = 3,
            ResultadoEvaluacion = 4,
            MotivoRechazo = 5,
            TipoProducto = 6,
            EtapaSolicitud = 7,
            SeguroBien = 8,
            TipoUsuario = 2,
            TipoDocumentoAdjunto = 10,
            EstadoDocumento = 11,
            EstadoOperacion = 12,
            EstadoCuota = 13,
            PlazoVehicular = 15,
            ActividadEconomica = 8,
            Convenio = 9,
            Genero = 7
        }

        public enum TipoDocumento
        {
            DNI = 7,
            CE = 8
        }

        public enum Genero
        {
            Masculino = 38,
            Femenino = 39
        }

    }
}
