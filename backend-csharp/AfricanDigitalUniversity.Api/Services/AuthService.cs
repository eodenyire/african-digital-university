using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using AfricanDigitalUniversity.Api.Data;
using AfricanDigitalUniversity.Api.DTOs;
using AfricanDigitalUniversity.Api.Models;

namespace AfricanDigitalUniversity.Api.Services;

public class AuthService(AppDbContext db, IConfiguration config)
{
    public async Task<AuthResponse> SignUpAsync(SignUpRequest request)
    {
        if (await db.Users.AnyAsync(u => u.Email == request.Email))
            throw new InvalidOperationException("Email already registered.");

        var user = new User
        {
            Id = Guid.NewGuid(),
            Email = request.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };
        db.Users.Add(user);

        // Replicate handle_new_user trigger: auto-create profile
        var profile = new Profile
        {
            Id = Guid.NewGuid(),
            UserId = user.Id,
            FullName = request.FullName,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };
        db.Profiles.Add(profile);

        await db.SaveChangesAsync();

        var token = GenerateJwt(user);
        return BuildAuthResponse(token, user);
    }

    public async Task<AuthResponse> SignInAsync(SignInRequest request)
    {
        var user = await db.Users.FirstOrDefaultAsync(u => u.Email == request.Email)
            ?? throw new UnauthorizedAccessException("Invalid email or password.");

        if (!BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            throw new UnauthorizedAccessException("Invalid email or password.");

        var token = GenerateJwt(user);
        return BuildAuthResponse(token, user);
    }

    public async Task<UserDto?> GetSessionUserAsync(Guid userId)
    {
        var user = await db.Users.FindAsync(userId);
        return user is null ? null : new UserDto(user.Id, user.Email, user.CreatedAt);
    }

    private string GenerateJwt(User user)
    {
        var jwtSettings = config.GetSection("Jwt");
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["Key"]!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var expiry = DateTime.UtcNow.AddHours(double.Parse(jwtSettings["ExpiryHours"] ?? "24"));

        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new(JwtRegisteredClaimNames.Email, user.Email),
            new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        var token = new JwtSecurityToken(
            issuer: jwtSettings["Issuer"],
            audience: jwtSettings["Audience"],
            claims: claims,
            expires: expiry,
            signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    private AuthResponse BuildAuthResponse(string token, User user)
    {
        var expiry = int.Parse(config["Jwt:ExpiryHours"] ?? "24") * 3600;
        return new AuthResponse(
            AccessToken: token,
            TokenType: "Bearer",
            ExpiresIn: expiry,
            User: new UserDto(user.Id, user.Email, user.CreatedAt));
    }
}
