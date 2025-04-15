import path from 'node:path';
import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { getDatabaseConnection } from '~/lib/database.server';

// 📁 Handle __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 📄 Load SQL files
const migrationPath = path.join(__dirname, 'migration.sql');
const migrationDropPath = path.join(__dirname, 'migration-drop.sql');
const migrationSql = await fs.readFile(migrationPath, 'utf-8');
const migrationDropSql = await fs.readFile(migrationDropPath, 'utf-8');

// 🛠️ Connect to DB
console.log('🔌 Connecting to database...');
const connection = await getDatabaseConnection({ init: false });
console.log('✅ Database connected');

// 🚀 Execute migration
console.log('📦 Executing migration...');
const [tables] = await connection.query('SHOW TABLES');
console.log('📋 Tables Before Migration:', tables);

await connection.execute(migrationDropSql);
await connection.execute(migrationSql);

const [tablesAfter] = await connection.query('SHOW TABLES');
console.log('📋 Tables After Migration:', tablesAfter);
console.log('🎉 Migration executed successfully');

// 🔒 Close DB connection
console.log('🔒 Closing database connection...');
await connection.end();
console.log('✅ Database connection closed');
