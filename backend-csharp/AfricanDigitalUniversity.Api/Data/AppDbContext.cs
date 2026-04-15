using Microsoft.EntityFrameworkCore;
using AfricanDigitalUniversity.Api.Models;

namespace AfricanDigitalUniversity.Api.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<User> Users => Set<User>();
    public DbSet<Profile> Profiles => Set<Profile>();
    public DbSet<Course> Courses => Set<Course>();
    public DbSet<Enrollment> Enrollments => Set<Enrollment>();
    public DbSet<Lesson> Lessons => Set<Lesson>();
    public DbSet<LessonProgress> LessonProgresses => Set<LessonProgress>();
    public DbSet<Assignment> Assignments => Set<Assignment>();
    public DbSet<AssignmentSubmission> AssignmentSubmissions => Set<AssignmentSubmission>();
    public DbSet<Quiz> Quizzes => Set<Quiz>();
    public DbSet<QuizQuestion> QuizQuestions => Set<QuizQuestion>();
    public DbSet<QuizAttempt> QuizAttempts => Set<QuizAttempt>();
    public DbSet<UserRole> UserRoles => Set<UserRole>();
    public DbSet<StudentApplication> StudentApplications => Set<StudentApplication>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // ── Users ──────────────────────────────────────────────────────────
        modelBuilder.Entity<User>(e =>
        {
            e.ToTable("users");
            e.HasKey(x => x.Id);
            e.Property(x => x.Id).HasDefaultValueSql("gen_random_uuid()");
            e.Property(x => x.Email).IsRequired();
            e.Property(x => x.PasswordHash).IsRequired();
            e.Property(x => x.RawUserMetaData).HasColumnType("jsonb");
            e.Property(x => x.CreatedAt).HasDefaultValueSql("now()");
            e.Property(x => x.UpdatedAt).HasDefaultValueSql("now()");
            e.HasIndex(x => x.Email).IsUnique();
        });

        // ── Profiles ───────────────────────────────────────────────────────
        modelBuilder.Entity<Profile>(e =>
        {
            e.ToTable("profiles");
            e.HasKey(x => x.Id);
            e.Property(x => x.Id).HasDefaultValueSql("gen_random_uuid()");
            e.Property(x => x.FullName).IsRequired().HasDefaultValue("");
            e.Property(x => x.CreatedAt).HasDefaultValueSql("now()");
            e.Property(x => x.UpdatedAt).HasDefaultValueSql("now()");
            e.HasIndex(x => x.UserId).IsUnique();
            e.HasOne(x => x.User)
             .WithOne(u => u.Profile)
             .HasForeignKey<Profile>(x => x.UserId)
             .OnDelete(DeleteBehavior.Cascade);
        });

        // ── Courses ────────────────────────────────────────────────────────
        modelBuilder.Entity<Course>(e =>
        {
            e.ToTable("courses");
            e.HasKey(x => x.Id);
            e.Property(x => x.Id).HasDefaultValueSql("gen_random_uuid()");
            e.Property(x => x.SchoolSlug).IsRequired();
            e.Property(x => x.CourseCode).IsRequired();
            e.Property(x => x.Title).IsRequired();
            e.Property(x => x.Semester).HasDefaultValue(1);
            e.Property(x => x.Year).HasDefaultValue(1);
            e.Property(x => x.Credits).HasDefaultValue(3);
            e.Property(x => x.CreatedAt).HasDefaultValueSql("now()");
            e.Property(x => x.UpdatedAt).HasDefaultValueSql("now()");
            e.HasIndex(x => x.CourseCode).IsUnique();
            e.HasIndex(x => x.SchoolSlug);
        });

        // ── Enrollments ────────────────────────────────────────────────────
        modelBuilder.Entity<Enrollment>(e =>
        {
            e.ToTable("enrollments");
            e.HasKey(x => x.Id);
            e.Property(x => x.Id).HasDefaultValueSql("gen_random_uuid()");
            e.Property(x => x.EnrolledAt).HasDefaultValueSql("now()");
            e.HasIndex(x => new { x.UserId, x.CourseId }).IsUnique();
            e.HasIndex(x => x.UserId);
            e.HasOne(x => x.User)
             .WithMany(u => u.Enrollments)
             .HasForeignKey(x => x.UserId)
             .OnDelete(DeleteBehavior.Cascade);
            e.HasOne(x => x.Course)
             .WithMany(c => c.Enrollments)
             .HasForeignKey(x => x.CourseId)
             .OnDelete(DeleteBehavior.Cascade);
        });

        // ── Lessons ────────────────────────────────────────────────────────
        modelBuilder.Entity<Lesson>(e =>
        {
            e.ToTable("lessons");
            e.HasKey(x => x.Id);
            e.Property(x => x.Id).HasDefaultValueSql("gen_random_uuid()");
            e.Property(x => x.Title).IsRequired();
            e.Property(x => x.LessonType)
             .HasConversion<string>()
             .HasColumnName("lesson_type");
            e.Property(x => x.CreatedAt).HasDefaultValueSql("now()");
            e.Property(x => x.UpdatedAt).HasDefaultValueSql("now()");
            e.HasIndex(x => x.CourseId);
            e.HasOne(x => x.Course)
             .WithMany(c => c.Lessons)
             .HasForeignKey(x => x.CourseId)
             .OnDelete(DeleteBehavior.Cascade);
        });

        // ── LessonProgress ─────────────────────────────────────────────────
        modelBuilder.Entity<LessonProgress>(e =>
        {
            e.ToTable("lesson_progress");
            e.HasKey(x => x.Id);
            e.Property(x => x.Id).HasDefaultValueSql("gen_random_uuid()");
            e.HasIndex(x => new { x.UserId, x.LessonId }).IsUnique();
            e.HasIndex(x => x.UserId);
            e.HasOne(x => x.User)
             .WithMany(u => u.LessonProgresses)
             .HasForeignKey(x => x.UserId)
             .OnDelete(DeleteBehavior.Cascade);
            e.HasOne(x => x.Lesson)
             .WithMany(l => l.LessonProgresses)
             .HasForeignKey(x => x.LessonId)
             .OnDelete(DeleteBehavior.Cascade);
        });

        // ── Assignments ────────────────────────────────────────────────────
        modelBuilder.Entity<Assignment>(e =>
        {
            e.ToTable("assignments");
            e.HasKey(x => x.Id);
            e.Property(x => x.Id).HasDefaultValueSql("gen_random_uuid()");
            e.Property(x => x.Title).IsRequired();
            e.Property(x => x.MaxScore).HasDefaultValue(100);
            e.Property(x => x.CreatedAt).HasDefaultValueSql("now()");
            e.HasIndex(x => x.CourseId);
            e.HasOne(x => x.Course)
             .WithMany(c => c.Assignments)
             .HasForeignKey(x => x.CourseId)
             .OnDelete(DeleteBehavior.Cascade);
        });

        // ── AssignmentSubmissions ──────────────────────────────────────────
        modelBuilder.Entity<AssignmentSubmission>(e =>
        {
            e.ToTable("assignment_submissions");
            e.HasKey(x => x.Id);
            e.Property(x => x.Id).HasDefaultValueSql("gen_random_uuid()");
            e.Property(x => x.SubmittedAt).HasDefaultValueSql("now()");
            e.HasIndex(x => new { x.AssignmentId, x.UserId }).IsUnique();
            e.HasOne(x => x.Assignment)
             .WithMany(a => a.Submissions)
             .HasForeignKey(x => x.AssignmentId)
             .OnDelete(DeleteBehavior.Cascade);
            e.HasOne(x => x.User)
             .WithMany(u => u.AssignmentSubmissions)
             .HasForeignKey(x => x.UserId)
             .OnDelete(DeleteBehavior.Cascade);
        });

        // ── Quizzes ────────────────────────────────────────────────────────
        modelBuilder.Entity<Quiz>(e =>
        {
            e.ToTable("quizzes");
            e.HasKey(x => x.Id);
            e.Property(x => x.Id).HasDefaultValueSql("gen_random_uuid()");
            e.Property(x => x.Title).IsRequired();
            e.Property(x => x.PassPercentage).HasDefaultValue(60);
            e.Property(x => x.CreatedAt).HasDefaultValueSql("now()");
            e.HasIndex(x => x.CourseId);
            e.HasOne(x => x.Course)
             .WithMany(c => c.Quizzes)
             .HasForeignKey(x => x.CourseId)
             .OnDelete(DeleteBehavior.Cascade);
        });

        // ── QuizQuestions ──────────────────────────────────────────────────
        modelBuilder.Entity<QuizQuestion>(e =>
        {
            e.ToTable("quiz_questions");
            e.HasKey(x => x.Id);
            e.Property(x => x.Id).HasDefaultValueSql("gen_random_uuid()");
            e.Property(x => x.Question).IsRequired();
            e.Property(x => x.QuestionType)
             .HasConversion<string>()
             .HasColumnName("question_type");
            e.Property(x => x.Options).HasColumnType("jsonb");
            e.Property(x => x.CorrectAnswer).IsRequired();
            e.Property(x => x.Points).HasDefaultValue(1);
            e.HasOne(x => x.Quiz)
             .WithMany(q => q.Questions)
             .HasForeignKey(x => x.QuizId)
             .OnDelete(DeleteBehavior.Cascade);
        });

        // ── QuizAttempts ───────────────────────────────────────────────────
        modelBuilder.Entity<QuizAttempt>(e =>
        {
            e.ToTable("quiz_attempts");
            e.HasKey(x => x.Id);
            e.Property(x => x.Id).HasDefaultValueSql("gen_random_uuid()");
            e.Property(x => x.Answers).HasColumnType("jsonb").HasDefaultValueSql("'{}'");
            e.Property(x => x.StartedAt).HasDefaultValueSql("now()");
            e.HasOne(x => x.Quiz)
             .WithMany(q => q.Attempts)
             .HasForeignKey(x => x.QuizId)
             .OnDelete(DeleteBehavior.Cascade);
            e.HasOne(x => x.User)
             .WithMany(u => u.QuizAttempts)
             .HasForeignKey(x => x.UserId)
             .OnDelete(DeleteBehavior.Cascade);
        });

        // ── UserRoles ──────────────────────────────────────────────────────
        modelBuilder.Entity<UserRole>(e =>
        {
            e.ToTable("user_roles");
            e.HasKey(x => x.Id);
            e.Property(x => x.Id).HasDefaultValueSql("gen_random_uuid()");
            e.Property(x => x.Role)
             .HasConversion<string>()
             .HasColumnName("role");
            e.Property(x => x.CreatedAt).HasDefaultValueSql("now()");
            e.HasIndex(x => new { x.UserId, x.Role }).IsUnique();
            e.HasOne(x => x.User)
             .WithMany(u => u.UserRoles)
             .HasForeignKey(x => x.UserId)
             .OnDelete(DeleteBehavior.Cascade);
        });

        // ── StudentApplications ────────────────────────────────────────────
        modelBuilder.Entity<StudentApplication>(e =>
        {
            e.ToTable("student_applications");
            e.HasKey(x => x.Id);
            e.Property(x => x.Id).HasDefaultValueSql("gen_random_uuid()");
            e.Property(x => x.FullName).IsRequired();
            e.Property(x => x.Email).IsRequired();
            e.Property(x => x.SchoolSlug).IsRequired();
            e.Property(x => x.Status).HasDefaultValue("pending");
            e.Property(x => x.CreatedAt).HasDefaultValueSql("now()");
            e.Property(x => x.UpdatedAt).HasDefaultValueSql("now()");
            e.HasOne(x => x.User)
             .WithMany(u => u.StudentApplications)
             .HasForeignKey(x => x.UserId)
             .OnDelete(DeleteBehavior.Cascade);
        });
    }

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        // Replicate update_updated_at_column trigger
        var entries = ChangeTracker.Entries()
            .Where(e => e.State == EntityState.Modified);

        foreach (var entry in entries)
        {
            if (entry.Entity is Profile p) p.UpdatedAt = DateTime.UtcNow;
            else if (entry.Entity is Course c) c.UpdatedAt = DateTime.UtcNow;
            else if (entry.Entity is Lesson l) l.UpdatedAt = DateTime.UtcNow;
            else if (entry.Entity is StudentApplication sa) sa.UpdatedAt = DateTime.UtcNow;
            else if (entry.Entity is User u) u.UpdatedAt = DateTime.UtcNow;
        }

        return base.SaveChangesAsync(cancellationToken);
    }
}
