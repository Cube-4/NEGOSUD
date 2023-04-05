using Azure;
using Microsoft.AspNetCore.Mvc;
using nego.business;
using nego.communs.Model;
using nego.communs.resource;
using nego.communs.Resource;
using nego.communs.Resource.Other;
using nego.services.Authorization;

namespace nego.api.Controllers
{
    [Produces("application/json")]
    [Route("api/article")]
    public class ArticleController : Controller
    {
        private readonly IArticleService _articleService;

        public ArticleController(IArticleService articleService)
        {
            _articleService = articleService;
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var articles = await _articleService.GetAll();
            return Ok(articles);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var article = await _articleService.GetById(id);
            return Ok(article);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteById(int id)
        {
            var article = await _articleService.DeleteById(id);
            if (article == true)
            {
                return Ok("Successfully deleted article");
            }
            return BadRequest("Something wrong happened with Deletion");
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ArticleCreationDTO data)
        {
            var response = await _articleService.Add(data);
            if (response == true)
            {
                return Ok("Successfully Created article");
            }
            return BadRequest("Something wrong happened with Creation");
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] ArticleRessource data)
        {
            var article = await _articleService.Update(data);
            if (article != null)
            {
                return Ok("Successfully Updated article");
            }
            return BadRequest("Something wrong happened with Update");
        }

        [HttpPut("changeQuantity")]
        public async Task<IActionResult> ChangeQuantity([FromBody] ChangeQuantityRequest data)
        {
            var article = await _articleService.ChangeQuantity(data);
            if (article == true)
            {
                return Ok("Successfully Updated article quantity " + data.Quantity);

            }
            return BadRequest("Something wrong happened with the article quantity update");
        }
    }
}
