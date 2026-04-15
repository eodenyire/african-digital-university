using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AfricanDigitalUniversity.Api.Data;
using AfricanDigitalUniversity.Api.DTOs;
using AfricanDigitalUniversity.Api.Middleware;

namespace AfricanDigitalUniversity.Api.Controllers;

[ApiController]
[Route("lesson_progress")]
[Authorize]
public class LessonProgressController(AppDbContext db) : ControllerBase
{
    // GET /lesson_progress?user_id=<id>&lesson_id=in.(ids)
    [HttpGet]
    public async Task<ActionResult<IEnumerable<LessonProgressDto>>> List(
        [FromQuery] Guid user_id,
        [FromQuery] string? lesson_id)
    {
        var currentUserId = User.GetUserId();
        if (currentUserId != user_id) return Forbid();

        var query = db.LessonProgresses.Where(lp => lp.UserId == user_id);

        if (!string.IsNullOrWhiteSpace(lesson_id))
        {
            // Support "in.(id1,id2,...)" syntax or plain comma-separated list
            var raw = lesson_id.Replace("in.(", "").TrimEnd(')');
            var ids = raw.Split(',', StringSplitOptions.RemoveEmptyEntries)
                         .Select(s => Guid.TryParse(s.Trim(), out var g) ? g : (Guid?)null)
                         .Where(g => g.HasValue)
                         .Select(g => g!.Value)
                         .ToList();
            if (ids.Count > 0)
                query = query.Where(lp => ids.Contains(lp.LessonId));
        }

        var progress = await query
            .Select(lp => new LessonProgressDto(
                lp.Id, lp.UserId, lp.LessonId, lp.Completed, lp.CompletedAt))
            .ToListAsync();

        return Ok(progress);
    }

    // POST /lesson_progress  (upsert)
    [HttpPost]
    public async Task<ActionResult<LessonProgressDto>> Upsert([FromBody] UpsertLessonProgressRequest request)
    {
        var currentUserId = User.GetUserId();
        if (currentUserId != request.UserId) return Forbid();

        var existing = await db.LessonProgresses
            .FirstOrDefaultAsync(lp => lp.UserId == request.UserId && lp.LessonId == request.LessonId);

        if (existing is not null)
        {
            existing.Completed = request.Completed;
            existing.CompletedAt = request.CompletedAt;
            await db.SaveChangesAsync();
            return Ok(new LessonProgressDto(existing.Id, existing.UserId, existing.LessonId,
                existing.Completed, existing.CompletedAt));
        }

        var progress = new Models.LessonProgress
        {
            Id = Guid.NewGuid(),
            UserId = request.UserId,
            LessonId = request.LessonId,
            Completed = request.Completed,
            CompletedAt = request.CompletedAt
        };
        db.LessonProgresses.Add(progress);
        await db.SaveChangesAsync();

        return CreatedAtAction(nameof(List), new { user_id = progress.UserId },
            new LessonProgressDto(progress.Id, progress.UserId, progress.LessonId,
                progress.Completed, progress.CompletedAt));
    }
}
