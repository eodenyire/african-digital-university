using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AfricanDigitalUniversity.Api.Data;
using AfricanDigitalUniversity.Api.DTOs;
using AfricanDigitalUniversity.Api.Middleware;
using AfricanDigitalUniversity.Api.Services;

namespace AfricanDigitalUniversity.Api.Controllers;

[ApiController]
[Route("assignment_submissions")]
[Authorize]
public class AssignmentSubmissionsController(AppDbContext db, RoleService roles) : ControllerBase
{
    // GET /assignment_submissions?user_id=<id>
    [HttpGet]
    public async Task<ActionResult<IEnumerable<AssignmentSubmissionDto>>> List([FromQuery] Guid? user_id)
    {
        var currentUserId = User.GetUserId();
        var isAdmin = await roles.IsAdminAsync(currentUserId);

        IQueryable<Models.AssignmentSubmission> query = db.AssignmentSubmissions;

        if (isAdmin && user_id is null)
        {
            // Admin sees all
        }
        else
        {
            var targetId = user_id ?? currentUserId;
            if (!isAdmin && targetId != currentUserId) return Forbid();
            query = query.Where(s => s.UserId == targetId);
        }

        var submissions = await query
            .Select(s => MapSubmission(s))
            .ToListAsync();

        return Ok(submissions);
    }

    // POST /assignment_submissions
    [HttpPost]
    public async Task<ActionResult<AssignmentSubmissionDto>> Create([FromBody] CreateSubmissionRequest request)
    {
        var currentUserId = User.GetUserId();
        if (currentUserId != request.UserId) return Forbid();

        var submission = new Models.AssignmentSubmission
        {
            Id = Guid.NewGuid(),
            AssignmentId = request.AssignmentId,
            UserId = request.UserId,
            Content = request.Content,
            FileUrl = request.FileUrl,
            SubmittedAt = DateTime.UtcNow
        };
        db.AssignmentSubmissions.Add(submission);
        await db.SaveChangesAsync();

        return CreatedAtAction(nameof(List), new { user_id = submission.UserId }, MapSubmission(submission));
    }

    // PATCH /assignment_submissions/<id>
    [HttpPatch("{id:guid}")]
    public async Task<ActionResult<AssignmentSubmissionDto>> Update(Guid id, [FromBody] UpdateSubmissionRequest request)
    {
        var currentUserId = User.GetUserId();
        var isAdmin = await roles.IsAdminAsync(currentUserId);

        var submission = await db.AssignmentSubmissions.FindAsync(id);
        if (submission is null) return NotFound();

        // Students can only update ungraded submissions
        if (!isAdmin)
        {
            if (submission.UserId != currentUserId) return Forbid();
            if (submission.GradedAt is not null)
                return Conflict(new { error = "Cannot update a graded submission." });
        }

        if (request.Content is not null) submission.Content = request.Content;
        if (request.FileUrl is not null) submission.FileUrl = request.FileUrl;

        await db.SaveChangesAsync();
        return Ok(MapSubmission(submission));
    }

    private static AssignmentSubmissionDto MapSubmission(Models.AssignmentSubmission s) =>
        new(s.Id, s.AssignmentId, s.UserId, s.Content, s.FileUrl,
            s.Score, s.Feedback, s.SubmittedAt, s.GradedAt);
}
