using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AfricanDigitalUniversity.Api.Data;
using AfricanDigitalUniversity.Api.DTOs;
using AfricanDigitalUniversity.Api.Middleware;
using AfricanDigitalUniversity.Api.Services;

namespace AfricanDigitalUniversity.Api.Controllers;

[ApiController]
[Route("courses")]
[Authorize]
public class CoursesController(AppDbContext db, RoleService roles) : ControllerBase
{
    // GET /courses  (published only for students; all for admins)
    [HttpGet]
    public async Task<ActionResult<IEnumerable<CourseDto>>> List()
    {
        var userId = User.GetUserId();
        var isAdmin = await roles.IsAdminAsync(userId);

        var query = db.Courses.AsQueryable();
        if (!isAdmin)
            query = query.Where(c => c.IsPublished);

        var courses = await query
            .OrderBy(c => c.Year)
            .ThenBy(c => c.Semester)
            .ThenBy(c => c.OrderIndex)
            .Select(c => MapCourse(c))
            .ToListAsync();

        return Ok(courses);
    }

    // GET /courses/<id>
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<CourseDto>> Get(Guid id)
    {
        var userId = User.GetUserId();
        var isAdmin = await roles.IsAdminAsync(userId);

        var course = await db.Courses.FindAsync(id);
        if (course is null) return NotFound();
        if (!isAdmin && !course.IsPublished) return Forbid();

        return Ok(MapCourse(course));
    }

    private static CourseDto MapCourse(Models.Course c) =>
        new(c.Id, c.SchoolSlug, c.CourseCode, c.Title, c.Description,
            c.Semester, c.Year, c.Credits, c.OrderIndex, c.IsPublished,
            c.CreatedAt, c.UpdatedAt);
}
