using Microsoft.AspNetCore.Mvc;
// ClientController uses nego.business IUserService interface
using nego.business;

namespace NEGOSUD.Controllers
{
    [ApiController]
    [Route("myapp.Api/user/")]
    public class ClientController : Controller
    {
        private readonly IUserService _clientService;

        public ClientController(IUserService clientService)
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
