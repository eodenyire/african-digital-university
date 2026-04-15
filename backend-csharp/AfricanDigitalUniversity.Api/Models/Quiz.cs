namespace AfricanDigitalUniversity.Api.Models;

public class Quiz
{
    public Guid Id { get; set; }
    public Guid CourseId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public int? TimeLimitMinutes { get; set; }
    public int PassPercentage { get; set; } = 60;
    public int OrderIndex { get; set; }
    public bool IsPublished { get; set; }
    public DateTime CreatedAt { get; set; }

    // Navigation
    public Course? Course { get; set; }
    public ICollection<QuizQuestion> Questions { get; set; } = [];
    public ICollection<QuizAttempt> Attempts { get; set; } = [];
}
