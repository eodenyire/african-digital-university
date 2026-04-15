namespace AfricanDigitalUniversity.Api.Models;

public class AssignmentSubmission
{
    public Guid Id { get; set; }
    public Guid AssignmentId { get; set; }
    public Guid UserId { get; set; }
    public string? Content { get; set; }
    public string? FileUrl { get; set; }
    public int? Score { get; set; }
    public string? Feedback { get; set; }
    public DateTime SubmittedAt { get; set; }
    public DateTime? GradedAt { get; set; }

    // Navigation
    public Assignment? Assignment { get; set; }
    public User? User { get; set; }
}
