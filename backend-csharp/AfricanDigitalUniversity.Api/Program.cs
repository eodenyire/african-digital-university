using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using AfricanDigitalUniversity.Api.Data;
using AfricanDigitalUniversity.Api.Models;
using AfricanDigitalUniversity.Api.Services;

var builder = WebApplication.CreateBuilder(args);

// ── Database connection strategy ────────────────────────────────────────────
// Priority:
// 1) Use DefaultConnection when explicitly configured.
// 2) In hosted/non-dev environments, if DefaultConnection points to localhost,
//    transparently use SupabaseConnection as primary when configured.
// 3) Replicate to Supabase only when Supabase is configured and different from
//    the primary connection.
var defaultConn = builder.Configuration.GetConnectionString("DefaultConnection") ?? "";
var supabaseConn = builder.Configuration.GetConnectionString("SupabaseConnection") ?? "";

var supabaseConfigured = !string.IsNullOrWhiteSpace(supabaseConn)
    && !supabaseConn.Contains("YOUR_SUPABASE_DB_PASSWORD", StringComparison.Ordinal);

var defaultIsLocalhost = defaultConn.Contains("Host=localhost", StringComparison.OrdinalIgnoreCase)
    || defaultConn.Contains("Host=127.0.0.1", StringComparison.OrdinalIgnoreCase)
    || defaultConn.Contains("tcp://localhost", StringComparison.OrdinalIgnoreCase)
    || defaultConn.Contains("tcp://127.0.0.1", StringComparison.OrdinalIgnoreCase);

var useSupabaseAsPrimary = !builder.Environment.IsDevelopment()
    && defaultIsLocalhost
    && supabaseConfigured;

var primaryConn = useSupabaseAsPrimary ? supabaseConn : defaultConn;

if (string.IsNullOrWhiteSpace(primaryConn))
    throw new InvalidOperationException("No valid primary database connection string configured.");

var supabaseReplicationEnabled = supabaseConfigured
    && !string.Equals(primaryConn, supabaseConn, StringComparison.Ordinal);

builder.Services.AddSingleton<SupabaseReplicationInterceptor>();
builder.Services.AddDbContext<AppDbContext>((sp, options) =>
{
    options.UseNpgsql(primaryConn);
    options.AddInterceptors(sp.GetRequiredService<SupabaseReplicationInterceptor>());
});

if (supabaseReplicationEnabled)
{
    builder.Services.AddDbContext<SupabaseDbContext>(options =>
        options.UseNpgsql(supabaseConn));
}
else
{
    // Register a null/dummy factory so the interceptor can safely request the
    // service and handle the absence gracefully.
    builder.Services.AddDbContext<SupabaseDbContext>(options =>
        options.UseNpgsql(primaryConn));
}

if (useSupabaseAsPrimary)
{
    var startupLogger = LoggerFactory.Create(b => b.AddConsole()).CreateLogger<Program>();
    startupLogger.LogInformation("DefaultConnection points to localhost; using SupabaseConnection as primary database.");
}

if (!supabaseReplicationEnabled)
{
    var startupLogger = LoggerFactory.Create(b => b.AddConsole()).CreateLogger<Program>();
    startupLogger.LogWarning("Supabase replication disabled (SupabaseConnection missing/placeholder or already used as primary).");
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
        var configuredOrigins = builder.Configuration
            .GetSection("Cors:AllowedOrigins")
            .Get<string[]>() ?? [];

        var allowedOrigins = new[]
        {
            "https://african-digital-university.onrender.com",
            "http://localhost:5173",
            "http://localhost:3000",
            "http://localhost:8080",
            "http://localhost:8081",
            "http://localhost:8082",
        }
        .Concat(configuredOrigins)
        .Distinct(StringComparer.OrdinalIgnoreCase)
        .ToArray();

        policy.WithOrigins(allowedOrigins)
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
await SeedDefaultAdminAsync(app);

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

static async Task SeedDefaultAdminAsync(WebApplication app)
{
    await using var scope = app.Services.CreateAsyncScope();
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    var logger = scope.ServiceProvider.GetRequiredService<ILoggerFactory>().CreateLogger("StartupSeed");

    try
    {
        var adminEmail = app.Configuration["Seed:AdminEmail"] ?? "admin@adu.africa";
        var adminPassword = app.Configuration["Seed:AdminPassword"] ?? "Admin2026!";
        var adminFullName = app.Configuration["Seed:AdminFullName"] ?? "ADU Administrator";

        var adminUser = await db.Users.FirstOrDefaultAsync(u => u.Email == adminEmail);
        if (adminUser is null)
        {
            adminUser = new User
            {
                Email = adminEmail,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(adminPassword),
                EmailConfirmedAt = DateTime.UtcNow,
                RawUserMetaData = "{\"full_name\":\"ADU Administrator\"}",
            };
            db.Users.Add(adminUser);
            await db.SaveChangesAsync();
            logger.LogInformation("Seeded default admin user {Email}.", adminEmail);
        }

        var profileExists = await db.Profiles.AnyAsync(p => p.UserId == adminUser.Id);
        if (!profileExists)
        {
            db.Profiles.Add(new Profile
            {
                UserId = adminUser.Id,
                FullName = adminFullName,
            });
        }

        var roleExists = await db.UserRoles.AnyAsync(r => r.UserId == adminUser.Id && r.Role == AppRole.Admin);
        if (!roleExists)
        {
            db.UserRoles.Add(new UserRole
            {
                UserId = adminUser.Id,
                Role = AppRole.Admin,
            });
        }

        if (!profileExists || !roleExists)
        {
            await db.SaveChangesAsync();
            logger.LogInformation("Ensured admin profile/role for {Email}.", adminEmail);
        }
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "Skipping startup admin seed because database is not currently reachable.");
    }
}
