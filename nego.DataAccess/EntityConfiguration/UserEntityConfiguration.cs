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
    public class UserEntityConfiguration : IEntityTypeConfiguration<Client>

    {
        public void Configure(EntityTypeBuilder<Client> builder)
        {
            builder.HasKey(x => x.Id);
            builder.ToTable("Clients");
            builder.Property(x => x.Id).ValueGeneratedOnAdd();

        }
    }
}

