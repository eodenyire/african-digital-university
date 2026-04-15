namespace AfricanDigitalUniversity.Api.DTOs;

public record AssignmentSubmissionDto(
    Guid Id,
    Guid AssignmentId,
    Guid UserId,
    string? Content,
    string? FileUrl,
    int? Score,
    string? Feedback,
    DateTime SubmittedAt,
    DateTime? GradedAt
);

public record CreateSubmissionRequest(
    Guid AssignmentId,
    Guid UserId,
    string? Content,
    string? FileUrl
);

public record UpdateSubmissionRequest(
    string? Content,
    string? FileUrl
);
