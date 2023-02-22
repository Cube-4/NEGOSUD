using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;

using nego.business;
using nego.communs.Mapping;
using nego.dataAccess.unitOfWork.Repository;
using nego.DataAccess.dbContexte;
using nego.DataAccess.unitOfWork;
using nego.services;
using nego.services.Authorization.Helper;
using nego.services.Authorization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddScoped<IRepository<NegoSudDbContext>, Repository>();

builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddScoped<IRoleService, RoleService>();
builder.Services.AddScoped<IArticleService, ArticleService>();

//builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<NegoSudDbContext>();
// configure DI for application services
builder.Services.AddScoped<IJwtUtils, JwtUtils>();

builder.Services.Configure<AppSettings>(builder.Configuration.GetSection("AppSettings"));

builder.Services.AddMvc();
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "Cors",
        policy =>
        {
            policy.AllowAnyHeader();
            policy.AllowAnyOrigin();
            policy.WithOrigins("http://localhost:3000");
            policy.AllowAnyMethod();
        });
});
builder.Services.AddAutoMapper(typeof(UserMapping));
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<NegoSudDbContext>(option =>
{
    option.UseSqlServer(builder.Configuration.GetConnectionString("negoSudDb"));
});


builder.Services.AddMvc();
builder.Services.AddCors(option =>
{
    option.AddDefaultPolicy(
        policy =>
        {
            policy.AllowAnyHeader()
                  .AllowAnyMethod()
                  .AllowCredentials();

        });
});
builder.Services.AddAutoMapper(typeof(UserMapping));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("Cors");

// global error handler
app.UseMiddleware<ErrorHandlerMiddleware>();

// custom jwt auth middleware
app.UseMiddleware<JwtMiddleware>();

app.UseHttpsRedirection();
app.UseAuthorization();

app.MapControllers();

app.Run();
