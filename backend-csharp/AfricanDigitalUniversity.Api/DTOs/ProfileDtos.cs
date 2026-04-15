namespace AfricanDigitalUniversity.Api.DTOs;

public record ProfileDto(
    Guid Id,
    Guid UserId,
    string FullName,
    string? AvatarUrl,
    string? Bio,
    DateTime CreatedAt,
    DateTime UpdatedAt
);

public record UpdateProfileRequest(
    string? FullName,
    string? AvatarUrl,
    string? Bio
);
