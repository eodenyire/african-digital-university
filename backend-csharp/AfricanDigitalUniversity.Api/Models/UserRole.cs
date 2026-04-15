namespace AfricanDigitalUniversity.Api.Models;

public enum AppRole
{
    Admin,
    Student
}

public class UserRole
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public AppRole Role { get; set; }
    public DateTime CreatedAt { get; set; }

    // Navigation
    public User? User { get; set; }
}
