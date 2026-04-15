namespace AfricanDigitalUniversity.Api.DTOs;

public record QuizAttemptDto(
    Guid Id,
    Guid QuizId,
    Guid UserId,
    string Answers,
    int? Score,
    bool? Passed,
    DateTime StartedAt,
    DateTime? CompletedAt
);

public record CreateQuizAttemptRequest(Guid QuizId, Guid UserId, string? Answers);

public record UpdateQuizAttemptRequest(
    string? Answers,
    int? Score,
    bool? Passed,
    DateTime? CompletedAt
);
