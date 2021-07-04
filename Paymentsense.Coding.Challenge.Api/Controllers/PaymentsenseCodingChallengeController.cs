using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Paymentsense.Coding.Challenge.Api.Models;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;

namespace Paymentsense.Coding.Challenge.Api.Controllers
{
    [ResponseCache(Duration = 60, Location = ResponseCacheLocation.Any)]
    [ApiController]
    [Route("[controller]")]
    public class PaymentsenseCodingChallengeController : ControllerBase
    {
        [HttpGet]
        public ActionResult<string> Get()
        {
            return Ok("Paymentsense Coding Challenge!");
        }

        [HttpGet("int")]
        public async Task<string> GetCountries()
        {
            string countriesList = string.Empty, apiResponse = string.Empty;
            using (var httpClient = new HttpClient())
            {
                using (var response = await httpClient.GetAsync("https://restcountries.eu/rest/v2/all"))
                {
                    apiResponse = await response.Content.ReadAsStringAsync();
                    //countriesList = JsonConvert.DeserializeObject<List<Countries>>(apiResponse).ToString();
                }
            }
            return apiResponse;
        }
    }
}
