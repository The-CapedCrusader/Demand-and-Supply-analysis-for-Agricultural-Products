import path from 'node:path';
import fs from 'node:fs/promises';
import { DBDIR } from '~/lib/constants';
import { fileURLToPath } from 'node:url';
import { getDatabaseConnection } from '~/lib/database.server';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbBasePath = path.join(__dirname, '..', DBDIR);

const ORDERED_FOLDERS = [
  '0001_init',
  '0002_seed',
  '0003_procedures',
  '0004_views',
];

const connection = await getDatabaseConnection({ init: true });

console.log('🔌 Connected to database');

// Get all .sql files from ordered folders, in correct execution order
const getSQLFilePaths = async (): Promise<{ file: string; path: string }[]> => {
  const all: { file: string; path: string }[] = [];

  for (const folder of ORDERED_FOLDERS) {
    const dir = path.join(dbBasePath, folder);
    try {
      const files = await fs.readdir(dir);
      const sqlFiles = files.filter((f) => f.endsWith('.sql')).sort();
      sqlFiles.forEach((file) => {
        all.push({ file, path: path.join(dir, file) });
      });
    } catch {
      // Folder doesn't exist — skip
      console.warn(`⚠️ Folder ${folder} does not exist. Skipping...`);
    }
  }

  return all;
};

// Read and parse SQL file with --SQLEND delimiter
const parseSQLFile = async (filePath: string) => {
  const raw = await fs.readFile(filePath, 'utf-8');
  return raw
    .replace(/\r/g, '') // Normalize line endings
    .split(/--SQLEND/gm)
    .map((s) => s.trim())
    .filter(Boolean);
};

const run = async () => {
  const files = await getSQLFilePaths();
  let success = 0;
  let failure = 0;

  for (const { file, path: filePath } of files) {
    const statements = await parseSQLFile(filePath);
    console.log(`📄 ${file} → ${statements.length} statement(s)`);

    for (let i = 0; i < statements.length; i++) {
      const sql = statements[i];
      try {
        await connection.query(sql);
        success++;
      } catch (err) {
        failure++;
        console.error(
          `❌ [${file}] Statement ${i + 1} failed:\n→ ${sql}\n↳ ${err}`
        );

        process.exit(1);
      }
    }
  }

  console.log(`\n✅ Executed ${success + failure} statements`);
  console.log(`   ✅ ${success} succeeded`);
  console.log(`   ❌ ${failure} failed`);

  await connection.end();
  process.exit(failure > 0 ? 1 : 0);
};

run().catch((err) => {
  console.error('🚨 Unexpected error:', err);
  process.exit(1);
});
