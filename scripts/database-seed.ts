import path from 'node:path';
import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { getDatabaseConnection } from '~/lib/database.server';

// 📁 Handle __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 📄 Load SQL files
const seedPath = path.join(__dirname, 'seed.sql');
const seedSql = await fs.readFile(seedPath, 'utf-8');

// 🛠️ Connect to DB
console.log('🔌 Connecting to database...');
const connection = await getDatabaseConnection();
console.log('✅ Database connected');

// 🚀 Execute Seed Script
console.log('📦 Executing seed...');
await connection.execute(seedSql);
console.log('🎉 Seed executed successfully');

// 🔒 Close DB connection
console.log('🔒 Closing database connection...');
await connection.end();
console.log('✅ Database connection closed');
