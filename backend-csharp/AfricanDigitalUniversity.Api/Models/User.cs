namespace AfricanDigitalUniversity.Api.Models;

public class User
{
    public Guid Id { get; set; }
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public DateTime? EmailConfirmedAt { get; set; }
    public string? RawUserMetaData { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

    // Navigation
    public Profile? Profile { get; set; }
    public ICollection<Enrollment> Enrollments { get; set; } = [];
    public ICollection<LessonProgress> LessonProgresses { get; set; } = [];
    public ICollection<AssignmentSubmission> AssignmentSubmissions { get; set; } = [];
    public ICollection<QuizAttempt> QuizAttempts { get; set; } = [];
    public ICollection<UserRole> UserRoles { get; set; } = [];
    public ICollection<StudentApplication> StudentApplications { get; set; } = [];
}
