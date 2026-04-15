using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AfricanDigitalUniversity.Api.Data;
using AfricanDigitalUniversity.Api.DTOs;
using AfricanDigitalUniversity.Api.Middleware;
using AfricanDigitalUniversity.Api.Services;

namespace AfricanDigitalUniversity.Api.Controllers;

[ApiController]
[Route("lessons")]
[Authorize]
public class LessonsController(AppDbContext db, RoleService roles) : ControllerBase
{
    // GET /lessons?course_id=<id>
    [HttpGet]
    public async Task<ActionResult<IEnumerable<LessonDto>>> List([FromQuery] Guid course_id)
    {
        var userId = User.GetUserId();
        var isAdmin = await roles.IsAdminAsync(userId);

        IQueryable<Models.Lesson> query = db.Lessons.Where(l => l.CourseId == course_id);

        if (!isAdmin)
        {
            var enrolled = await db.Enrollments
                .AnyAsync(e => e.UserId == userId && e.CourseId == course_id);
            if (!enrolled) return Forbid();

            query = query.Where(l => l.IsPublished);
        }

        var lessons = await query
            .OrderBy(l => l.OrderIndex)
            .Select(l => MapLesson(l))
            .ToListAsync();

        return Ok(lessons);
    }

    // GET /lessons/<id>
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<LessonDto>> Get(Guid id)
    {
        var userId = User.GetUserId();
        var isAdmin = await roles.IsAdminAsync(userId);

        var lesson = await db.Lessons.FindAsync(id);
        if (lesson is null) return NotFound();

        if (!isAdmin)
        {
            if (!lesson.IsPublished) return Forbid();
            var enrolled = await db.Enrollments
                .AnyAsync(e => e.UserId == userId && e.CourseId == lesson.CourseId);
            if (!enrolled) return Forbid();
        }

        return Ok(MapLesson(lesson));
    }

    private static LessonDto MapLesson(Models.Lesson l) =>
        new(l.Id, l.CourseId, l.Title, l.Content, l.VideoUrl,
            l.LessonType.ToString().ToLower(), l.OrderIndex, l.DurationMinutes,
            l.IsPublished, l.CreatedAt, l.UpdatedAt);
}
