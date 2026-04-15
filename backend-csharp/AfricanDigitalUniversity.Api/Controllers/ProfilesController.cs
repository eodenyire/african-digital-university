using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AfricanDigitalUniversity.Api.Data;
using AfricanDigitalUniversity.Api.DTOs;
using AfricanDigitalUniversity.Api.Middleware;

namespace AfricanDigitalUniversity.Api.Controllers;

[ApiController]
[Route("profiles")]
[Authorize]
public class ProfilesController(AppDbContext db) : ControllerBase
{
    // GET /profiles?user_id=<id>
    [HttpGet]
    public async Task<ActionResult<ProfileDto>> GetByUserId([FromQuery] Guid user_id)
    {
        var currentUserId = User.GetUserId();
        if (currentUserId != user_id)
            return Forbid();

        var profile = await db.Profiles.FirstOrDefaultAsync(p => p.UserId == user_id);
        if (profile is null) return NotFound();

        return Ok(MapProfile(profile));
    }

    // PATCH /profiles/<id>
    [HttpPatch("{id:guid}")]
    public async Task<ActionResult<ProfileDto>> Update(Guid id, [FromBody] UpdateProfileRequest request)
    {
        var currentUserId = User.GetUserId();
        var profile = await db.Profiles.FindAsync(id);
        if (profile is null) return NotFound();
        if (profile.UserId != currentUserId) return Forbid();

        if (request.FullName is not null) profile.FullName = request.FullName;
        if (request.AvatarUrl is not null) profile.AvatarUrl = request.AvatarUrl;
        if (request.Bio is not null) profile.Bio = request.Bio;

        await db.SaveChangesAsync();
        return Ok(MapProfile(profile));
    }

    private static ProfileDto MapProfile(Models.Profile p) =>
        new(p.Id, p.UserId, p.FullName, p.AvatarUrl, p.Bio, p.CreatedAt, p.UpdatedAt);
}
