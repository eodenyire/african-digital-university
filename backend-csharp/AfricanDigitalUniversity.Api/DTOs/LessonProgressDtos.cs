namespace AfricanDigitalUniversity.Api.DTOs;

public record LessonProgressDto(
    Guid Id,
    Guid UserId,
    Guid LessonId,
    bool Completed,
    DateTime? CompletedAt
);

public record UpsertLessonProgressRequest(
    Guid UserId,
    Guid LessonId,
    bool Completed,
    DateTime? CompletedAt
);
