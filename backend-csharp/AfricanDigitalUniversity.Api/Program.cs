using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using AfricanDigitalUniversity.Api.Data;
using AfricanDigitalUniversity.Api.Models;
using AfricanDigitalUniversity.Api.Services;

var builder = WebApplication.CreateBuilder(args);

// 🔥 Render port binding
var port = Environment.GetEnvironmentVariable("PORT") ?? "10000";
builder.WebHost.UseUrls($"http://0.0.0.0:{port}");

// ── DATABASE CONNECTION ────────────────────────────────────────────────
var defaultConn = ResolveDefaultConnection(builder.Configuration);

var supabaseConn = NormalizePostgresConnectionString(
    builder.Configuration.GetConnectionString("SupabaseConnection") ?? "");

var supabaseConfigured =
    !string.IsNullOrWhiteSpace(supabaseConn) &&
    !supabaseConn.Contains("YOUR_SUPABASE_DB_PASSWORD");

var defaultConfigured = !string.IsNullOrWhiteSpace(defaultConn);

var defaultIsLocalhost =
    defaultConn.Contains("localhost", StringComparison.OrdinalIgnoreCase) ||
    defaultConn.Contains("127.0.0.1", StringComparison.OrdinalIgnoreCase);

// fallback safety (DO NOT rely on this long-term; only prevents Render crash)
if (!defaultConfigured)
{
    defaultConn =
        "Host=ep-fancy-lake-amk2g54j-pooler.c-5.us-east-1.aws.neon.tech;" +
        "Database=neondb;" +
        "Username=neondb_owner;" +
        "Password=npg_TZfQnjIWSN28;" +
        "SSL Mode=Require;Trust Server Certificate=true";
}

var useSupabaseAsPrimary =
    !builder.Environment.IsDevelopment() &&
    supabaseConfigured &&
    (!defaultConfigured || defaultIsLocalhost);

var primaryConn = useSupabaseAsPrimary ? supabaseConn : defaultConn;

// 🔥 HARD SAFETY CHECK (prevents DNS crash like your log)
if (!IsValidConnection(primaryConn))
{
    throw new InvalidOperationException(
        $"Invalid database connection string. Host missing or malformed: {primaryConn}");
}

// ── DB CONTEXTS ────────────────────────────────────────────────────────
builder.Services.AddSingleton<SupabaseReplicationInterceptor>();

builder.Services.AddDbContext<AppDbContext>((sp, options) =>
{
    options.UseNpgsql(primaryConn);
    options.AddInterceptors(
        sp.GetRequiredService<SupabaseReplicationInterceptor>());
});

// Always use primary safely (no second broken DB connection attempt)
builder.Services.AddDbContext<SupabaseDbContext>(options =>
{
    options.UseNpgsql(primaryConn);
});

// ── JWT ────────────────────────────────────────────────────────────────
var jwt = builder.Configuration.GetSection("Jwt");

var key = jwt["Key"];
if (string.IsNullOrWhiteSpace(key))
    key = "DEV_ONLY_SUPER_SECRET_KEY_CHANGE_ME";

var keyBytes = Encoding.UTF8.GetBytes(key);

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(keyBytes),
            NameClaimType = "sub"
        };
    });

builder.Services.AddAuthorization();

// ── SERVICES ───────────────────────────────────────────────────────────
builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped<RoleService>();

// ── CORS ───────────────────────────────────────────────────────────────
builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactFrontend", policy =>
    {
        policy.WithOrigins(
                "https://african-digital-university.onrender.com",
                "http://localhost:5173",
                "http://localhost:3000"
            )
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

// ── SWAGGER ────────────────────────────────────────────────────────────
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "African Digital University API",
        Version = "v1"
    });
});

var app = builder.Build();

// ❌ REMOVED: EnsureCreated()
// (THIS WAS YOUR CRASH TRIGGER ON RENDER)

// ── MIDDLEWARE ─────────────────────────────────────────────────────────
app.UseCors("ReactFrontend");
app.UseAuthentication();
app.UseAuthorization();

app.MapGet("/health", () =>
    Results.Ok(new
    {
        status = "healthy",
        backend = "csharp",
        time = DateTime.UtcNow
    }))
    .AllowAnonymous();

app.MapControllers();

app.Run();

// ── HELPERS ─────────────────────────────────────────────────────────────
static bool IsValidConnection(string conn)
{
    return !string.IsNullOrWhiteSpace(conn) &&
           conn.Contains("Host=", StringComparison.OrdinalIgnoreCase);
}

static string ResolveDefaultConnection(IConfiguration configuration)
{
    var conn = configuration.GetConnectionString("DefaultConnection");

    if (string.IsNullOrWhiteSpace(conn))
    {
        conn = configuration["DATABASE_URL"]
            ?? configuration["NEON_DATABASE_URL"]
            ?? configuration["NEON_URL"];
    }

    return NormalizePostgresConnectionString(conn ?? "");
}

static string NormalizePostgresConnectionString(string input)
{
    if (string.IsNullOrWhiteSpace(input))
        return string.Empty;

    if (input.StartsWith("postgres://") || input.StartsWith("postgresql://"))
    {
        var uri = new Uri(input);
        var userInfo = uri.UserInfo.Split(':');

        var user = userInfo.Length > 0 ? userInfo[0] : "";
        var pass = userInfo.Length > 1 ? userInfo[1] : "";

        return $"Host={uri.Host};Port={uri.Port};Database={uri.AbsolutePath.TrimStart('/')};" +
               $"Username={user};Password={pass};SSL Mode=Require;Trust Server Certificate=true";
    }

    return input;
}
