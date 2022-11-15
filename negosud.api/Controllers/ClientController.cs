using Microsoft.AspNetCore.Mvc;
using nego.business;

namespace nego.api.Controllers
{
    [ApiController]
    [Route("myapp.Api/user/")]
    public class ClientController : Controller
    {
        private readonly IClientService _clientService;

        public ClientController(IClientService clientService)
        {
            _clientService = clientService;
        }

        [HttpGet("getAll/")]
        public IActionResult GetAll()
        {
            var response = _clientService.GetAll();
            return Ok(response);
        }
    }
}
