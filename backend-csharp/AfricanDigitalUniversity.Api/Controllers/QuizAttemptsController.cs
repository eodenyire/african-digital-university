using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AfricanDigitalUniversity.Api.Data;
using AfricanDigitalUniversity.Api.DTOs;
using AfricanDigitalUniversity.Api.Middleware;
using AfricanDigitalUniversity.Api.Services;

namespace AfricanDigitalUniversity.Api.Controllers;

[ApiController]
[Route("quiz_attempts")]
[Authorize]
public class QuizAttemptsController(AppDbContext db, RoleService roles) : ControllerBase
{
    // GET /quiz_attempts?user_id=<id>
    [HttpGet]
    public async Task<ActionResult<IEnumerable<QuizAttemptDto>>> List([FromQuery] Guid? user_id)
    {
        var currentUserId = User.GetUserId();
        var isAdmin = await roles.IsAdminAsync(currentUserId);

        IQueryable<Models.QuizAttempt> query = db.QuizAttempts;

        if (!isAdmin || user_id.HasValue)
        {
            var targetId = user_id ?? currentUserId;
            if (!isAdmin && targetId != currentUserId) return Forbid();
            query = query.Where(a => a.UserId == targetId);
        }

        var attempts = await query
            .Select(a => MapAttempt(a))
            .ToListAsync();

        return Ok(attempts);
    }

    // POST /quiz_attempts
    [HttpPost]
    public async Task<ActionResult<QuizAttemptDto>> Create([FromBody] CreateQuizAttemptRequest request)
    {
        var currentUserId = User.GetUserId();
        if (currentUserId != request.UserId) return Forbid();

        var attempt = new Models.QuizAttempt
        {
            Id = Guid.NewGuid(),
            QuizId = request.QuizId,
            UserId = request.UserId,
            Answers = request.Answers ?? "{}",
            StartedAt = DateTime.UtcNow
        };
        db.QuizAttempts.Add(attempt);
        await db.SaveChangesAsync();

        return CreatedAtAction(nameof(List), new { user_id = attempt.UserId }, MapAttempt(attempt));
    }

    // PATCH /quiz_attempts/<id>
    [HttpPatch("{id:guid}")]
    public async Task<ActionResult<QuizAttemptDto>> Update(Guid id, [FromBody] UpdateQuizAttemptRequest request)
    {
        var currentUserId = User.GetUserId();
        var isAdmin = await roles.IsAdminAsync(currentUserId);

        var attempt = await db.QuizAttempts.FindAsync(id);
        if (attempt is null) return NotFound();

        if (!isAdmin)
        {
            if (attempt.UserId != currentUserId) return Forbid();
            if (attempt.CompletedAt is not null)
                return Conflict(new { error = "Cannot update a completed attempt." });
        }

        if (request.Answers is not null) attempt.Answers = request.Answers;
        if (request.Score.HasValue) attempt.Score = request.Score;
        if (request.Passed.HasValue) attempt.Passed = request.Passed;
        if (request.CompletedAt.HasValue) attempt.CompletedAt = request.CompletedAt;

        await db.SaveChangesAsync();
        return Ok(MapAttempt(attempt));
    }

    private static QuizAttemptDto MapAttempt(Models.QuizAttempt a) =>
        new(a.Id, a.QuizId, a.UserId, a.Answers, a.Score,
            a.Passed, a.StartedAt, a.CompletedAt);
}
