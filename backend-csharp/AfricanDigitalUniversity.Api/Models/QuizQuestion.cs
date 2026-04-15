namespace AfricanDigitalUniversity.Api.Models;

public enum QuestionType
{
    MultipleChoice,
    TrueFalse,
    ShortAnswer
}

public class QuizQuestion
{
    public Guid Id { get; set; }
    public Guid QuizId { get; set; }
    public string Question { get; set; } = string.Empty;
    public QuestionType QuestionType { get; set; } = QuestionType.MultipleChoice;
    public string? Options { get; set; } // JSONB stored as string
    public string CorrectAnswer { get; set; } = string.Empty;
    public int Points { get; set; } = 1;
    public int OrderIndex { get; set; }

    // Navigation
    public Quiz? Quiz { get; set; }
}
