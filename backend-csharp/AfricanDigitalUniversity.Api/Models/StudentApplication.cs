namespace AfricanDigitalUniversity.Api.Models;

public class StudentApplication
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? Phone { get; set; }
    public string SchoolSlug { get; set; } = string.Empty;
    public string? Motivation { get; set; }
    public string Status { get; set; } = "pending"; // pending | approved | rejected
    public Guid? ReviewedBy { get; set; }
    public DateTime? ReviewedAt { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

    // Navigation
    public User? User { get; set; }
}
