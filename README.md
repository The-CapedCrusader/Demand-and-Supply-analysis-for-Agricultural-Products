# Krishok

A platform to track demand and supply of agricultural products in Bangladesh.

## Development

Please follow the steps below to setup the development environment.

### Database Migration

- `migration.sql` contains the SQL statements to create the table.
- `migration-drop.sql` contains the SQL statements to drop the table.
- Run `pnpm db:migrate` to apply the migrations.

> **Note**: Add the table drop statement to the `migration-drop.sql` file to drop the table before creating it. It will prevent from conflicts with the existing table.

### Database Seed

- `seed.sql` contains the SQL statements to seed the database.
- Run `pnpm db:seed` to seed the database.

> **Note**: Run the migration script before running the seed script.
