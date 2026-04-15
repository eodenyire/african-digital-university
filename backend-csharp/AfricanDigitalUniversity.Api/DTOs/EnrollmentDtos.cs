namespace AfricanDigitalUniversity.Api.DTOs;

public record EnrollmentDto(
    Guid Id,
    Guid UserId,
    Guid CourseId,
    DateTime EnrolledAt,
    DateTime? CompletedAt,
    CourseDto? Course
);

public record CreateEnrollmentRequest(Guid UserId, Guid CourseId);
