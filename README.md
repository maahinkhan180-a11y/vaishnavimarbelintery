# Vaishnavi Marble & Interiors

Storefront built with React, Vite, Express, and MySQL. The same Node.js app serves the frontend and API.

## Local development

1. Create a MySQL database and run [`database/mysql-schema.sql`](./database/mysql-schema.sql). This single file creates all four tables and inserts the catalog data available here, including Marble Statues, Marble Home Interiors, and the 48 Tiles subcategories shown in the supplied screenshots. It is safe to run again; existing seed records are left unchanged.
2. Copy `.env.example` to `.env` for local development and fill in your local MySQL and admin settings. In Hostinger, add the same values using the Node.js app environment-variable settings; do not upload or commit `.env`.

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

## Hostinger deployment

1. In hPanel, create a MySQL database and user, grant that user access, and note the hostname,
   port, database name, username, and password. The database host may not be `localhost`.
2. Create the tables and repository seed data by importing `database/mysql-schema.sql` in
   phpMyAdmin's **Import** tab. Alternatively, from Command Prompt in the project root run:

   ```text
   mysql -h YOUR_MYSQL_HOST -P 3306 -u YOUR_MYSQL_USER -p YOUR_MYSQL_DATABASE < database/mysql-schema.sql
   ```

   Enter the database password when prompted. This initializes the schema and the sample data
   available in this repository; it does not contain a live Supabase export.
3. Use a Hostinger plan with Node.js application support. Upload the project or connect its Git
   repository, choose the project root, and set the Node.js version supported by Hostinger.
4. Set the build command to `npm install && npm run build` and the start command to `npm start`.
   Configure the environment variables below in the Hostinger Node.js app settings, then start
   or restart the application. Hostinger provides the port; the app listens on `process.env.PORT`.
5. Open `https://YOUR_DOMAIN/api/health`. A working database connection returns
   `{"databaseConnected":true}`. If it returns `503`, check the MySQL host, credentials, user
   permissions, and TLS setting in hPanel.

The admin login uses an HTTP-only, same-site cookie; all catalog and blog writes require a valid
admin session. Use a long random `ADMIN_SESSION_SECRET` and strong admin password. Do not put
secrets in `VITE_*` variables or commit them.

## Supabase data transfer

The app no longer uses the Supabase client or Supabase environment variables. The SQL schema
creates equivalent MySQL tables and inserts the catalog seed records available here, including
the 48 Tiles subcategory names transcribed from the supplied screenshots. The screenshots do not
contain product records, prices, or product images, and no live Supabase export or database
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
