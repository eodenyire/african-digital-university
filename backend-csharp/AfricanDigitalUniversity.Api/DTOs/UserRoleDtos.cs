namespace AfricanDigitalUniversity.Api.DTOs;

public record UserRoleDto(
    Guid Id,
    Guid UserId,
    string Role,
    DateTime CreatedAt
);

public record CreateUserRoleRequest(Guid UserId, string Role);
