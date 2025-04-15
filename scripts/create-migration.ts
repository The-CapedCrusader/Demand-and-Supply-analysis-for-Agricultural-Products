import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MIGRATIONS_DIR = path.join(__dirname, '..', 'db', 'migrations');

const typeMapper: Record<string, string> = {
  int: 'INT',
  text: 'TEXT',
  object: 'JSON',
  bool: 'BOOLEAN',
  datetime: 'DATETIME',
  string: 'VARCHAR(255)',
  decimal: 'DECIMAL(10,2)',
};

const getTimestamp = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `${year}${month}${day}_${hours}${minutes}${seconds}`;
};

const parseColumns = (columnsArg: string): string[] => {
  if (!columnsArg) return [];

  if (!columnsArg.includes(':')) {
    console.error('❌ Invalid columns format. Use "name:type" pairs.');
    process.exit(1);
  }

  return columnsArg.split(',').map((pair) => {
    const [name, type] = pair.trim().split(':');
    const isNullable = type.endsWith('?');

    const columnName = name.charAt(0).toUpperCase() + name.slice(1);

    const columnType = isNullable
      ? typeMapper[type.slice(0, -1)]
      : typeMapper[type];

    if (!columnType) {
      console.error(`❌ Invalid type "${type}" for column "${name}".`);
      process.exit(1);
    }

    const columnDefinition = `${columnName} ${columnType}`;
    return isNullable ? `${columnDefinition}` : `${columnDefinition} NOT NULL`;
  });
};

export const createMigrationFile = ({
  name,
  table,
  columns,
}: {
  name: string;
  table?: string;
  columns: string[];
}) => {
  if (!fs.existsSync(MIGRATIONS_DIR)) {
    fs.mkdirSync(MIGRATIONS_DIR, { recursive: true });
  }

  const timestamp = getTimestamp();
  const baseName = `${timestamp}_${name}`;
  const upPath = path.join(MIGRATIONS_DIR, `${baseName}_up.sql`);
  const downPath = path.join(MIGRATIONS_DIR, `${baseName}_down.sql`);

  let upSQL = '';
  let downSQL = '';

  if (/^create_(\w+)_table$/.test(name) && table) {
    const formattedColumns =
      columns.length > 0 ? `,\n\t  ${columns.join(',\t\n\t  ')}` : '';

    upSQL = `CREATE TABLE IF NOT EXISTS ${table} (
      id INT AUTO_INCREMENT PRIMARY KEY${formattedColumns},
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );`;

    downSQL = `DROP TABLE IF EXISTS ${table};`;
  } else if (/^add_columns_to_(\w+)$/.test(name) && table) {
    upSQL = columns
      .map((col) => `ALTER TABLE ${table} ADD COLUMN ${col};`)
      .join('\n');

    downSQL = columns
      .map((col) => {
        const name = col.split(' ')[0];
        return `ALTER TABLE ${table} DROP COLUMN ${name};`;
      })
      .join('\n');
  } else if (/^modify_columns_in_(\w+)$/.test(name) && table) {
    upSQL = columns
      .map((col) => `ALTER TABLE ${table} MODIFY COLUMN ${col};`)
      .join('\n');

    downSQL = '-- 🔁 Revert MODIFY manually if needed';
  } else if (/^drop_columns_from_(\w+)$/.test(name) && table) {
    upSQL = columns
      .map((col) => {
        const colName = col.split(' ')[0];
        return `ALTER TABLE ${table} DROP COLUMN ${colName};`;
      })
      .join('\n');

    downSQL = '-- 🔁 Revert DROP manually with ADD COLUMN';
  } else {
    upSQL = '-- Write your SQL UP migration here';
    downSQL = '-- Write your SQL DOWN migration here';
  }

  fs.writeFileSync(upPath, `${upSQL}\n`);
  fs.writeFileSync(downPath, `${downSQL}\n`);

  console.log(`✅ Created migration files:\n- ${upPath}\n- ${downPath}`);
};

const args = process.argv.slice(2);
const [name] = args;

if (!name) {
  console.error('❌ Migration name is required');
  process.exit(1);
}

const flags = args.reduce((acc: Record<string, string>, arg, index) => {
  if (arg.startsWith('--')) {
    const key = arg.slice(2);
    const value = args[index + 1];

    if (!value || value.startsWith('--')) {
      console.error(`❌ Missing value for flag: --${key}`);
      process.exit(1);
    }

    acc[key] = value;
  }
  return acc;
}, {});

const table = flags.table.toUpperCase();
const columns = parseColumns(flags.columns);

createMigrationFile({ name, table, columns });
