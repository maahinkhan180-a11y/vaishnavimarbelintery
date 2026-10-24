-- Add missing slug column to products table
-- The slug column was defined in the schema but never created in the actual table

-- Add slug column if it doesn't exist
ALTER TABLE products ADD COLUMN IF NOT EXISTS slug text;

-- Ensure all products have a slug (generate from name if needed)
UPDATE products SET slug = COALESCE(slug, lower(replace(name, ' ', '-'))) WHERE slug IS NULL;

-- Make slug NOT NULL and unique per subcategory
ALTER TABLE products ALTER COLUMN slug SET NOT NULL;

-- Add the unique constraint (if not already present)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE table_name = 'products' AND constraint_name = 'products_subcategory_id_slug_key'
  ) THEN
    ALTER TABLE products ADD CONSTRAINT products_subcategory_id_slug_key UNIQUE (subcategory_id, slug);
  END IF;
END $$;

-- Create index for slug lookups
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
