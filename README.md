# Vaishnavi Marble & Interiors

Storefront built with React, Vite, and a MySQL-backed Vercel API.

## Local development

1. Create a MySQL database and run [`database/mysql-schema.sql`](./database/mysql-schema.sql).
2. Configure these environment variables in the shell running Vercel CLI and in Vercel Project Settings:

   | Variable | Purpose |
   | --- | --- |
   | `MYSQL_HOST` | MySQL server host |
   | `MYSQL_PORT` | MySQL server port (defaults to `3306`) |
   | `MYSQL_USER` | Database user |
   | `MYSQL_PASSWORD` | Database password |
   | `MYSQL_DATABASE` | Database name |
   | `MYSQL_SSL` | Set to `true` when the MySQL provider requires TLS |
   | `ADMIN_EMAIL` | Admin login email |
   | `ADMIN_PASSWORD` | Strong admin password |
   | `ADMIN_SESSION_SECRET` | Long, random secret used to sign admin sessions |

   Keep these values server-side. Do not add them to `VITE_*` variables or commit them.
3. Run `npm install`, then start the app and its Vercel API functions with `npx vercel dev`.

Vercel serves the `/api` functions alongside the static storefront. The admin login uses an
HTTP-only, same-site cookie; all catalog and blog writes require a valid admin session.

## Supabase data transfer

The app no longer uses the Supabase client or Supabase environment variables. The SQL schema
creates equivalent MySQL tables, but it does not copy data from a Supabase project. Export the
existing `categories`, `subcategories`, `products`, and `blog_articles` data from Supabase,
convert PostgreSQL UUIDs and `jsonb`/`text[]` fields to MySQL-compatible values (`specs` and
`tags` are JSON), then import those records into the matching MySQL tables. Preserve IDs and
foreign-key relationships during the import. Verify product counts, blog publication state,
and image URLs before pointing the production site at the new database.

The MySQL and admin credentials are required to run the API in production. No database
credentials or Supabase export were present in this workspace, so the schema and API are
implemented here but existing production records cannot be copied or a live database
connection verified from this repository alone.

The existing `supabase/migrations` directory is retained as historical schema reference only;
the storefront no longer runs those migrations or contacts Supabase.
