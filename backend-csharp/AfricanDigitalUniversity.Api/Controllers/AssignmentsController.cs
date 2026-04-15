using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AfricanDigitalUniversity.Api.Data;
using AfricanDigitalUniversity.Api.DTOs;
using AfricanDigitalUniversity.Api.Middleware;
using AfricanDigitalUniversity.Api.Services;

namespace AfricanDigitalUniversity.Api.Controllers;

[ApiController]
[Route("assignments")]
[Authorize]
public class AssignmentsController(AppDbContext db, RoleService roles) : ControllerBase
{
    // GET /assignments?course_id=<id>
    [HttpGet]
    public async Task<ActionResult<IEnumerable<AssignmentDto>>> List([FromQuery] Guid course_id)
    {
        var userId = User.GetUserId();
        var isAdmin = await roles.IsAdminAsync(userId);

        IQueryable<Models.Assignment> query = db.Assignments.Where(a => a.CourseId == course_id);

        if (!isAdmin)
        {
            var enrolled = await db.Enrollments
                .AnyAsync(e => e.UserId == userId && e.CourseId == course_id);
            if (!enrolled) return Forbid();
            query = query.Where(a => a.IsPublished);
        }

        var assignments = await query
            .OrderBy(a => a.OrderIndex)
            .Select(a => MapAssignment(a))
            .ToListAsync();

        return Ok(assignments);
    }

    private static AssignmentDto MapAssignment(Models.Assignment a) =>
        new(a.Id, a.CourseId, a.Title, a.Description, a.DueDate,
            a.MaxScore, a.OrderIndex, a.IsPublished, a.CreatedAt);
}
