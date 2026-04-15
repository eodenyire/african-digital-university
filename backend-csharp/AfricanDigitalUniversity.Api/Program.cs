using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using AfricanDigitalUniversity.Api.Data;
using AfricanDigitalUniversity.Api.Services;

var builder = WebApplication.CreateBuilder(args);

// ── Primary database (local adu-africa PostgreSQL) ─────────────────────────
builder.Services.AddSingleton<SupabaseReplicationInterceptor>();

builder.Services.AddDbContext<AppDbContext>((sp, options) =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
    options.AddInterceptors(sp.GetRequiredService<SupabaseReplicationInterceptor>());
});

// ── Secondary database (Supabase cloud PostgreSQL) ─────────────────────────
// Used by SupabaseReplicationInterceptor to mirror every write made to the
// primary database.  Registration is skipped when the connection string is
// absent or still contains the placeholder password so the app starts cleanly
// in environments where Supabase credentials have not yet been configured.
var supabaseConn = builder.Configuration.GetConnectionString("SupabaseConnection") ?? "";
var supabaseEnabled = !string.IsNullOrWhiteSpace(supabaseConn)
    && !supabaseConn.Contains("YOUR_SUPABASE_DB_PASSWORD");

if (supabaseEnabled)
{
    builder.Services.AddDbContext<SupabaseDbContext>(options =>
        options.UseNpgsql(supabaseConn));
}
else
{
    // Register a null/dummy factory so the interceptor can safely request the
    // service and handle the absence gracefully.
    builder.Services.AddDbContext<SupabaseDbContext>(options =>
        options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
}

if (!supabaseEnabled)
{
    var startupLogger = LoggerFactory.Create(b => b.AddConsole()).CreateLogger<Program>();
    startupLogger.LogWarning("SupabaseConnection not configured – Supabase replication disabled.");
}

// ── JWT Authentication ─────────────────────────────────────────────────────
var jwtSettings = builder.Configuration.GetSection("Jwt");
var keyBytes = Encoding.UTF8.GetBytes(jwtSettings["Key"]!);

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtSettings["Issuer"],
            ValidAudience = jwtSettings["Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(keyBytes),
            NameClaimType = "sub"
        };
    });

builder.Services.AddAuthorization();

// ── Services ───────────────────────────────────────────────────────────────
builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped<RoleService>();

// ── CORS ───────────────────────────────────────────────────────────────────
builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactFrontend", policy =>
    {
        policy.WithOrigins(
                "http://localhost:5173",
                "http://localhost:3000",
                "http://localhost:8080",
                "http://localhost:8081",
                "http://localhost:8082")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

// ── Controllers + Swagger ──────────────────────────────────────────────────
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "African Digital University API",
        Version = "v1",
        Description = "C# ASP.NET Core Web API backend replicating the ADU Supabase backend"
    });

    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Enter your JWT token. Example: Bearer {token}"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});

var app = builder.Build();

// ── Middleware pipeline ────────────────────────────────────────────────────
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "ADU API v1"));
}

app.UseCors("ReactFrontend");
app.UseAuthentication();
app.UseAuthorization();

// Lightweight health check — used by the frontend to detect if C# backend is available
app.MapGet("/health", () => Results.Ok(new { status = "healthy", backend = "csharp", timestamp = DateTime.UtcNow }))
   .AllowAnonymous();

app.MapControllers();

app.Run();
