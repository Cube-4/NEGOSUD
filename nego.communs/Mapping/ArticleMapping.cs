﻿using AutoMapper;
using nego.communs.Model;
using nego.communs.Resource;

namespace nego.communs.Mapping
{
    public class ArticleMapping : Profile
    {
        public ArticleMapping()
        {
            CreateMap<Article, ArticleRessource>()
                .ForMember(articleRessources => articleRessources.Id, opt => opt.MapFrom(article => article.Id));

            CreateMap<ArticleRessource, Article>()
                .ForMember(article => article.Stock, opt => opt.MapFrom(articleRessource => articleRessource.Quantity));

        }
    }
}
