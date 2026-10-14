using SIVAL.Generico.BE;
using SIVAL.Generico.DO;
using System;

namespace SIVAL.Generico.BL
{
    public class LogBL
    {
        public Boolean Registrar(LogBE pLogBE)
        {
            LogDO oLogDO = new LogDO();
            return oLogDO.Registrar(pLogBE);
        }
    }
}
