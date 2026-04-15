namespace AfricanDigitalUniversity.Api.Models;

public class Enrollment
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public Guid CourseId { get; set; }
    public DateTime EnrolledAt { get; set; }
    public DateTime? CompletedAt { get; set; }

    // Navigation
    public User? User { get; set; }
    public Course? Course { get; set; }
}
