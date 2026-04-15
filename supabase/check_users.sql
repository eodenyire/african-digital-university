SELECT "Email", LEFT("PasswordHash", 40) as hash_preview, "CreatedAt" FROM users ORDER BY "CreatedAt";
