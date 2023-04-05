using AutoMapper;
using Microsoft.EntityFrameworkCore;
using nego.business;
using nego.communs.Model;
using nego.communs.Resource;
using nego.communs.Resource.Other;
using nego.dataAccess.unitOfWork.Repository;
using nego.DataAccess.dbContexte;
using nego.DataAccess.unitOfWork;


namespace nego.services
{
    public class ArticleService : IArticleService
    {
        private readonly IRepository<NegoSudDbContext> _repository;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public ArticleService(IMapper mapper, IUnitOfWork unitOfWork, IRepository<NegoSudDbContext> repository)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _repository = repository;
        }


        public Task<List<ArticleRessource>> GetAll()
        {

            var articles = _repository.GetAll<Article>()
                .Include(c => c.User)
                .Include(c => c.Orders).ThenInclude(x => x.Order)
                .ToList();
            var articlesRessource = _mapper.Map<List<ArticleRessource>>(articles);
            return Task.FromResult(articlesRessource);
        }

        public Task<ArticleRessource> GetById(int id)
        {
            var articles = _repository.GetAll<Article>()
                .Include(c => c.User)
                .Include(c => c.Orders).ThenInclude(x => x.Order)
                .FirstOrDefault(u => u.Id == id); 
            if (articles != null)
            {
                var articlesRessource = _mapper.Map<ArticleRessource>(articles);
                return Task.FromResult(articlesRessource);
            }
            return null;
        }

        public async Task<bool> DeleteById(int id)
        {
            var article = _repository.GetOne<Article>(src => src.Id == id);
            var articleUser = _repository.GetOne<User>(src => src.Id == article.UserId);

            if (article != null)
            {
                articleUser.Articles.Remove(article);
                _repository.Remove(article);
                await _unitOfWork.SaveIntoDbContextAsync();
                return true;
            }
            return false;

        }

        public async Task<bool> Add(EntityRessource data)
        {
            var articlesResource = (ArticleCreationDTO)data;

            //check if the user already exist by email
            if (articlesResource.Id != null)
            {
                var articleUser = _repository.GetOne<User>(User => User.Id == articlesResource.UserId);
                //map from dto to model
                var newArticle = _mapper.Map<Article>(articlesResource);
                newArticle.User = articleUser;
                articleUser.Articles.Add(newArticle);
                _repository.Add(newArticle);

                await _unitOfWork.SaveIntoDbContextAsync();
                return await Task.FromResult(true);
            }
            return await Task.FromResult(false);
        }

        public async Task<ArticleRessource> Update(EntityRessource data)
        {
            var articlesResource = (ArticleRessource)data;

            //get user
            var article = _repository.GetOne<Article>(Article => Article.Id == articlesResource.Id);
            //check if user exist
            if (article != null)
            {
                var entity = _mapper.Map(articlesResource, article);
                //add to db
                _repository.Update(entity);
                //save changes to db
                await _unitOfWork.SaveIntoDbContextAsync();
                //return dto updated user
                var articlesMapped = _mapper.Map<ArticleRessource>(entity);
                return articlesMapped;
            }
            return null;
            //map from dto to model

        }

        public async Task<bool> ChangeQuantity(ChangeQuantityRequest data)
        {
            var articles = _repository.GetOne<Article>(Article => Article.Id == data.Id);
            if (articles != null)
            {
                if (data.Type == "add")
                {
                    articles.Stock += data.Quantity;
                }
                else if (data.Type == "substract")
                {
                    articles.Stock -= data.Quantity;
                }
                _repository.Update(articles);
                await _unitOfWork.SaveIntoDbContextAsync();
                return await Task.FromResult(true);
            }
            return await Task.FromResult(false);
        }

    }
}