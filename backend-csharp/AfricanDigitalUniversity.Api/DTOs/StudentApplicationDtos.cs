namespace AfricanDigitalUniversity.Api.DTOs;

public record StudentApplicationDto(
    Guid Id,
    Guid UserId,
    string FullName,
    string Email,
    string? Phone,
    string SchoolSlug,
    string? Motivation,
    string Status,
    Guid? ReviewedBy,
    DateTime? ReviewedAt,
    DateTime CreatedAt,
    DateTime UpdatedAt
);

public record CreateStudentApplicationRequest(
    Guid UserId,
    string FullName,
    string Email,
    string? Phone,
    string SchoolSlug,
    string? Motivation
);

public record ReviewApplicationRequest(
    string Status,
    Guid ReviewedBy,
    DateTime ReviewedAt
);
