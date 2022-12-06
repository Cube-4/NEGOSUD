using Microsoft.EntityFrameworkCore;
using nego.communs.Model;
using nego.DataAccess.EntityConfiguration;

namespace nego.DataAccess.dbContexte
{
    public class NegoSudDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Article> Articles { get; set; }
        public DbSet<Role> Roles { get; set; }

        public NegoSudDbContext(DbContextOptions<NegoSudDbContext> options):base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfiguration(new UserEntityConfiguration());

            modelBuilder.Entity<OrderArticle>().HasKey(i => new { i.OrderId, i.ArticleId });
        }
    }
}
