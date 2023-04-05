using Microsoft.EntityFrameworkCore;
using nego.communs.Model;
using nego.DataAccess.EntityConfiguration;

namespace nego.DataAccess.dbContexte
{
    public class NegoSudDbContext : DbContext
    {
        public DbSet<Role> Roles { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<RoleUser> RoleUsers { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Article> Articles { get; set; }
        public DbSet<ArticleOrder> ArticleOrders { get; set; }

        public NegoSudDbContext(DbContextOptions<NegoSudDbContext> options):base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfiguration(new UserEntityConfiguration());

            modelBuilder.Entity<RoleUser>()
                .HasOne(ru => ru.Role)
                .WithMany(b => b.Users)
                .HasForeignKey(ru => ru.RoleId);
            modelBuilder.Entity<RoleUser>()
                .HasOne(ru => ru.User)
                .WithMany(c => c.Roles)
                .HasForeignKey(ru => ru.UserId);

            modelBuilder.Entity<ArticleOrder>()
                .HasOne(ru => ru.Article)
                .WithMany(b => b.Orders)
                .HasForeignKey(ru => ru.ArticleId)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<ArticleOrder>()
                .HasOne(ru => ru.Order)
                .WithMany(c => c.Articles)
                .HasForeignKey(ru => ru.OrderId)
                .OnDelete(DeleteBehavior.Cascade);

        }
    }
}
