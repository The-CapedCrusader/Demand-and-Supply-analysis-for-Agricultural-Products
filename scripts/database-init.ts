import path from 'node:path';
import fs from 'node:fs/promises';
import { DBDIR } from '~/lib/constants';
import { fileURLToPath } from 'node:url';
import { getDatabaseConnection } from '~/lib/database.server';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbInitPath = path.join(__dirname, '..', DBDIR, 'init');

const listFiles = async (): Promise<string[]> => {
  try {
    return await fs.readdir(dbInitPath);
  } catch (err) {
    return [];
  }
};

const readAllFiles = async () => {
  try {
    const files = await listFiles();

    const fileContents = await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(dbInitPath, file);

        const fileContent = await fs.readFile(filePath, 'utf-8');

        const normalizedContent = fileContent
          .replace(/--.*$/gm, '')
          .replace(/\/\*[\s\S]*?\*\//g, '')
          .replace(/\r/g, '');

        return normalizedContent;
      })
    );

    return fileContents;
  } catch (error) {
    console.error('Error reading files:', error);
    return [];
  }
};

const executeSQLFiles = async () => {
  const fileContents = await readAllFiles();
  const allSQL = fileContents.join('\n');

  const statements = allSQL
    .split(';')
    .map((stmt) => stmt.trim())
    .filter((stmt) => stmt.length > 0);

  // 🛠️ Connect to DB
  console.log('🔌 Connecting to database...');
  const connection = await getDatabaseConnection();
  console.log('✅ Database connected');

  let successCount = 0;
  let failureCount = 0;

  for (const [index, statement] of statements.entries()) {
    try {
      await connection.query(statement);
      console.log(`✅ [${index + 1}/${statements.length}] Success`);
      successCount++;
    } catch (error) {
      console.error(
        `❌ [${index + 1}/${statements.length}] Failed\n→ ${statement}\n   ↳ ${error}`
      );

      failureCount++;
    }
  }

  console.log(`\n🎉 Done executing SQL files:`);
  console.log(`   ✅ ${successCount} succeeded`);
  console.log(`   ❌ ${failureCount} failed`);

  await connection.end();

  if (failureCount > 0) process.exit(1);
  process.exit(0);
};

try {
  await executeSQLFiles();
} catch (err) {
  console.error('🚨 Unexpected error:', err);
  process.exit(1);
}
