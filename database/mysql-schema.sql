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

-- Seed catalog records available in the repository and category names visible
-- in the supplied storefront screenshots. The screenshots do not include products.
-- These inserts are safe to re-run and leave existing records unchanged.
INSERT INTO categories (id, name, slug, description, image_url, display_order) VALUES
  ('20000000-0000-4000-8000-000000000003', 'Tiles', 'tiles', 'Browse tiles by space, finish, design, and type.', NULL, 1),
  ('20000000-0000-4000-8000-000000000001', 'Marble Statues', 'marble-statues', 'Hand-carved deity murtis in premium white and coloured marble. Radha Krishna, Sita Rama, Goddess Lakshmi, Maa Kali, Sai Baba and more.', 'https://images.pexels.com/photos/35587787/pexels-photo-35587787.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 7),
  ('20000000-0000-4000-8000-000000000002', 'Marble Home Interiors', 'marble-home-interiors', 'Marble mandirs, carved fireplaces & bespoke interior stonework for your home.', 'https://images.pexels.com/photos/37431602/pexels-photo-37431602.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 8)
ON DUPLICATE KEY UPDATE id = id;

INSERT INTO subcategories (id, category_id, name, slug, description, image_url, display_order) VALUES
  ('20000000-0000-4000-8000-000000000021', '20000000-0000-4000-8000-000000000003', 'Floor Tiles', 'floor-tiles', NULL, NULL, 1),
  ('20000000-0000-4000-8000-000000000022', '20000000-0000-4000-8000-000000000003', 'Wall Tiles', 'wall-tiles', NULL, NULL, 2),
  ('20000000-0000-4000-8000-000000000023', '20000000-0000-4000-8000-000000000003', 'Bathroom Tiles', 'bathroom-tiles', NULL, NULL, 3),
  ('20000000-0000-4000-8000-000000000024', '20000000-0000-4000-8000-000000000003', 'Kitchen Tiles', 'kitchen-tiles', NULL, NULL, 4),
  ('20000000-0000-4000-8000-000000000025', '20000000-0000-4000-8000-000000000003', 'Living Room Tiles', 'living-room-tiles', NULL, NULL, 5),
  ('20000000-0000-4000-8000-000000000026', '20000000-0000-4000-8000-000000000003', 'Outdoor Tiles', 'outdoor-tiles', NULL, NULL, 6),
  ('20000000-0000-4000-8000-000000000027', '20000000-0000-4000-8000-000000000003', 'Parking Tiles', 'parking-tiles', NULL, NULL, 7),
  ('20000000-0000-4000-8000-000000000028', '20000000-0000-4000-8000-000000000003', 'Bedroom Tiles', 'bedroom-tiles', NULL, NULL, 8),
  ('20000000-0000-4000-8000-000000000029', '20000000-0000-4000-8000-000000000003', 'Elevation Tiles', 'elevation-tiles', NULL, NULL, 9),
  ('20000000-0000-4000-8000-000000000030', '20000000-0000-4000-8000-000000000003', 'Balcony Tiles', 'balcony-tiles', NULL, NULL, 10),
  ('20000000-0000-4000-8000-000000000031', '20000000-0000-4000-8000-000000000003', 'Pooja Room Tiles', 'pooja-room-tiles', NULL, NULL, 11),
  ('20000000-0000-4000-8000-000000000032', '20000000-0000-4000-8000-000000000003', 'Stair Tiles', 'stair-tiles', NULL, NULL, 12),
  ('20000000-0000-4000-8000-000000000033', '20000000-0000-4000-8000-000000000003', 'Anti Skid Tiles', 'anti-skid-tiles', NULL, NULL, 13),
  ('20000000-0000-4000-8000-000000000034', '20000000-0000-4000-8000-000000000003', 'Glossy Tiles', 'glossy-tiles', NULL, NULL, 14),
  ('20000000-0000-4000-8000-000000000035', '20000000-0000-4000-8000-000000000003', 'Polished Tiles', 'polished-tiles', NULL, NULL, 15),
  ('20000000-0000-4000-8000-000000000036', '20000000-0000-4000-8000-000000000003', 'Matt Tiles', 'matt-tiles', NULL, NULL, 16),
  ('20000000-0000-4000-8000-000000000037', '20000000-0000-4000-8000-000000000003', 'Carving Tiles', 'carving-tiles', NULL, NULL, 17),
  ('20000000-0000-4000-8000-000000000038', '20000000-0000-4000-8000-000000000003', 'Metallic Tiles', 'metallic-tiles', NULL, NULL, 18),
  ('20000000-0000-4000-8000-000000000039', '20000000-0000-4000-8000-000000000003', 'Rustic Tiles', 'rustic-tiles', NULL, NULL, 19),
  ('20000000-0000-4000-8000-000000000040', '20000000-0000-4000-8000-000000000003', 'Lappato Tiles', 'lappato-tiles', NULL, NULL, 20),
  ('20000000-0000-4000-8000-000000000041', '20000000-0000-4000-8000-000000000003', 'Satin Tiles', 'satin-tiles', NULL, NULL, 21),
  ('20000000-0000-4000-8000-000000000042', '20000000-0000-4000-8000-000000000003', 'Hi-Gloss Tiles', 'hi-gloss-tiles', NULL, NULL, 22),
  ('20000000-0000-4000-8000-000000000043', '20000000-0000-4000-8000-000000000003', 'Wall Panels', 'wall-panels', NULL, NULL, 23),
  ('20000000-0000-4000-8000-000000000044', '20000000-0000-4000-8000-000000000003', 'Fluted Panels', 'fluted-panels', NULL, NULL, 24),
  ('20000000-0000-4000-8000-000000000045', '20000000-0000-4000-8000-000000000003', '3D Tiles', '3d-tiles', NULL, NULL, 25),
  ('20000000-0000-4000-8000-000000000046', '20000000-0000-4000-8000-000000000003', 'Wooden Tiles', 'wooden-tiles', NULL, NULL, 26),
  ('20000000-0000-4000-8000-000000000047', '20000000-0000-4000-8000-000000000003', 'Marble Tiles', 'marble-tiles', NULL, NULL, 27),
  ('20000000-0000-4000-8000-000000000048', '20000000-0000-4000-8000-000000000003', 'Texture Tiles', 'texture-tiles', NULL, NULL, 28),
  ('20000000-0000-4000-8000-000000000049', '20000000-0000-4000-8000-000000000003', 'Mosaic Tiles', 'mosaic-tiles', NULL, NULL, 29),
  ('20000000-0000-4000-8000-000000000050', '20000000-0000-4000-8000-000000000003', 'Granite Tiles', 'granite-tiles', NULL, NULL, 30),
  ('20000000-0000-4000-8000-000000000051', '20000000-0000-4000-8000-000000000003', 'Stone Tiles', 'stone-tiles', NULL, NULL, 31),
  ('20000000-0000-4000-8000-000000000052', '20000000-0000-4000-8000-000000000003', 'Pattern Tiles', 'pattern-tiles', NULL, NULL, 32),
  ('20000000-0000-4000-8000-000000000053', '20000000-0000-4000-8000-000000000003', 'Geometric Tiles', 'geometric-tiles', NULL, NULL, 33),
  ('20000000-0000-4000-8000-000000000054', '20000000-0000-4000-8000-000000000003', 'Cement Tiles', 'cement-tiles', NULL, NULL, 34),
  ('20000000-0000-4000-8000-000000000055', '20000000-0000-4000-8000-000000000003', 'Travertine Tiles', 'travertine-tiles', NULL, NULL, 35),
  ('20000000-0000-4000-8000-000000000056', '20000000-0000-4000-8000-000000000003', 'Terrazzo Tiles', 'terrazzo-tiles', NULL, NULL, 36),
  ('20000000-0000-4000-8000-000000000057', '20000000-0000-4000-8000-000000000003', 'Vitrified Tiles', 'vitrified-tiles', NULL, NULL, 37),
  ('20000000-0000-4000-8000-000000000058', '20000000-0000-4000-8000-000000000003', 'Ceramic Tiles', 'ceramic-tiles', NULL, NULL, 38),
  ('20000000-0000-4000-8000-000000000059', '20000000-0000-4000-8000-000000000003', 'Porcelain Tiles', 'porcelain-tiles', NULL, NULL, 39),
  ('20000000-0000-4000-8000-000000000060', '20000000-0000-4000-8000-000000000003', 'Designer Tiles', 'designer-tiles', NULL, NULL, 40),
  ('20000000-0000-4000-8000-000000000061', '20000000-0000-4000-8000-000000000003', 'Digital Tiles', 'digital-tiles', NULL, NULL, 41),
  ('20000000-0000-4000-8000-000000000062', '20000000-0000-4000-8000-000000000003', 'Glazed Tiles', 'glazed-tiles', NULL, NULL, 42),
  ('20000000-0000-4000-8000-000000000063', '20000000-0000-4000-8000-000000000003', 'Cool Tiles', 'cool-tiles', NULL, NULL, 43),
  ('20000000-0000-4000-8000-000000000064', '20000000-0000-4000-8000-000000000003', 'Printed Tiles', 'printed-tiles', NULL, NULL, 44),
  ('20000000-0000-4000-8000-000000000065', '20000000-0000-4000-8000-000000000003', 'Nano Tiles', 'nano-tiles', NULL, NULL, 45),
  ('20000000-0000-4000-8000-000000000066', '20000000-0000-4000-8000-000000000003', 'Imported Tiles', 'imported-tiles', NULL, NULL, 46),
  ('20000000-0000-4000-8000-000000000067', '20000000-0000-4000-8000-000000000003', 'Italian Tiles', 'italian-tiles', NULL, NULL, 47),
  ('20000000-0000-4000-8000-000000000068', '20000000-0000-4000-8000-000000000003', 'Spanish Tiles', 'spanish-tiles', NULL, NULL, 48),
  ('20000000-0000-4000-8000-000000000011', '20000000-0000-4000-8000-000000000001', 'Radha Krishna Statue', 'radha-krishna-statue', 'Hand-carved Radha Krishna marble murti with intricate detailing.', 'https://images.pexels.com/photos/35587787/pexels-photo-35587787.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 1),
  ('20000000-0000-4000-8000-000000000012', '20000000-0000-4000-8000-000000000001', 'Sita Rama Statue', 'sita-rama-statue', 'Premium marble Sita Rama murti with fine craftsmanship.', 'https://images.pexels.com/photos/18382817/pexels-photo-18382817.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 2),
  ('20000000-0000-4000-8000-000000000013', '20000000-0000-4000-8000-000000000001', 'Goddess Lakshmi Statue', 'goddess-lakshmi-statue', 'Beautifully crafted Goddess Lakshmi marble statue with ornate details.', 'https://images.pexels.com/photos/15164157/pexels-photo-15164157.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 3),
  ('20000000-0000-4000-8000-000000000014', '20000000-0000-4000-8000-000000000001', 'Maa Kali Statue', 'maa-kali-statue', 'Powerful Maa Kali marble murti hand-carved by master artisans.', 'https://images.pexels.com/photos/35446433/pexels-photo-35446433.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 4),
  ('20000000-0000-4000-8000-000000000015', '20000000-0000-4000-8000-000000000001', 'Sai Baba Statue', 'sai-baba-statue', 'Serene Sai Baba marble statue with fine detailing and spiritual aura.', 'https://images.pexels.com/photos/35558431/pexels-photo-35558431.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 5),
  ('20000000-0000-4000-8000-000000000016', '20000000-0000-4000-8000-000000000002', 'Marble Mandir', 'marble-mandir', 'Exquisitely carved marble mandirs for home temples and pooja rooms.', 'https://images.pexels.com/photos/37431602/pexels-photo-37431602.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 1),
  ('20000000-0000-4000-8000-000000000017', '20000000-0000-4000-8000-000000000002', 'Marble Fireplace', 'marble-fireplace', 'Luxurious carved marble fireplaces for elegant home interiors.', 'https://images.pexels.com/photos/18362066/pexels-photo-18362066.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 2)
ON DUPLICATE KEY UPDATE id = id;

INSERT INTO products (
  id, subcategory_id, name, slug, description, image_url, brand, material,
  size, thickness, finish, color, design, coverage_per_box, pieces_per_box,
  suitable_for, price, mrp, stock_status, rating, specs, is_featured, display_order
) VALUES
  ('20000000-0000-4000-8000-000000000101', '20000000-0000-4000-8000-000000000011', 'Radha Krishna Marble Murti', 'radha-krishna-marble-murti', 'Hand-carved Radha Krishna marble murti with intricate detailing. Crafted from premium white marble by master artisans.', 'https://images.pexels.com/photos/35587787/pexels-photo-35587787.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'Vaishnavi', 'White Marble', '2 ft', NULL, 'Polished', 'White', 'Hand-Carved', NULL, NULL, 'Home Temple, Pooja Room', 15000.00, 22000.00, 'In Stock', 4.9, '{"Brand":"Vaishnavi","Material":"White Marble","Type":"Hand-Carved Murti","Color":"White","Height":"2 ft","Finish":"Polished","Warranty":"Lifetime"}', TRUE, 1),
  ('20000000-0000-4000-8000-000000000102', '20000000-0000-4000-8000-000000000011', 'Radha Krishna Coloured Marble Statue', 'radha-krishna-coloured-marble-statue', 'Beautifully coloured Radha Krishna marble statue with gold accents and fine painted details.', 'https://images.pexels.com/photos/35587787/pexels-photo-35587787.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'Vaishnavi', 'White Marble', '3 ft', NULL, 'Polished', 'Multicolor', 'Hand-Carved & Painted', NULL, NULL, 'Home Temple, Pooja Room', 35000.00, 50000.00, 'In Stock', 5.0, '{"Brand":"Vaishnavi","Material":"White Marble","Type":"Hand-Carved & Painted","Color":"Multicolor","Height":"3 ft","Finish":"Polished","Warranty":"Lifetime"}', TRUE, 2),
  ('20000000-0000-4000-8000-000000000103', '20000000-0000-4000-8000-000000000012', 'Sita Rama Marble Murti', 'sita-rama-marble-murti', 'Premium marble Sita Rama murti with fine craftsmanship and serene expressions.', 'https://images.pexels.com/photos/18382817/pexels-photo-18382817.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'Vaishnavi', 'White Marble', '2.5 ft', NULL, 'Polished', 'White', 'Hand-Carved', NULL, NULL, 'Home Temple, Pooja Room', 25000.00, 35000.00, 'In Stock', 4.8, '{"Brand":"Vaishnavi","Material":"White Marble","Type":"Hand-Carved Murti","Color":"White","Height":"2.5 ft","Finish":"Polished","Warranty":"Lifetime"}', TRUE, 1),
  ('20000000-0000-4000-8000-000000000104', '20000000-0000-4000-8000-000000000012', 'Sita Rama Lakshmana Hanuman Set', 'sita-rama-lakshmana-hanuman-set', 'Complete Sita Rama Lakshmana Hanuman marble statue set. Exquisitely carved in premium white marble.', 'https://images.pexels.com/photos/18382817/pexels-photo-18382817.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'Vaishnavi', 'White Marble', '3 ft', NULL, 'Polished', 'White', 'Hand-Carved Set', NULL, NULL, 'Home Temple, Pooja Room', 65000.00, 95000.00, 'In Stock', 5.0, '{"Brand":"Vaishnavi","Material":"White Marble","Type":"Hand-Carved Set of 4","Color":"White","Height":"3 ft","Finish":"Polished","Warranty":"Lifetime"}', TRUE, 2),
  ('20000000-0000-4000-8000-000000000105', '20000000-0000-4000-8000-000000000013', 'Goddess Lakshmi Marble Statue', 'goddess-lakshmi-marble-statue', 'Beautifully crafted Goddess Lakshmi marble statue with ornate details and lotus base.', 'https://images.pexels.com/photos/15164157/pexels-photo-15164157.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'Vaishnavi', 'White Marble', '2 ft', NULL, 'Polished', 'White & Gold', 'Hand-Carved', NULL, NULL, 'Home Temple, Pooja Room', 18000.00, 28000.00, 'In Stock', 4.9, '{"Brand":"Vaishnavi","Material":"White Marble","Type":"Hand-Carved Murti","Color":"White & Gold","Height":"2 ft","Finish":"Polished","Warranty":"Lifetime"}', TRUE, 1),
  ('20000000-0000-4000-8000-000000000106', '20000000-0000-4000-8000-000000000013', 'Goddess Lakshmi on Lotus Marble Murti', 'goddess-lakshmi-lotus-marble-murti', 'Goddess Lakshmi seated on lotus, hand-carved in premium white marble with gold accents.', 'https://images.pexels.com/photos/15164157/pexels-photo-15164157.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'Vaishnavi', 'White Marble', '1.5 ft', NULL, 'Polished', 'White & Gold', 'Hand-Carved', NULL, NULL, 'Home Temple, Pooja Room', 12000.00, 18000.00, 'In Stock', 4.7, '{"Brand":"Vaishnavi","Material":"White Marble","Type":"Hand-Carved Murti","Color":"White & Gold","Height":"1.5 ft","Finish":"Polished","Warranty":"Lifetime"}', FALSE, 2),
  ('20000000-0000-4000-8000-000000000107', '20000000-0000-4000-8000-000000000014', 'Maa Kali Marble Murti', 'maa-kali-marble-murti', 'Powerful Maa Kali marble murti hand-carved by master artisans. Intricate detailing with traditional design.', 'https://images.pexels.com/photos/35446433/pexels-photo-35446433.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'Vaishnavi', 'White Marble', '2 ft', NULL, 'Polished', 'Black & White', 'Hand-Carved', NULL, NULL, 'Home Temple, Pooja Room', 20000.00, 30000.00, 'In Stock', 4.8, '{"Brand":"Vaishnavi","Material":"White Marble","Type":"Hand-Carved Murti","Color":"Black & White","Height":"2 ft","Finish":"Polished","Warranty":"Lifetime"}', TRUE, 1),
  ('20000000-0000-4000-8000-000000000108', '20000000-0000-4000-8000-000000000014', 'Maa Kali Coloured Marble Statue', 'maa-kali-coloured-marble-statue', 'Vibrant Maa Kali coloured marble statue with traditional painting and gold detailing.', 'https://images.pexels.com/photos/35446433/pexels-photo-35446433.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'Vaishnavi', 'White Marble', '3 ft', NULL, 'Polished', 'Multicolor', 'Hand-Carved & Painted', NULL, NULL, 'Home Temple, Pooja Room', 45000.00, 65000.00, 'In Stock', 4.9, '{"Brand":"Vaishnavi","Material":"White Marble","Type":"Hand-Carved & Painted","Color":"Multicolor","Height":"3 ft","Finish":"Polished","Warranty":"Lifetime"}', TRUE, 2),
  ('20000000-0000-4000-8000-000000000109', '20000000-0000-4000-8000-000000000015', 'Sai Baba Marble Statue', 'sai-baba-marble-statue', 'Serene Sai Baba marble statue with fine detailing and spiritual aura. Hand-carved in premium white marble.', 'https://images.pexels.com/photos/35558431/pexels-photo-35558431.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'Vaishnavi', 'White Marble', '2 ft', NULL, 'Polished', 'White', 'Hand-Carved', NULL, NULL, 'Home Temple, Pooja Room', 16000.00, 24000.00, 'In Stock', 4.8, '{"Brand":"Vaishnavi","Material":"White Marble","Type":"Hand-Carved Murti","Color":"White","Height":"2 ft","Finish":"Polished","Warranty":"Lifetime"}', TRUE, 1),
  ('20000000-0000-4000-8000-000000000110', '20000000-0000-4000-8000-000000000015', 'Sai Baba Coloured Marble Murti', 'sai-baba-coloured-marble-murti', 'Sai Baba coloured marble murti with traditional painting and serene expression.', 'https://images.pexels.com/photos/35558431/pexels-photo-35558431.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'Vaishnavi', 'White Marble', '1.5 ft', NULL, 'Polished', 'Multicolor', 'Hand-Carved & Painted', NULL, NULL, 'Home Temple, Pooja Room', 10000.00, 15000.00, 'In Stock', 4.6, '{"Brand":"Vaishnavi","Material":"White Marble","Type":"Hand-Carved & Painted","Color":"Multicolor","Height":"1.5 ft","Finish":"Polished","Warranty":"Lifetime"}', FALSE, 2),
  ('20000000-0000-4000-8000-000000000111', '20000000-0000-4000-8000-000000000016', 'Carved Marble Mandir', 'carved-marble-mandir', 'Exquisitely carved marble mandir for home temple. Features intricate pillar carvings and dome design.', 'https://images.pexels.com/photos/37431602/pexels-photo-37431602.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'Vaishnavi', 'White Marble', '4x3 ft', NULL, 'Polished', 'White', 'Hand-Carved', NULL, NULL, 'Home Temple, Pooja Room', 85000.00, 125000.00, 'In Stock', 5.0, '{"Brand":"Vaishnavi","Material":"White Marble","Type":"Hand-Carved Mandir","Color":"White","Size":"4x3 ft","Finish":"Polished","Warranty":"Lifetime"}', TRUE, 1),
  ('20000000-0000-4000-8000-000000000112', '20000000-0000-4000-8000-000000000016', 'Small Marble Mandir', 'small-marble-mandir', 'Compact marble mandir for smaller pooja spaces. Beautifully carved with traditional designs.', 'https://images.pexels.com/photos/37431602/pexels-photo-37431602.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'Vaishnavi', 'White Marble', '2x1.5 ft', NULL, 'Polished', 'White', 'Hand-Carved', NULL, NULL, 'Home Temple, Pooja Room', 35000.00, 50000.00, 'In Stock', 4.7, '{"Brand":"Vaishnavi","Material":"White Marble","Type":"Hand-Carved Mandir","Color":"White","Size":"2x1.5 ft","Finish":"Polished","Warranty":"Lifetime"}', FALSE, 2),
  ('20000000-0000-4000-8000-000000000113', '20000000-0000-4000-8000-000000000016', 'Designer Marble Mandir with Dome', 'designer-marble-mandir-dome', 'Large designer marble mandir with intricate dome carvings and pillar work. A centerpiece for your pooja room.', 'https://images.pexels.com/photos/37431602/pexels-photo-37431602.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'Vaishnavi', 'White Marble', '5x4 ft', NULL, 'Polished', 'White & Gold', 'Hand-Carved Designer', NULL, NULL, 'Home Temple, Pooja Room', 150000.00, 220000.00, 'In Stock', 5.0, '{"Brand":"Vaishnavi","Material":"White Marble","Type":"Hand-Carved Designer Mandir","Color":"White & Gold","Size":"5x4 ft","Finish":"Polished","Warranty":"Lifetime"}', TRUE, 3),
  ('20000000-0000-4000-8000-000000000114', '20000000-0000-4000-8000-000000000017', 'Carved Marble Fireplace', 'carved-marble-fireplace', 'Luxurious carved marble fireplace for elegant home interiors. Features intricate detailing and premium finish.', 'https://images.pexels.com/photos/18362066/pexels-photo-18362066.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'Vaishnavi', 'White Marble', '5x4 ft', NULL, 'Polished', 'White', 'Hand-Carved', NULL, NULL, 'Living Room, Interior', 95000.00, 140000.00, 'In Stock', 4.9, '{"Brand":"Vaishnavi","Material":"White Marble","Type":"Hand-Carved Fireplace","Color":"White","Size":"5x4 ft","Finish":"Polished","Warranty":"Lifetime"}', TRUE, 1),
  ('20000000-0000-4000-8000-000000000115', '20000000-0000-4000-8000-000000000017', 'Modern Marble Fireplace Surround', 'modern-marble-fireplace-surround', 'Modern marble fireplace surround with clean lines and contemporary design. Premium white marble construction.', 'https://images.pexels.com/photos/18362066/pexels-photo-18362066.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'Vaishnavi', 'White Marble', '4x3 ft', NULL, 'Polished', 'White', 'Modern', NULL, NULL, 'Living Room, Interior', 65000.00, 95000.00, 'In Stock', 4.7, '{"Brand":"Vaishnavi","Material":"White Marble","Type":"Modern Fireplace Surround","Color":"White","Size":"4x3 ft","Finish":"Polished","Warranty":"Lifetime"}', FALSE, 2)
ON DUPLICATE KEY UPDATE id = id;
