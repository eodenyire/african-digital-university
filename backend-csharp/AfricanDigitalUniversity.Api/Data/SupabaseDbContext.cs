using Microsoft.EntityFrameworkCore;

namespace AfricanDigitalUniversity.Api.Data;

/// <summary>
/// Secondary DbContext pointing to the Supabase-hosted PostgreSQL database.
/// It inherits the full schema from AppDbContext and is used as a replication
/// target so every write lands in both the local adu-africa database and the
/// Supabase cloud database.
/// </summary>
public class SupabaseDbContext(DbContextOptions<SupabaseDbContext> options) : AppDbContext(options) { }
