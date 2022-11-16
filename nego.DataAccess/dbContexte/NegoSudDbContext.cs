using Microsoft.EntityFrameworkCore;
using nego.communs.Model;
using nego.DataAccess.EntityConfiguration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace nego.DataAccess.dbContexte
{
    public class NegoSudDbContext : DbContext
    {
        public DbSet<User> Clients { get; set; }

        public NegoSudDbContext(DbContextOptions<NegoSudDbContext> options):base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfiguration(new UserEntityConfiguration());
        }
    }
}
