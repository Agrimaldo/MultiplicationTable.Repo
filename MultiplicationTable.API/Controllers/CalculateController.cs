using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MultiplicationTable.API.Dto.Output;
using MultiplicationTable.API.Interfaces;

namespace MultiplicationTable.API.Controllers
{
    [ApiController, Route("api/[controller]"), EnableCors("General")]
    public class CalculateController : ControllerBase
    {

        private ICalculateService _calculateService;
        public CalculateController(ICalculateService calculateService)
        {
            _calculateService = calculateService;
        }

        [HttpPost]
        public Task<List<CalculateOutput>> Post([FromBody] IList<int> input)
        {
            return  _calculateService.Multiplication(input);
        }
    }
}
