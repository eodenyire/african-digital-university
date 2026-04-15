namespace AfricanDigitalUniversity.Api.Models;

public class Course
{
    public Guid Id { get; set; }
    public string SchoolSlug { get; set; } = string.Empty;
    public string CourseCode { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public int Semester { get; set; } = 1;
    public int Year { get; set; } = 1;
    public int Credits { get; set; } = 3;
    public int OrderIndex { get; set; }
    public bool IsPublished { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

    // Navigation
    public ICollection<Enrollment> Enrollments { get; set; } = [];
    public ICollection<Lesson> Lessons { get; set; } = [];
    public ICollection<Assignment> Assignments { get; set; } = [];
    public ICollection<Quiz> Quizzes { get; set; } = [];
}
