namespace AfricanDigitalUniversity.Api.Data;

public sealed record SupabaseConnectionInfo(string? ConnectionString)
{
    public bool IsConfigured =>
        !string.IsNullOrWhiteSpace(ConnectionString)
        && !ConnectionString.Contains("YOUR_SUPABASE_DB_PASSWORD", StringComparison.Ordinal);
}
