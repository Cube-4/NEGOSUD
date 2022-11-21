using Microsoft.AspNetCore.Mvc;
using nego.business;
using nego.communs.Resource;

namespace nego.api.Controllers
{
    [Produces("application/json")]
    [Route("api/role")]
    public class RoleController : Controller
    {
        private readonly IRoleService _roleService;

        public RoleController(IRoleService roleService)
        {
            _roleService = roleService;
        }

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

        [HttpPost]
        public async Task<IActionResult> Create(RoleRessource data)
        {
            var role = await _roleService.Add(data);
            if (role != null)
            {
                return Ok("Successfully Created role");
            }
            return BadRequest("Something wrong happened with Creation");
        }

        [HttpPut]
        public async Task<IActionResult> Update(RoleRessource data)
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
