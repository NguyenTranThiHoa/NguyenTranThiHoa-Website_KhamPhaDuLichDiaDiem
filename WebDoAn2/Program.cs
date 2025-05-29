using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;

using System.Text;
using System.Text.Json;

using WebDoAn2.HealthChecks;
using WebDoAn2.Data;

using Microsoft.AspNetCore.Diagnostics.HealthChecks;

using Serilog;
using Serilog.Events;

using Serilog.Sinks.MSSqlServer;
using WebDoAn2.Mapper;

using Microsoft.Extensions.Hosting;
using AutoMapper;
using WebDoAn2.Interfaces;
using WebDoAn2.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
    options.UseSqlServer(connectionString, sqlOptions => sqlOptions.CommandTimeout(180));
});

builder.Services.AddHttpClient<ApiHealthCheck>();

builder.Services.AddHealthChecks()
.AddCheck("SQL Database", new SqlConnectionHealthCheck(builder.Configuration.GetConnectionString("DefaultConnection")))
.AddCheck<ApiHealthCheck>(nameof(ApiHealthCheck))
.AddCheck<SystemHealthCheck>(nameof(SystemHealthCheck));

builder.Host.UseSerilog((context, config) =>
{
    config.MinimumLevel.Information()  // Đặt mức log mặc định là Information
        .MinimumLevel.Override("Microsoft.AspNetCore", Serilog.Events.LogEventLevel.Warning)  // Giới hạn mức log cho ASP.NET Core
        .MinimumLevel.Override("Microsoft", Serilog.Events.LogEventLevel.Warning)  // Giới hạn mức log cho Microsoft
        .WriteTo.Console()  // Ghi log vào Console
        .WriteTo.Debug()    // Ghi log vào Debug Output
        .WriteTo.File("Logs\\log-.txt",  // Ghi log vào tệp, cuộn theo ngày
            rollingInterval: RollingInterval.Day,  // Cuộn theo ngày
            rollOnFileSizeLimit: true,  // Cuộn khi tệp vượt quá kích thước
            buffered: false,  // Tắt bộ đệm để ghi log ngay lập tức
            restrictedToMinimumLevel: Serilog.Events.LogEventLevel.Information)  // Mức log tối thiểu là Information
        .WriteTo.MSSqlServer(
            connectionString: builder.Configuration.GetConnectionString("DefaultConnection"),  // Cấu hình kết nối đến SQL Server
            sinkOptions: new MSSqlServerSinkOptions { TableName = "Logs", AutoCreateSqlTable = true },  // Cấu hình bảng "Logs" trong SQL Server, tự động tạo bảng nếu chưa có
            restrictedToMinimumLevel: Serilog.Events.LogEventLevel.Warning);  // Mức log tối thiểu là Warning
});


builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])) // Đặt Key trong appsettings.json
        };
    });

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("Admin", policy =>
        policy.RequireClaim("RoleName", "Admin")); // Yêu cầu roleID là ADMIN
});

// Add services to the container.
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

/********Thêm đoạn Service vào**********/
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<ILocationsService, LocationsService>();
builder.Services.AddScoped<IHotelsService, HotelsService>();
builder.Services.AddScoped<ISpecialtyService, SpecialtyService>();
builder.Services.AddScoped<ITransportsService, TransportsService>();
builder.Services.AddScoped<IReviewsService, ReviewsService>();
builder.Services.AddScoped<IUsersService, UsersService>();
builder.Services.AddScoped<IStatisticsService, StatisticsService>();
builder.Services.AddScoped<ITransportTypeService, TransportTypeService>();

/*************************/

// Cấu hình AutoMapper và đăng ký AutoMapperProfile
builder.Services.AddAutoMapper(typeof(AutoMapperProfile));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000") // Địa chỉ của ứng dụng React
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

var app = builder.Build();
app.MapHealthChecks("/health", new HealthCheckOptions
{
    ResponseWriter = async (context, report) =>
    {
        context.Response.ContentType = "application/json";
        var result = JsonSerializer.Serialize(new
        {
            status = report.Status.ToString(),
            checks = report.Entries.Select(entry => new
            {
                name = entry.Key,
                status = entry.Value.Status.ToString(),

                exception = entry.Value.Exception?.Message,

                duration = entry.Value.Duration.ToString()

            })

        });
        await context.Response.WriteAsync(result);
    }
});

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseCors("AllowAll");
app.UseCors("AllowReactApp");


// Hình ảnh
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(Path.Combine(builder.Environment.ContentRootPath, "Uploads")),
    RequestPath = "/api/images"
});

app.UseSerilogRequestLogging();

app.UseHttpsRedirection();

app.UseAuthentication();  // Đảm bảo đã gọi middleware xác thực

app.UseAuthorization();   // Đảm bảo đã gọi middleware phân quyền

app.MapControllers();

app.Run();
