namespace AfricanDigitalUniversity.Api.DTOs;

public record AssignmentDto(
    Guid Id,
    Guid CourseId,
    string Title,
    string? Description,
    DateTime? DueDate,
    int MaxScore,
    int OrderIndex,
    bool IsPublished,
    DateTime CreatedAt
);
