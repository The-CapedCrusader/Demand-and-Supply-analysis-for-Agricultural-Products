import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'node:url';
import { getDatabaseConnection } from '~/lib/database.server';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MIGRATIONS_JSON_PATH = path.join(__dirname, '..', 'db', 'migrations.json');
const MIGRATIONS_TABLE = 'migrations_json';

// Read migrations.json
const migrationsConfig = JSON.parse(
  fs.readFileSync(MIGRATIONS_JSON_PATH, 'utf-8')
);

// Split SQL into individual statements
function splitSqlStatements(sql: string): string[] {
  // Split on semicolons that are followed by a new line or end of string
  return sql
    .split(/;\s*[\r\n]+|;\s*$/)
    .map(statement => statement.trim())
    .filter(statement => statement.length > 0);
}

async function run() {
  console.log('🔌 Connecting to database...');
  const connection = await getDatabaseConnection();
  console.log('✅ Connected to database');

  // Create migrations tracking table if it doesn't exist
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS ${MIGRATIONS_TABLE} (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) UNIQUE,
      applied_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Get already applied migrations
  const [rows] = await connection.execute(`SELECT name FROM ${MIGRATIONS_TABLE}`);
  const applied = new Set((rows as any[]).map((row) => row.name));

  // Process migrations
  for (const migration of migrationsConfig.migrations) {
    if (applied.has(migration.name)) {
      console.log(`✅ Migration "${migration.name}" already applied`);
      continue;
    }

    console.log(`🚀 Applying migration: ${migration.name}`);
    
    try {
      // Read migration SQL
      const upSqlPath = path.join(__dirname, '..', migration.up);
      if (!fs.existsSync(upSqlPath)) {
        throw new Error(`Migration file not found: ${upSqlPath}`);
      }
      
      const sql = fs.readFileSync(upSqlPath, 'utf-8');
      const statements = splitSqlStatements(sql);
      
      // Execute each statement separately
      for (const statement of statements) {
        if (statement.trim() === '') continue;
        
        // Skip comments-only statements
        if (statement.trim().startsWith('--') && !statement.includes('CREATE') && !statement.includes('INSERT')) {
          continue;
        }
        
        console.log(`Executing statement: ${statement.substring(0, 60)}...`);
        await connection.query(statement);
      }
      
      // Mark as applied
      await connection.execute(
        `INSERT INTO ${MIGRATIONS_TABLE} (name) VALUES (?)`,
        [migration.name]
      );
      
      console.log(`✅ Successfully applied: ${migration.name}`);
    } catch (err) {
      console.error(`❌ Failed to apply ${migration.name}:`, err);
      process.exit(1);
    }
  }

  console.log('✅ All migrations applied');
  await connection.end();
}

run().catch((err) => {
  console.error('❌ Migration error:', err);
  process.exit(1);
}); 