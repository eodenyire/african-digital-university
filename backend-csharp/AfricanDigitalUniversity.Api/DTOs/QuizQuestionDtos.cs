namespace AfricanDigitalUniversity.Api.DTOs;

public record QuizQuestionDto(
    Guid Id,
    Guid QuizId,
    string Question,
    string QuestionType,
    string? Options,
    string CorrectAnswer,
    int Points,
    int OrderIndex
);
