using AutoMapper;
using nego.communs.Model;
using nego.communs.resource;

namespace nego.communs.Mapping
{
    public class OrderMapping: Profile
    {
        public OrderMapping()
        {
            CreateMap<Order, OrderRessource>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id));
            CreateMap<OrderRessource, Order>()
                .ForMember(x => x.Articles, opt => opt.Ignore())
                .AfterMap((orderRessource, order) =>
                {
                    var removedArticles = order.Articles
                        .Where(ur => !orderRessource.Articles.Contains(ur.Id));
                    foreach (var item in removedArticles)
                    {
                        order.Articles.Remove(item);
                    }
                    var addedArticles = orderRessource.Articles
                        .Where(articleId => order.Articles.All(ur => ur.ArticleId != articleId))
                        .Select(id => new ArticleOrder { ArticleId = id, Quantity = orderRessource.Quantity }).ToList();
                    foreach (var item in addedArticles)
                    {
                        order.Articles.Add(item);
                    }
                });
        }
    }
}