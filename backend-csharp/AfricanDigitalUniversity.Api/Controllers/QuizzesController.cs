using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AfricanDigitalUniversity.Api.Data;
using AfricanDigitalUniversity.Api.DTOs;
using AfricanDigitalUniversity.Api.Middleware;
using AfricanDigitalUniversity.Api.Services;

namespace AfricanDigitalUniversity.Api.Controllers;

[ApiController]
[Route("quizzes")]
[Authorize]
public class QuizzesController(AppDbContext db, RoleService roles) : ControllerBase
{
    // GET /quizzes?course_id=<id>
    [HttpGet]
    public async Task<ActionResult<IEnumerable<QuizDto>>> List([FromQuery] Guid course_id)
    {
        var userId = User.GetUserId();
        var isAdmin = await roles.IsAdminAsync(userId);

        IQueryable<Models.Quiz> query = db.Quizzes.Where(q => q.CourseId == course_id);

        if (!isAdmin)
        {
            var enrolled = await db.Enrollments
                .AnyAsync(e => e.UserId == userId && e.CourseId == course_id);
            if (!enrolled) return Forbid();
            query = query.Where(q => q.IsPublished);
        }

        var quizzes = await query
            .OrderBy(q => q.OrderIndex)
            .Select(q => MapQuiz(q))
            .ToListAsync();

        return Ok(quizzes);
    }

    private static QuizDto MapQuiz(Models.Quiz q) =>
        new(q.Id, q.CourseId, q.Title, q.Description, q.TimeLimitMinutes,
            q.PassPercentage, q.OrderIndex, q.IsPublished, q.CreatedAt);
}
