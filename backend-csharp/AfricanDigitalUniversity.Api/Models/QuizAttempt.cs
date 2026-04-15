namespace AfricanDigitalUniversity.Api.Models;

public class QuizAttempt
{
    public Guid Id { get; set; }
    public Guid QuizId { get; set; }
    public Guid UserId { get; set; }
    public string Answers { get; set; } = "{}"; // JSONB stored as string
    public int? Score { get; set; }
    public bool? Passed { get; set; }
    public DateTime StartedAt { get; set; }
    public DateTime? CompletedAt { get; set; }

    // Navigation
    public Quiz? Quiz { get; set; }
    public User? User { get; set; }
}
