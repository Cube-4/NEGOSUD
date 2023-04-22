using AutoMapper;
using nego.business;
using nego.DataAccess.dbContexte;
using nego.dataAccess.unitOfWork.Repository;
using nego.DataAccess.unitOfWork;
using System.Text;
using nego.communs.Model;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using nego.communs.Resource.Other;

namespace nego.services
{
    public class CartService : ICartService
    {
        private readonly IRepository<NegoSudDbContext> _repository;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public CartService(IRepository<NegoSudDbContext> repository, IMapper mapper, IUnitOfWork unitOfWork, IJwtUtils jwtUtils, IHttpContextAccessor httpContextAccessor)
        {
            _repository = repository;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _httpContextAccessor = httpContextAccessor;
        }

        public Cart GetCart()
        {
            var cartDataBytes = _httpContextAccessor.HttpContext.Session.Get("Cart");
            if (cartDataBytes == null)
            {
                var cart = new Cart() { Articles = new List<CartArticle>(), TotalPrice = 0 };
                SetCart(cart);
                return cart;
            }
            return JsonConvert.DeserializeObject<Cart>(Encoding.UTF8.GetString(cartDataBytes));
        }
        
        public Task<bool> AddToCart(CartRequest data)
        {
            try
            {
                var cart = GetCart();
                var existingArticle = cart.Articles.FirstOrDefault(a => a.ArticleId == data.ArticleId);
                if (existingArticle != null)
                {
                    existingArticle.Quantity += data.Quantity;
                    existingArticle.TotalPrice = existingArticle.Article.Price * existingArticle.Quantity;
                }
                else
                {
                    var article = _repository.GetOne<Article>(a => a.Id == data.ArticleId);
                    var cartArticle = new CartArticle
                    {
                        Article = article,
                        ArticleId = data.ArticleId,
                        Quantity = data.Quantity,
                        TotalPrice = article.Price * data.Quantity
                    };
                    cart.Articles.Add(cartArticle);
                }

                cart.TotalPrice = cart.Articles.Sum(a => a.TotalPrice);
                SetCart(cart);
                return Task.FromResult(true);
            }
            catch
            {
                return Task.FromResult(false);
            }
            
        }

        public Task<bool> RemoveFromCart(CartRequest data)
        {
            try
            {
                var cart = GetCart();
                var existingArticle = cart.Articles.FirstOrDefault(a => a.ArticleId == data.ArticleId);
                if (existingArticle != null)
                {
                    if (existingArticle.Quantity > data.Quantity)
                    {
                        existingArticle.Quantity -= data.Quantity;
                        existingArticle.TotalPrice = existingArticle.Article.Price * existingArticle.Quantity;
                    }
                    else
                    {
                        cart.Articles.Remove(existingArticle);
                    }
                    cart.TotalPrice -= existingArticle.TotalPrice;
                    SetCart(cart);
                }
                return Task.FromResult(true);
            }
            catch
            {
                return Task.FromResult(false);
            }
            
        }
        
        public Task<bool> ClearCart()
        {
            try
            {
                var cart = GetCart();
                cart.Articles.Clear();
                cart.TotalPrice = 0;
                SetCart(cart);
                return Task.FromResult(true);
            }
            catch
            {
                return Task.FromResult(false);
            }
        }

        public void SetCart(Cart cart)
        {
            var cartData = Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(cart));
            _httpContextAccessor.HttpContext.Session.Set("Cart", cartData);
        }
    }
}
