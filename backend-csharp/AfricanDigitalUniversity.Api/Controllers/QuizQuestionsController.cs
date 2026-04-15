using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AfricanDigitalUniversity.Api.Data;
using AfricanDigitalUniversity.Api.DTOs;
using AfricanDigitalUniversity.Api.Middleware;
using AfricanDigitalUniversity.Api.Services;

namespace AfricanDigitalUniversity.Api.Controllers;

[ApiController]
[Route("quiz_questions")]
[Authorize]
public class QuizQuestionsController(AppDbContext db, RoleService roles) : ControllerBase
{
    // GET /quiz_questions?quiz_id=<id>
    [HttpGet]
    public async Task<ActionResult<IEnumerable<QuizQuestionDto>>> List([FromQuery] Guid quiz_id)
    {
        var userId = User.GetUserId();
        var isAdmin = await roles.IsAdminAsync(userId);

        if (!isAdmin)
        {
            // Check quiz is published and user is enrolled in the course
            var quiz = await db.Quizzes.FindAsync(quiz_id);
            if (quiz is null || !quiz.IsPublished) return Forbid();

            var enrolled = await db.Enrollments
                .AnyAsync(e => e.UserId == userId && e.CourseId == quiz.CourseId);
            if (!enrolled) return Forbid();
        }

        var questions = await db.QuizQuestions
            .Where(q => q.QuizId == quiz_id)
            .OrderBy(q => q.OrderIndex)
            .Select(q => MapQuestion(q))
            .ToListAsync();

        return Ok(questions);
    }

    private static QuizQuestionDto MapQuestion(Models.QuizQuestion q) =>
        new(q.Id, q.QuizId, q.Question,
            q.QuestionType.ToString().ToLower(),
            q.Options, q.CorrectAnswer, q.Points, q.OrderIndex);
}
