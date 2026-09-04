-- Fix is_featured column: split ADD COLUMN IF NOT EXISTS with NOT NULL DEFAULT
-- This resolves: "syntax error at or near "is_featured""
-- PostgreSQL doesn't allow NOT NULL with IF NOT EXISTS, so we do it in steps

ALTER TABLE products ADD COLUMN IF NOT EXISTS is_featured boolean DEFAULT false;

-- Now set all existing NULL values to false (if any)
UPDATE products SET is_featured = false WHERE is_featured IS NULL;

-- Now add the NOT NULL constraint
ALTER TABLE products ALTER COLUMN is_featured SET NOT NULL;

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(is_featured);
