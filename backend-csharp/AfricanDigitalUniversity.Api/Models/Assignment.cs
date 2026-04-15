namespace AfricanDigitalUniversity.Api.Models;

public class Assignment
{
    public Guid Id { get; set; }
    public Guid CourseId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public DateTime? DueDate { get; set; }
    public int MaxScore { get; set; } = 100;
    public int OrderIndex { get; set; }
    public bool IsPublished { get; set; }
    public DateTime CreatedAt { get; set; }

    // Navigation
    public Course? Course { get; set; }
    public ICollection<AssignmentSubmission> Submissions { get; set; } = [];
}
