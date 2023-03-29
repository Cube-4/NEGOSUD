using AutoMapper;
using nego.communs.Model;
using nego.communs.resource;
using nego.communs.Resource;

namespace nego.communs.Mapping
{
    public class OrderMapping: Profile
    {
        public OrderMapping()
        {
            CreateMap<Order, OrderRessource>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Articles, opt => opt.MapFrom(src => src.Articles
                .Where(dest => dest.OrderId == src.Id)
                .Select(a => new ArticleRessource 
                { 
                    Id = a.ArticleId, 
                    Name = a.Article.Name,
                    Reference = a.Article.Reference,
                    Date = a.Article.Date,
                    Origin = a.Article.Origin,  
                    Price = a.Article.Price,
                    UserId = a.Article.UserId,
                    OrderQuantity = a.Quantity,
                })));

            CreateMap<OrderRessource, Order>()
                .ForMember(x => x.Articles, opt => opt.Ignore())
                .AfterMap((orderRessource, order) =>
                {
                    var removedArticles = order.Articles
                        .Where(ur => !orderRessource.Articles.Select(a => a.Id).Contains(ur.ArticleId));
                    foreach (var item in removedArticles)
                    {
                        order.Articles.Remove(item);
                    }
                    
                    var addedArticles = orderRessource.Articles
                        .Where(article => order.Articles.All(ur => ur.ArticleId != article.Id))
                        .Select(article => new ArticleOrder { ArticleId = article.Id, Quantity = article.OrderQuantity }).ToList();
                    foreach (var item in addedArticles)
                    {
                        order.Articles.Add(item);
                    }
                    
                    var modifiedArticles = orderRessource.Articles
                        .Where(article => order.Articles.Any(ur => ur.ArticleId == article.Id))
                        .Select(article => new { ArticleId = article.Id, Quantity = article.OrderQuantity });
                    foreach (var item in modifiedArticles)
                    {
                        order.Articles.Single(ur => ur.ArticleId == item.ArticleId).Quantity = item.Quantity;
                    }
                });
        }
    }
}