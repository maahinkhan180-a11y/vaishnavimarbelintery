-- MySQL schema for the storefront catalog and blog.
CREATE TABLE IF NOT EXISTS categories (
  id CHAR(36) NOT NULL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT NULL,
  image_url TEXT NULL,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS subcategories (
  id CHAR(36) NOT NULL PRIMARY KEY,
  category_id CHAR(36) NOT NULL,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT NULL,
  image_url TEXT NULL,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT subcategories_category_fk FOREIGN KEY (category_id)
    REFERENCES categories(id) ON DELETE CASCADE,
  INDEX idx_subcategories_category (category_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS products (
  id CHAR(36) NOT NULL PRIMARY KEY,
  subcategory_id CHAR(36) NOT NULL,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  description TEXT NULL,
  image_url TEXT NULL,
  brand VARCHAR(255) NULL,
  material VARCHAR(255) NULL,
  size VARCHAR(255) NULL,
  thickness VARCHAR(255) NULL,
  finish VARCHAR(255) NULL,
  color VARCHAR(255) NULL,
  design VARCHAR(255) NULL,
  coverage_per_box VARCHAR(255) NULL,
  pieces_per_box VARCHAR(255) NULL,
  suitable_for VARCHAR(255) NULL,
  price DECIMAL(10,2) NOT NULL DEFAULT 0,
  mrp DECIMAL(10,2) NOT NULL DEFAULT 0,
  stock_status VARCHAR(100) NOT NULL DEFAULT 'In Stock',
  rating DECIMAL(2,1) NOT NULL DEFAULT 4.0,
  specs JSON NOT NULL,
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT products_subcategory_fk FOREIGN KEY (subcategory_id)
    REFERENCES subcategories(id) ON DELETE CASCADE,
  UNIQUE KEY products_subcategory_slug_unique (subcategory_id, slug),
  INDEX idx_products_featured (is_featured),
  INDEX idx_products_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS blog_articles (
  id CHAR(36) NOT NULL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  content LONGTEXT NOT NULL,
  excerpt TEXT NOT NULL,
  featured_image_url TEXT NULL,
  category VARCHAR(255) NOT NULL DEFAULT 'Inspiration',
  author VARCHAR(255) NOT NULL DEFAULT 'Vaishnavi Marble',
  published_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  tags JSON NOT NULL,
  is_published BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_blog_category (category),
  INDEX idx_blog_published (is_published, published_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
