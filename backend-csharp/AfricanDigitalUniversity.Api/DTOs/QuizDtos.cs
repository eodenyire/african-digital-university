namespace AfricanDigitalUniversity.Api.DTOs;

public record QuizDto(
    Guid Id,
    Guid CourseId,
    string Title,
    string? Description,
    int? TimeLimitMinutes,
    int PassPercentage,
    int OrderIndex,
    bool IsPublished,
    DateTime CreatedAt
);
