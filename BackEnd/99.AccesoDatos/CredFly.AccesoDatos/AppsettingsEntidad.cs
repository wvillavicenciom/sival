using System;
using System.Collections.Generic;
using System.Text;

namespace CredFly.AccesoDatos
{
    public class AppsettingsEntidad
    {
        public Logging Logging { get; set; }
        public string AllowedHosts { get; set; }
        public ConnectionStrings ConnectionStrings { get; set; }
    }

    public class Logging
    {
        public LogLevel LogLevel { get; set; }
    }

    public class ConnectionStrings
    {
        public string DefaultConnection { get; set; }
    }

    public class LogLevel
    {
        public string Default { get; set; }
    }
}

