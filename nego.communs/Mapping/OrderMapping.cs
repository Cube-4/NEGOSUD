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
                .ForMember(x => x.Users, opt => opt.Ignore())
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
                        .Select(id => new OrderArticle { ArticleId = id, Quantity = orderRessource.Quantity }).ToList();
                    foreach (var item in addedArticles)
                    {
                        order.Articles.Add(item);
                    }
                })

                .AfterMap((orderRessource, order) =>
                {
                    var removedUsers = order.Users
                        .Where(ur => !orderRessource.Users.Contains(ur.Id));
                    foreach (var item in removedUsers)
                    {
                        order.Users.Remove(item);
                    }
                    var addedUsers = orderRessource.Users
                        .Where(userId => order.Users.All(ur => ur.UserId != userId))
                        .Select(id => new UserOrder { UserId = id }).ToList();
                    foreach (var item in addedUsers)
                    {
                        order.Users.Add(item);
                    }
                }); ;
        }
    }
}