using Microsoft.EntityFrameworkCore;
using AfricanDigitalUniversity.Api.Data;
using AfricanDigitalUniversity.Api.Models;

namespace AfricanDigitalUniversity.Api.Services;

/// <summary>
/// Replicates the Supabase has_role(user_id, role) SQL function.
/// </summary>
public class RoleService(AppDbContext db)
{
    public async Task<bool> HasRoleAsync(Guid userId, AppRole role)
    {
        return await db.UserRoles.AnyAsync(r => r.UserId == userId && r.Role == role);
    }

    public async Task<bool> IsAdminAsync(Guid userId)
        => await HasRoleAsync(userId, AppRole.Admin);
}
