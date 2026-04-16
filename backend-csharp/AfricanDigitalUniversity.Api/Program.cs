using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using AfricanDigitalUniversity.Api.Data;
using AfricanDigitalUniversity.Api.Models;
using AfricanDigitalUniversity.Api.Services;

var builder = WebApplication.CreateBuilder(args);

// 🔥 IMPORTANT FOR RENDER (bind to correct port)
var port = Environment.GetEnvironmentVariable("PORT") ?? "10000";
builder.WebHost.UseUrls($"http://0.0.0.0:{port}");

// ── Database connection strategy ────────────────────────────────────────────
var defaultConn = ResolveDefaultConnection(builder.Configuration);

// 🔥 HARD FALLBACK (prevents crash in Render)
if (string.IsNullOrWhiteSpace(defaultConn))
{
    defaultConn =
        "Host=ep-fancy-lake-amk2g54j-pooler.c-5.us-east-1.aws.neon.tech;" +
        "Database=neondb;" +
        "Username=neondb_owner;" +
        "Password=npg_TZfQnjIWSN28;" +
        "SSL Mode=Require;" +
        "Trust Server Certificate=true";
}

var supabaseConn = NormalizePostgresConnectionString(
    builder.Configuration.GetConnectionString("SupabaseConnection") ?? "");

var supabaseConfigured = !string.IsNullOrWhiteSpace(supabaseConn)
    && !supabaseConn.Contains("YOUR_SUPABASE_DB_PASSWORD", StringComparison.Ordinal);

var defaultConfigured = !string.IsNullOrWhiteSpace(defaultConn);
var defaultIsLocalhost = defaultConfigured &&
    (defaultConn.Contains("Host=localhost", StringComparison.OrdinalIgnoreCase) ||
     defaultConn.Contains("Host=127.0.0.1", StringComparison.OrdinalIgnoreCase));

var useSupabaseAsPrimary = !builder.Environment.IsDevelopment()
    && supabaseConfigured
    && (!defaultConfigured || defaultIsLocalhost);

var primaryConn = useSupabaseAsPrimary ? supabaseConn : defaultConn;

var supabaseReplicationEnabled = supabaseConfigured
    && !string.Equals(primaryConn, supabaseConn, StringComparison.Ordinal);

// ── DB Setup ───────────────────────────────────────────────────────────────
builder.Services.AddSingleton<SupabaseReplicationInterceptor>();

builder.Services.AddDbContext<AppDbContext>((sp, options) =>
{
    options.UseNpgsql(primaryConn);
    options.AddInterceptors(sp.GetRequiredService<SupabaseReplicationInterceptor>());
});

builder.Services.AddDbContext<SupabaseDbContext>(options =>
    options.UseNpgsql(primaryConn));

// ── JWT Authentication ─────────────────────────────────────────────────────
var jwtSettings = builder.Configuration.GetSection("Jwt");
var key = jwtSettings["Key"] ?? "SUPER_SECRET_DEV_KEY_123456"; // fallback

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

// ── Services ───────────────────────────────────────────────────────────────
builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped<RoleService>();

// ── CORS ───────────────────────────────────────────────────────────────────
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

// ── Controllers + Swagger ──────────────────────────────────────────────────
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// 🔥 Ensure DB exists (prevents runtime failures)
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();
}

// ── Middleware ─────────────────────────────────────────────────────────────
app.UseCors("ReactFrontend");
app.UseAuthentication();
app.UseAuthorization();

// Health check
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

// ── Helpers ────────────────────────────────────────────────────────────────
static string ResolveDefaultConnection(IConfiguration configuration)
{
    var configured = configuration.GetConnectionString("DefaultConnection");

    if (string.IsNullOrWhiteSpace(configured))
    {
        configured = configuration["DATABASE_URL"]
            ?? configuration["NEON_DATABASE_URL"]
            ?? configuration["NEON_URL"];
    }

    return NormalizePostgresConnectionString(configured ?? "");
}

static string NormalizePostgresConnectionString(string input)
{
    if (string.IsNullOrWhiteSpace(input))
        return string.Empty;

    if (input.StartsWith("postgres://") || input.StartsWith("postgresql://"))
    {
        var uri = new Uri(input);
        var userInfo = uri.UserInfo.Split(':');

        return $"Host={uri.Host};Port={uri.Port};Database={uri.AbsolutePath.TrimStart('/')};" +
               $"Username={userInfo[0]};Password={userInfo[1]};SSL Mode=Require;Trust Server Certificate=true";
    }

    return input;
}
