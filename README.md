# Vaishnavi Marble & Interiors

Storefront built with React, Vite, Express, and MySQL. The same Node.js app serves the frontend and API.

## Local development

1. Create a MySQL database and run [`database/mysql-schema.sql`](./database/mysql-schema.sql). This single file creates all four tables and inserts the catalog seed records included in this repository (Marble Statues and Marble Home Interiors). It is safe to run again; existing seed records are left unchanged.
2. Configure these environment variables in your local shell and in Hostinger's Node.js app settings:

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
3. Run `npm install`, then start the app and API together with `npm run dev`.

For Hostinger, use a plan that supports Node.js applications, upload the project, run `npm install`
and `npm run build`, then set the start command to `npm start`. Set the app's `PORT` as required
by Hostinger and configure the MySQL connection values from hPanel. Use the database hostname
and credentials shown by Hostinger; don't assume the database host is `localhost`. The admin login
uses an HTTP-only, same-site cookie; all catalog and blog writes require a valid admin session.

## Supabase data transfer

The app no longer uses the Supabase client or Supabase environment variables. The SQL schema
creates equivalent MySQL tables and inserts the catalog seed records checked into this
repository. It cannot include live Supabase records because no Supabase export or database
credentials are present here. To migrate production data, export `categories`, `subcategories`,
`products`, and `blog_articles` from Supabase, convert PostgreSQL UUIDs and `jsonb`/`text[]`
fields to MySQL-compatible values (`specs` and `tags` are JSON), and import those records into
the matching MySQL tables. Preserve IDs and foreign-key relationships, and verify product
counts, blog publication state, and image URLs before pointing the production site at the new
database.

The MySQL and admin credentials are required to run the API in production. No database
credentials or Supabase export were present in this workspace, so the schema and API are
implemented here but existing production records cannot be copied or a live database
connection verified from this repository alone.

The existing `supabase/migrations` directory is retained as historical schema reference only;
the storefront no longer runs those migrations or contacts Supabase.
