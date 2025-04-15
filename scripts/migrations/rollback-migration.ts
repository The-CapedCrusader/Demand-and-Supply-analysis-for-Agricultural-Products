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
  const [rows] = await connection.query(
    'SELECT name FROM migrations ORDER BY applied_at DESC LIMIT 1'
  );

  if ((rows as any[]).length === 0) {
    console.log('📭 No migrations to rollback.');
    return;
  }

  const lastMigration = (rows as any[])[0].name;

  console.log(`📜 Last migration: ${lastMigration}`);

  const downFile = path.join(MIGRATIONS_DIR, lastMigration);

  console.log(`📂 Looking for down migration: ${downFile}`);

  if (!fs.existsSync(downFile)) {
    console.error(`❌ No down migration found for ${lastMigration}`);
    process.exit(1);
  }

  const downSQL = fs.readFileSync(downFile, 'utf-8');
  console.log(`🔙 Rolling back: ${lastMigration}`);

  try {
    await connection.query(downSQL);
    await connection.query('DELETE FROM migrations WHERE name = ?', [
      lastMigration,
    ]);
    console.log('✅ Rolled back:', lastMigration);
  } catch (err) {
    console.error('❌ Error rolling back migration:', err);
    process.exit(1);
  }

  await connection.end();
}

main();
