namespace AfricanDigitalUniversity.Api.DTOs;

public record SignUpRequest(string Email, string Password, string FullName);
public record SignInRequest(string Email, string Password);

public record AuthResponse(
    string AccessToken,
    string TokenType,
    int ExpiresIn,
    UserDto User
);

public record UserDto(
    Guid Id,
    string Email,
    DateTime CreatedAt
);

public record SessionResponse(UserDto? User);
