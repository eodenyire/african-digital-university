namespace AfricanDigitalUniversity.Api.DTOs;

public record LessonDto(
    Guid Id,
    Guid CourseId,
    string Title,
    string? Content,
    string? VideoUrl,
    string LessonType,
    int OrderIndex,
    int? DurationMinutes,
    bool IsPublished,
    DateTime CreatedAt,
    DateTime UpdatedAt
);
