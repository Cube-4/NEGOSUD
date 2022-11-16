using Microsoft.AspNetCore.Mvc;
using nego.business;
using nego.communs.Resource;

namespace nego.api.Controllers
{
    [Produces("application/json")]
    [Route("api/Client")]
    public class ClientController : Controller
    {

        private readonly IClientService _clientService;


        public ClientController(IClientService clientService)
        {
            _clientService = clientService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var clients = await _clientService.GetAll();
            return Ok(clients);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var client = await _clientService.GetById(id);
            return Ok(client);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteById(int id)
        {
            var client = await _clientService.DeleteById(id);
            if (client == true)
            {
                return Ok("Successfully deleted client");
            }
            return BadRequest("Something wrong happened Deletion");
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ClientRessource data)
        {
            var client = await _clientService.Create(data);
            if (client == true)
            {
                return Ok("Successfully Created client");
            }
            return BadRequest("Something wrong happened with Creation");
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] ClientRessource data)
        {
            var client = await _clientService.Update(data);
            if (client == true)
            {
                return Ok("Successfully updated client");
            }
            return BadRequest("Something wrong happened with Update");
        }

    }
}
