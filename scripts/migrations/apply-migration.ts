import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'node:url';
import { getDatabaseConnection } from '~/lib/database.server';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MIGRATIONS_DIR = path.join(__dirname, '..', '..', 'db', 'migrations');

// 🛠️ Connect to DB
console.log('🔌 Connecting to database...');
const connection = await getDatabaseConnection({ init: false });
console.log('✅ Database connected');

async function main() {
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS migrations (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) UNIQUE,
      applied_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  const [rows] = await connection.execute('SELECT name FROM migrations');
  const applied = new Set((rows as any[]).map((row) => row.name));

  const files = fs
    .readdirSync(MIGRATIONS_DIR)
    .filter((f) => f.endsWith('.sql') && !f.endsWith('.down.sql'))
    .sort();

  for (const file of files) {
    if (applied.has(file)) {
      console.log(`✅ Skipping already applied: ${file}`);
      continue;
    }

    const sql = fs.readFileSync(path.join(MIGRATIONS_DIR, file), 'utf8');
    console.log(`🚀 Applying: ${file}`);

    try {
      await connection.query(sql);
      await connection.execute('INSERT INTO migrations (name) VALUES (?)', [
        file,
      ]);
    } catch (err) {
      console.error(`❌ Failed to apply ${file}:`, err);
      process.exit(1);
    }
  }

  console.log('✅ All new migrations applied.');
  await connection.end();
}

main();
