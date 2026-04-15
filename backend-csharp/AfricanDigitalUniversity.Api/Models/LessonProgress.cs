namespace AfricanDigitalUniversity.Api.Models;

public class LessonProgress
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public Guid LessonId { get; set; }
    public bool Completed { get; set; }
    public DateTime? CompletedAt { get; set; }

    // Navigation
    public User? User { get; set; }
    public Lesson? Lesson { get; set; }
}
