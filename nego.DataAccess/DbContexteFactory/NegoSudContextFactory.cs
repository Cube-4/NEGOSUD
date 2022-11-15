using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using nego.DataAccess.dbContexte;
using System.IO;

namespace nego.DataAccess.DbContextFactory
{
    public class NegoSudContextFactory : IDesignTimeDbContextFactory<NegoSudDbContext>
    {
        readonly IConfigurationRoot _configuration = new ConfigurationBuilder()
           .SetBasePath(Directory.GetCurrentDirectory())
           .AddJsonFile("appsettings.json")
           .Build();

        public NegoSudDbContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<NegoSudDbContext>();
            builder.UseSqlServer(_configuration.GetConnectionString("negoSudDb"), b => b.MigrationsAssembly("nego.DataAccess"));

            return new NegoSudDbContext(builder.Options);
        }
    }
}