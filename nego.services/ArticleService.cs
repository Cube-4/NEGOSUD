using AutoMapper;
using Azure.Core;
using nego.business;
using nego.communs.Global;
using nego.communs.Model;
using nego.communs.resource;
using nego.communs.Resource;
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

            var articles = _repository.GetAll<Article>().ToList();
            var articlesRessource = _mapper.Map<List<ArticleRessource>>(articles);
            return Task.FromResult(articlesRessource);
        }

        public Task<ArticleRessource> GetById(int id)
        {
            var articles = _repository.GetOne<Article>(User => User.Id == id);
            if (articles != null)
            {
                var articlesRessource = _mapper.Map<ArticleRessource>(articles);
                return Task.FromResult(articlesRessource);
            }
            return null;
        }

        public async Task<bool> DeleteById(int id)
        {
            var article = _repository.GetOne<Article>(article => article.Id == id);
            if (article != null)
            {
                _repository.Remove(article);
                await _unitOfWork.SaveIntoDbContextAsync();
                return true;
            }
            return false;

        }

        public async Task<ArticleRessource> Add(EntityRessource data)
        {
            var articlesResource = (ArticleRessource)data;

            //check if the user already exist by email
            if (articlesResource.Id != null)
            {
                var articleUser = _repository.GetOne<User>(User => User.Id == articlesResource.UserId);
                //map from dto to model
                var newArticle = _mapper.Map<Article>(articlesResource);
                newArticle.User = articleUser;
                _repository.Add(newArticle);

                await _unitOfWork.SaveIntoDbContextAsync();
                return articlesResource;
            }
            return null;
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

        public Task<bool> ChangeQuantity(int id, int quantity, string type)
        {
            var articles = _repository.GetOne<Article>(Article => Article.Id == id);
            if (articles != null)
            {
                if (type == "add")
                {
                    articles.Stock += quantity;
                }
                else if (type == "substract")
                {
                    articles.Stock -= quantity;
                }
                _repository.Update(articles);
                _unitOfWork.SaveIntoDbContextAsync();
                return Task.FromResult(true);
            }
            return Task.FromResult(false);
        }

    }
}