using SIVAL.Generico.BE;
using SIVAL.Generico.BL;
using System;

namespace SIVAL.Generico.SL
{
    public class LogSL
    {
        public static Boolean Registrar(LogBE pLogBE)
        {
            LogBL oLogBL = new LogBL();
            return oLogBL.Registrar(pLogBE);
        }
    }
}
