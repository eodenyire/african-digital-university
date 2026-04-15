namespace AfricanDigitalUniversity.Api.DTOs;

public record CourseDto(
    Guid Id,
    string SchoolSlug,
    string CourseCode,
    string Title,
    string? Description,
    int Semester,
    int Year,
    int Credits,
    int OrderIndex,
    bool IsPublished,
    DateTime CreatedAt,
    DateTime UpdatedAt
);
