namespace AfricanDigitalUniversity.Api.Models;

public enum LessonType
{
    Video,
    Text,
    Code,
    Mixed
}

public class Lesson
{
    public Guid Id { get; set; }
    public Guid CourseId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Content { get; set; }
    public string? VideoUrl { get; set; }
    public LessonType LessonType { get; set; } = LessonType.Text;
    public int OrderIndex { get; set; }
    public int? DurationMinutes { get; set; }
    public bool IsPublished { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

    // Navigation
    public Course? Course { get; set; }
    public ICollection<LessonProgress> LessonProgresses { get; set; } = [];
}
