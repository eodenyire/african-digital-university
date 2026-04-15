using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AfricanDigitalUniversity.Api.Data;
using AfricanDigitalUniversity.Api.DTOs;
using AfricanDigitalUniversity.Api.Middleware;
using AfricanDigitalUniversity.Api.Models;
using AfricanDigitalUniversity.Api.Services;

namespace AfricanDigitalUniversity.Api.Controllers;

[ApiController]
[Route("user_roles")]
[Authorize]
public class UserRolesController(AppDbContext db, RoleService roles) : ControllerBase
{
    // GET /user_roles?user_id=<id>&role=admin
    [HttpGet]
    public async Task<ActionResult<IEnumerable<UserRoleDto>>> List(
        [FromQuery] Guid? user_id,
        [FromQuery] string? role)
    {
        var currentUserId = User.GetUserId();
        var isAdmin = await roles.IsAdminAsync(currentUserId);

        IQueryable<UserRole> query = db.UserRoles;

        if (!isAdmin)
        {
            // Students can only see their own roles
            query = query.Where(r => r.UserId == currentUserId);
        }
        else if (user_id.HasValue)
        {
            query = query.Where(r => r.UserId == user_id.Value);
        }

        if (!string.IsNullOrWhiteSpace(role) &&
            Enum.TryParse<AppRole>(role, ignoreCase: true, out var parsedRole))
        {
            query = query.Where(r => r.Role == parsedRole);
        }

        var result = await query
            .Select(r => new UserRoleDto(r.Id, r.UserId, r.Role.ToString().ToLower(), r.CreatedAt))
            .ToListAsync();

        return Ok(result);
    }

    // POST /user_roles  (admin only)
    [HttpPost]
    public async Task<ActionResult<UserRoleDto>> Create([FromBody] CreateUserRoleRequest request)
    {
        var currentUserId = User.GetUserId();
        if (!await roles.IsAdminAsync(currentUserId))
            return Forbid();

        if (!Enum.TryParse<AppRole>(request.Role, ignoreCase: true, out var parsedRole))
            return BadRequest(new { error = "Invalid role. Valid values: admin, student." });

        if (await db.UserRoles.AnyAsync(r => r.UserId == request.UserId && r.Role == parsedRole))
            return Conflict(new { error = "Role already assigned." });

        var userRole = new UserRole
        {
            Id = Guid.NewGuid(),
            UserId = request.UserId,
            Role = parsedRole,
            CreatedAt = DateTime.UtcNow
        };
        db.UserRoles.Add(userRole);
        await db.SaveChangesAsync();

        return CreatedAtAction(nameof(List), new { user_id = userRole.UserId },
            new UserRoleDto(userRole.Id, userRole.UserId, userRole.Role.ToString().ToLower(), userRole.CreatedAt));
    }

    // DELETE /user_roles/<id>  (admin only)
    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var currentUserId = User.GetUserId();
        if (!await roles.IsAdminAsync(currentUserId))
            return Forbid();

        var userRole = await db.UserRoles.FindAsync(id);
        if (userRole is null) return NotFound();

        db.UserRoles.Remove(userRole);
        await db.SaveChangesAsync();

        return NoContent();
    }
}
