using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using nego.communs.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace nego.DataAccess.EntityConfiguration
{
    public class ArticleEntityConfiguration : IEntityTypeConfiguration<Article>

    {
        public void Configure(EntityTypeBuilder<Article> builder)
        {
            builder.HasKey(x => x.Id);
            builder.ToTable("Article");
            builder.Property(x => x.Id).ValueGeneratedOnAdd();

        }
    }
}

