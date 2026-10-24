-- Ensure subcategory_id column exists on products (in case table pre-existed without it)
ALTER TABLE products ADD COLUMN IF NOT EXISTS subcategory_id uuid;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE table_name = 'products' AND constraint_name = 'products_subcategory_id_fkey'
  ) THEN
    ALTER TABLE products
      ADD CONSTRAINT products_subcategory_id_fkey
      FOREIGN KEY (subcategory_id) REFERENCES subcategories(id) ON DELETE CASCADE;
  END IF;
END $$;

-- Ensure is_featured column exists (may not exist if table pre-dated this schema)
ALTER TABLE products ADD COLUMN IF NOT EXISTS is_featured boolean NOT NULL DEFAULT false;

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_subcategories_category ON subcategories(category_id);
CREATE INDEX IF NOT EXISTS idx_products_subcategory ON products(subcategory_id);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(is_featured);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
