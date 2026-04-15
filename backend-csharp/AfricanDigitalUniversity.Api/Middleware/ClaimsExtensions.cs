using System.Security.Claims;

namespace AfricanDigitalUniversity.Api.Middleware;

public static class ClaimsExtensions
{
    public static Guid GetUserId(this ClaimsPrincipal user)
    {
        var sub = user.FindFirstValue(ClaimTypes.NameIdentifier)
               ?? user.FindFirstValue("sub")
               ?? throw new UnauthorizedAccessException("User ID claim missing.");
        return Guid.Parse(sub);
    }

    public static bool TryGetUserId(this ClaimsPrincipal user, out Guid userId)
    {
        var sub = user.FindFirstValue(ClaimTypes.NameIdentifier)
               ?? user.FindFirstValue("sub");
        return Guid.TryParse(sub, out userId);
    }
}
