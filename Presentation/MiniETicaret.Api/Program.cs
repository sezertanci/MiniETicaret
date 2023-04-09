using FluentValidation.AspNetCore;
using MiniETicaret.Application.Validators.Product;
using MiniETicaret.Infrastructure.Filters;
using MiniETicaret.Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddPersistenceServices();

//builder.Services.AddValidatorsFromAssembly(typeof(ValidationFilter).Assembly);
//builder.Services.AddValidatorsFromAssemblyContaining<CreateProductValidator>();

builder.Services.AddControllers(options => options.Filters.Add<ValidationFilter>()).AddJsonOptions(opt =>
{
    opt.JsonSerializerOptions.PropertyNamingPolicy = null;//Json çýktýsýnýn baþ harflerinde deðiþiklik yapmaz
}).AddFluentValidation(configuration => configuration.RegisterValidatorsFromAssemblyContaining<CreateProductValidator>())
.ConfigureApiBehaviorOptions(options => options.SuppressModelStateInvalidFilter = true);

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options => options.AddDefaultPolicy(policy => policy.WithOrigins("http://localhost:4200", "http://localhost:59474").AllowAnyHeader().AllowAnyMethod()));

var app = builder.Build();

// Configure the HTTP request pipeline.
if(app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseStaticFiles();

app.UseCors();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
