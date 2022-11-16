using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using nego.business;
using nego.communs.Mapping;
using nego.communs.Model;
using nego.DataAccess.dbContexte;
using nego.DataAccess.unitOfWork;
using nego.DataAccess.unitOfWork.Repository;
using nego.services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.


builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<IUserRepository, UserRepository>(); 
builder.Services.AddScoped<NegoSudDbContext>();
builder.Services.AddDbContext<NegoSudDbContext>(option =>
{
    option.UseSqlServer(builder.Configuration.GetConnectionString("negoSudDb"));
});
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddMvc();
builder.Services.AddCors();
builder.Services.AddAutoMapper(typeof(UserMapping));



var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
