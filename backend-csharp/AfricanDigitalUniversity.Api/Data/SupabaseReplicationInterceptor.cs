using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace AfricanDigitalUniversity.Api.Data;

/// <summary>
/// EF Core SaveChanges interceptor that transparently replicates every write made
/// to AppDbContext (the local adu-africa database) to the Supabase database via
/// SupabaseDbContext.  Replication is best-effort: failures are logged but never
/// cause the primary save to roll back.  When the Supabase connection is not
/// configured the interceptor is a no-op.
/// </summary>
public class SupabaseReplicationInterceptor(
    IServiceScopeFactory scopeFactory,
    IConfiguration configuration,
    ILogger<SupabaseReplicationInterceptor> logger) : SaveChangesInterceptor
{
    private bool IsSupabaseEnabled =>
        !string.IsNullOrWhiteSpace(configuration.GetConnectionString("SupabaseConnection"))
        && !configuration.GetConnectionString("SupabaseConnection")!
               .Contains("YOUR_SUPABASE_DB_PASSWORD");

    public override async ValueTask<InterceptionResult<int>> SavingChangesAsync(
        DbContextEventData eventData,
        InterceptionResult<int> result,
        CancellationToken cancellationToken = default)
    {
        // Guard: never replicate inside SupabaseDbContext itself (no infinite loop)
        if (eventData.Context is SupabaseDbContext)
            return await base.SavingChangesAsync(eventData, result, cancellationToken);

        // Skip when Supabase is not configured
        if (!IsSupabaseEnabled)
            return await base.SavingChangesAsync(eventData, result, cancellationToken);

        // Snapshot the pending changes before they are written to the primary DB
        var snapshots = eventData.Context!.ChangeTracker.Entries()
            .Where(e => e.State is EntityState.Added or EntityState.Modified or EntityState.Deleted)
            .Select(e => new EntitySnapshot(
                e.Entity.GetType(),
                e.State,
                e.State != EntityState.Deleted
                    ? e.CurrentValues.Clone()
                    : null,
                e.OriginalValues.Clone()))
            .ToList();

        if (snapshots.Count > 0)
        {
            // Fire-and-forget: do not await — the primary save should not be delayed
            _ = ReplicateAsync(snapshots);
        }

        return await base.SavingChangesAsync(eventData, result, cancellationToken);
    }

    private async Task ReplicateAsync(IReadOnlyList<EntitySnapshot> snapshots)
    {
        try
        {
            using var scope = scopeFactory.CreateScope();
            var supabase = scope.ServiceProvider.GetRequiredService<SupabaseDbContext>();

            foreach (var snapshot in snapshots)
            {
                var entity = Activator.CreateInstance(snapshot.EntityType)!;
                var entry = supabase.Entry(entity);

                if (snapshot.State == EntityState.Deleted)
                {
                    // Apply PK / original values so EF Core can generate the DELETE
                    entry.OriginalValues.SetValues(snapshot.OriginalValues!);
                    entry.State = EntityState.Deleted;
                }
                else
                {
                    // Apply all current values (includes the updated UpdatedAt)
                    entry.CurrentValues.SetValues(snapshot.CurrentValues!);
                    entry.State = snapshot.State;
                }
            }

            await supabase.SaveChangesAsync();
            logger.LogDebug("Replicated {Count} entity change(s) to Supabase database.", snapshots.Count);
        }
        catch (Exception ex)
        {
            logger.LogError(ex,
                "Failed to replicate {Count} entity change(s) to Supabase database. " +
                "Primary (adu-africa) database was not affected.",
                snapshots.Count);
        }
    }

    private sealed record EntitySnapshot(
        Type EntityType,
        EntityState State,
        Microsoft.EntityFrameworkCore.ChangeTracking.PropertyValues? CurrentValues,
        Microsoft.EntityFrameworkCore.ChangeTracking.PropertyValues? OriginalValues);
}
