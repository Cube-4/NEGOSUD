using Azure;
using Microsoft.AspNetCore.Mvc;
using nego.business;
using nego.communs.Resource;
using nego.services.Authorization;

namespace nego.api.Controllers
{
    [Authorize]
    [Produces("application/json")]
    [Route("api/role")]
    public class RoleController : Controller
    {
        private readonly IRoleService _roleService;

        public RoleController(IRoleService roleService)
        {
            _roleService = roleService;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var roles = await _roleService.GetAll();
            return Ok(roles);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var role = await _roleService.GetById(id);
            return Ok(role);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteById(int id)
        {
            var role = await _roleService.DeleteById(id);
            if (role == true)
            {
                return Ok("Successfully deleted role");
            }
            return BadRequest("Something wrong happened Deletion");
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] RoleRessource data)
        {
            var response = await _roleService.Add(data);
            if (response == true)
            {
                return Ok("Successfully Created role");
            }
            return BadRequest("Something wrong happened with Creation");
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] RoleRessource data)
        {
            var role = await _roleService.Update(data);
            if (role != null)
            {
                return Ok("Successfully Updated role");
            }
            return BadRequest("Something wrong happened with Update");
        }
    }
}
