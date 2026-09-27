using Newtonsoft.Json;
using System;
using System.Reflection.Metadata.Ecma335;

namespace SIVAL_Web.Servicios
{
    public class ExperianWS
    {


        public async Task<RsExperianAuth> AutenticarAsync()
        {
            RsExperianAuth oRsExperianAuth = new RsExperianAuth();

            try
            {
                var client = new HttpClient();
                var request = new HttpRequestMessage(HttpMethod.Post, "https://api.experian.com.pe/iam/oauth2/v1/basic/token");
                request.Headers.Add("Accept", "application/json");
                request.Headers.Add("Client_id", "V63yUUOrxLtkGVFwNfq1ylXCstbGbnP3");
                request.Headers.Add("Client_secret", "RC2LmnVMelpuiHlG");
                request.Headers.Add("Cookie", "incap_ses_1698_2989270=s8zlYMCjtAW/WgikhYKQF44yjmoAAAAAT1S1yu0Gue95JqNr/Ggtyg==; nlbi_2989270=JW42fccHd3WYX8dA2K411wAAAAD5pMoQfMgzHoK9CSRwTLXe; visid_incap_2989270=OkIPgPjDSfmaUm3FalsyCY4yjmoAAAAAQUIPAAAAAAAK8z9besOU7lzz0sIkdKtv");
                /*var content = new StringContent("{ \r\n  \"username\": \"score@servicredit.pe\", \r\n  \"password\": \"Coopservi12@\" \r\n} ", System.Text.Encoding.UTF8, "application/json");
                //RQExperianAuth oRQExperianAuth = new RQExperianAuth() { username = "score@servicredit.pe", password = "Coopservi12@" };
                request.Content = content;*/
                var parameters = new Dictionary<string, string>
                {
                    { "username", "score@servicredit.pe" },
                    { "password", "Coopservi12@" }
                };
                // 2. Asignas el FormUrlEncodedContent (esto configura automáticamente el Content-Type correcto)
                request.Content = new FormUrlEncodedContent(parameters);
                var response = await client.SendAsync(request);
                response.EnsureSuccessStatusCode();
                //vToken = await response.Content.ReadAsStringAsync();
                if (response.IsSuccessStatusCode)
                {
                    String rs = await response.Content.ReadAsStringAsync();
                    oRsExperianAuth = JsonConvert.DeserializeObject<RsExperianAuth>(rs);
                }
            }
            catch (Exception ex)
            {
                //Registrando log con el error ocurrido
                var error = ex.ToString();
                //Log.WhriteLogException(error, Constantes.strCapaDO, "UsuarioDO.ValidarInicio");
                oRsExperianAuth.expires_in = "0";
            }


            return oRsExperianAuth;
        }

        public async Task<string> ObtenerDatosAsync(String Tokend, String TipoDocumento, String Documento)
        {
            String vJsonHistorial = "";
            try
            {
                var client = new HttpClient();
                var request = new HttpRequestMessage(HttpMethod.Post, "https://api.experian.com.pe/modular/credit-history/v1/hdc/gethistory");
                request.Headers.Add("Accept", "application/json");
                request.Headers.Add("Client_id", "V63yUUOrxLtkGVFwNfq1ylXCstbGbnP3");
                request.Headers.Add("Client_secret", "RC2LmnVMelpuiHlG");
                request.Headers.Add("Gx_email", "score@servicredit.pe");
                request.Headers.Add("Gx_Key", "E627849C17971622ACE4756953A83B8A");
                request.Headers.Add("Gx_usuario", "20600644778");
                request.Headers.Add("Authorization", "Bearer " + Tokend);
                request.Headers.Add("Cookie", "ASP.NET_SessionId=fylpycojmgz5g21dfawh0202; incap_ses_1698_2989270=s8zlYMCjtAW/WgikhYKQF44yjmoAAAAAT1S1yu0Gue95JqNr/Ggtyg==; nlbi_2989270=6lPNY3SUDn7mpOSk2K411wAAAAApzcJGyMF/LyvxHrcBfz1a; visid_incap_2989270=OkIPgPjDSfmaUm3FalsyCY4yjmoAAAAAQUIPAAAAAAAK8z9besOU7lzz0sIkdKtv");

                var bodyObject = new
                {
                    TipDoc = TipoDocumento,
                    NroDoc = Documento
                };
                string jsonBody = System.Text.Json.JsonSerializer.Serialize(bodyObject);

                // 3. Lo enviamos como application/json en UTF8
                request.Content = new StringContent(jsonBody, System.Text.Encoding.UTF8, "application/json");
                var response = await client.SendAsync(request);
                //response.EnsureSuccessStatusCode();
                if (response.IsSuccessStatusCode)
                {
                    vJsonHistorial = await response.Content.ReadAsStringAsync();
                }
                else
                {
                    //registrando log con el status del servicio
                    string errorBody = await response.Content.ReadAsStringAsync();
                }               

            }
            catch (Exception ex)
            {
                //Registrando log con el error ocurrido
                var error = ex.ToString();
            }

            return vJsonHistorial;

        }
    }
}


public class RsExperianAuth
{
    public String issued_at;
    public String expires_in;
    public String token_type;
    public String access_token;
    public String refresh_token;
}
