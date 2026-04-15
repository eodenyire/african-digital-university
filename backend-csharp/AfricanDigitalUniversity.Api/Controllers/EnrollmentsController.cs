using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AfricanDigitalUniversity.Api.Data;
using AfricanDigitalUniversity.Api.DTOs;
using AfricanDigitalUniversity.Api.Middleware;
using AfricanDigitalUniversity.Api.Services;

namespace AfricanDigitalUniversity.Api.Controllers;

[ApiController]
[Route("enrollments")]
[Authorize]
public class EnrollmentsController(AppDbContext db, RoleService roles) : ControllerBase
{
    // GET /enrollments?user_id=<id>
    [HttpGet]
    public async Task<ActionResult<IEnumerable<EnrollmentDto>>> List([FromQuery] Guid? user_id)
    {
        var currentUserId = User.GetUserId();
        var isAdmin = await roles.IsAdminAsync(currentUserId);

        IQueryable<Models.Enrollment> query = db.Enrollments.Include(e => e.Course);

        if (isAdmin && user_id is null)
        {
            // Admin requesting all enrollments
        }
        else
        {
            var targetId = user_id ?? currentUserId;
            if (!isAdmin && targetId != currentUserId)
                return Forbid();
            query = query.Where(e => e.UserId == targetId);
        }

        var enrollments = await query
            .Select(e => new EnrollmentDto(
                e.Id, e.UserId, e.CourseId, e.EnrolledAt, e.CompletedAt,
                e.Course == null ? null : new CourseDto(
                    e.Course.Id, e.Course.SchoolSlug, e.Course.CourseCode,
                    e.Course.Title, e.Course.Description, e.Course.Semester,
                    e.Course.Year, e.Course.Credits, e.Course.OrderIndex,
                    e.Course.IsPublished, e.Course.CreatedAt, e.Course.UpdatedAt)))
            .ToListAsync();

        return Ok(enrollments);
    }

    // POST /enrollments
    [HttpPost]
    public async Task<ActionResult<EnrollmentDto>> Enroll([FromBody] CreateEnrollmentRequest request)
    {
        var currentUserId = User.GetUserId();
        if (currentUserId != request.UserId)
            return Forbid();

        if (await db.Enrollments.AnyAsync(e => e.UserId == request.UserId && e.CourseId == request.CourseId))
            return Conflict(new { error = "Already enrolled." });

        var enrollment = new Models.Enrollment
        {
            Id = Guid.NewGuid(),
            UserId = request.UserId,
            CourseId = request.CourseId,
            EnrolledAt = DateTime.UtcNow
        };
        db.Enrollments.Add(enrollment);
        await db.SaveChangesAsync();

        return CreatedAtAction(nameof(List), new { user_id = enrollment.UserId },
            new EnrollmentDto(enrollment.Id, enrollment.UserId, enrollment.CourseId,
                enrollment.EnrolledAt, enrollment.CompletedAt, null));
    }
}
