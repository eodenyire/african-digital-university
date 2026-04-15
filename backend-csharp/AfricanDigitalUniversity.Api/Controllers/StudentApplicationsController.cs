using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AfricanDigitalUniversity.Api.Data;
using AfricanDigitalUniversity.Api.DTOs;
using AfricanDigitalUniversity.Api.Middleware;
using AfricanDigitalUniversity.Api.Services;

namespace AfricanDigitalUniversity.Api.Controllers;

[ApiController]
[Route("student_applications")]
[Authorize]
public class StudentApplicationsController(AppDbContext db, RoleService roles) : ControllerBase
{
    // GET /student_applications?user_id=<id>  (own) or admin gets all
    [HttpGet]
    public async Task<ActionResult<IEnumerable<StudentApplicationDto>>> List(
        [FromQuery] Guid? user_id,
        [FromQuery] int? limit)
    {
        var currentUserId = User.GetUserId();
        var isAdmin = await roles.IsAdminAsync(currentUserId);

        IQueryable<Models.StudentApplication> query = db.StudentApplications
            .OrderByDescending(a => a.CreatedAt);

        if (!isAdmin)
        {
            query = query.Where(a => a.UserId == currentUserId);
        }
        else if (user_id.HasValue)
        {
            query = query.Where(a => a.UserId == user_id.Value);
        }

        if (limit.HasValue)
            query = query.Take(limit.Value);

        var applications = await query
            .Select(a => MapApplication(a))
            .ToListAsync();

        return Ok(applications);
    }

    // POST /student_applications
    [HttpPost]
    public async Task<ActionResult<StudentApplicationDto>> Create([FromBody] CreateStudentApplicationRequest request)
    {
        var currentUserId = User.GetUserId();
        if (currentUserId != request.UserId) return Forbid();

        var application = new Models.StudentApplication
        {
            Id = Guid.NewGuid(),
            UserId = request.UserId,
            FullName = request.FullName,
            Email = request.Email,
            Phone = request.Phone,
            SchoolSlug = request.SchoolSlug,
            Motivation = request.Motivation,
            Status = "pending",
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };
        db.StudentApplications.Add(application);
        await db.SaveChangesAsync();

        return CreatedAtAction(nameof(List), new { user_id = application.UserId }, MapApplication(application));
    }

    // PATCH /student_applications/<id>  (admin only)
    [HttpPatch("{id:guid}")]
    public async Task<ActionResult<StudentApplicationDto>> Review(Guid id, [FromBody] ReviewApplicationRequest request)
    {
        var currentUserId = User.GetUserId();
        if (!await roles.IsAdminAsync(currentUserId))
            return Forbid();

        if (!new[] { "pending", "approved", "rejected" }.Contains(request.Status))
            return BadRequest(new { error = "Invalid status. Valid values: pending, approved, rejected." });

        var application = await db.StudentApplications.FindAsync(id);
        if (application is null) return NotFound();

        application.Status = request.Status;
        application.ReviewedBy = request.ReviewedBy;
        application.ReviewedAt = request.ReviewedAt;

        await db.SaveChangesAsync();
        return Ok(MapApplication(application));
    }

    private static StudentApplicationDto MapApplication(Models.StudentApplication a) =>
        new(a.Id, a.UserId, a.FullName, a.Email, a.Phone, a.SchoolSlug,
            a.Motivation, a.Status, a.ReviewedBy, a.ReviewedAt, a.CreatedAt, a.UpdatedAt);
}
