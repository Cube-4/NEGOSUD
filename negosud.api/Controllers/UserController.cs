using Microsoft.AspNetCore.Mvc;
using nego.business;
using nego.communs.Resource;

namespace nego.api.Controllers
{
    [Produces("application/json")]
    [Route("api/user")]
    public class UserController : Controller
    {

        private readonly IUserService _clientService;


        public UserController(IUserService clientService)
        {
            _clientService = clientService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var users = await _clientService.GetAll();
            return Ok(users);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var user = await _clientService.GetById(id);
            return Ok(user);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteById(int id)
        {
            var user = await _clientService.DeleteById(id);
            if (user == true)
            {
                return Ok("Successfully deleted user");
            }
            return BadRequest("Something wrong happened Deletion");
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] UserRessource data)
        {
            var user = await _clientService.Add(data);
            if (user != null)
            {
                return Ok("Successfully Created user");
            }
            return BadRequest("Something wrong happened with Creation");
        }

        [HttpPut]
        public async Task<IActionResult> Update(UserRessource data)
        {
            var user = await _clientService.Update(data);
            if (user != null)
            {
                return Ok("Successfully updated user");
            }
            return BadRequest("Something wrong happened with Update");
        }

    }
}
