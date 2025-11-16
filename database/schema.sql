-- Multi-Marketplace Platform Database Schema
-- PostgreSQL 15+

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- USERS TABLE
-- ============================================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    avatar_url TEXT,
    bio TEXT,
    rating_avg DECIMAL(3,2) DEFAULT 0.00 CHECK (rating_avg >= 0 AND rating_avg <= 5),
    rating_count INTEGER DEFAULT 0,
    is_verified BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    last_login_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_phone ON users(phone);

-- ============================================
-- LISTINGS TABLE (Unified for all types)
-- ============================================
CREATE TYPE listing_type AS ENUM ('deal', 'coupon', 'product', 'service');
CREATE TYPE listing_status AS ENUM ('active', 'inactive', 'blocked', 'expired', 'sold');

CREATE TABLE listings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type listing_type NOT NULL,
    title VARCHAR(500) NOT NULL,
    description TEXT,
    base_price DECIMAL(10,2),
    location_city VARCHAR(100),
    location_state VARCHAR(100),
    location_country VARCHAR(100) DEFAULT 'India',
    location_lat DECIMAL(10,8),
    location_lng DECIMAL(11,8),
    is_online BOOLEAN DEFAULT false,
    status listing_status DEFAULT 'active',
    views_count INTEGER DEFAULT 0,
    favorites_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP
);

CREATE INDEX idx_listings_user ON listings(user_id);
CREATE INDEX idx_listings_type ON listings(type);
CREATE INDEX idx_listings_status ON listings(status);
CREATE INDEX idx_listings_location ON listings(location_city, location_state);
CREATE INDEX idx_listings_created ON listings(created_at DESC);
CREATE INDEX idx_listings_expires ON listings(expires_at);

-- ============================================
-- DEAL DETAILS TABLE
-- ============================================
CREATE TYPE discount_type AS ENUM ('percent', 'flat', 'bogo', 'bundle');

CREATE TABLE deal_details (
    listing_id UUID PRIMARY KEY REFERENCES listings(id) ON DELETE CASCADE,
    original_price DECIMAL(10,2) NOT NULL,
    deal_price DECIMAL(10,2) NOT NULL,
    discount_type discount_type NOT NULL,
    discount_value DECIMAL(10,2) NOT NULL,
    quantity_available INTEGER,
    quantity_sold INTEGER DEFAULT 0,
    expiry_date DATE NOT NULL,
    terms_conditions TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_deal_expiry ON deal_details(expiry_date);
CREATE INDEX idx_deal_price ON deal_details(deal_price);

-- ============================================
-- COUPON DETAILS TABLE
-- ============================================
CREATE TYPE coupon_discount_type AS ENUM ('percent', 'flat', 'cashback', 'freebie');

CREATE TABLE coupon_details (
    listing_id UUID PRIMARY KEY REFERENCES listings(id) ON DELETE CASCADE,
    brand_name VARCHAR(255) NOT NULL,
    store_url TEXT,
    coupon_code VARCHAR(100) NOT NULL,
    discount_type coupon_discount_type NOT NULL,
    discount_value DECIMAL(10,2),
    min_order_value DECIMAL(10,2),
    max_discount DECIMAL(10,2),
    usage_limit INTEGER,
    used_count INTEGER DEFAULT 0,
    expiry_date DATE NOT NULL,
    terms_conditions TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_coupon_brand ON coupon_details(brand_name);
CREATE INDEX idx_coupon_expiry ON coupon_details(expiry_date);
CREATE INDEX idx_coupon_code ON coupon_details(coupon_code);

-- ============================================
-- PRODUCT DETAILS TABLE
-- ============================================
CREATE TYPE product_condition AS ENUM ('new', 'used', 'refurbished');

CREATE TABLE product_details (
    listing_id UUID PRIMARY KEY REFERENCES listings(id) ON DELETE CASCADE,
    category VARCHAR(100) NOT NULL,
    subcategory VARCHAR(100),
    brand VARCHAR(100),
    condition product_condition NOT NULL,
    quantity INTEGER DEFAULT 1,
    is_negotiable BOOLEAN DEFAULT true,
    warranty_months INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_product_category ON product_details(category);
CREATE INDEX idx_product_condition ON product_details(condition);
CREATE INDEX idx_product_brand ON product_details(brand);

-- ============================================
-- SERVICE DETAILS TABLE
-- ============================================
CREATE TABLE service_details (
    listing_id UUID PRIMARY KEY REFERENCES listings(id) ON DELETE CASCADE,
    service_type VARCHAR(100) NOT NULL,
    subcategory VARCHAR(100),
    min_price DECIMAL(10,2) NOT NULL,
    max_price DECIMAL(10,2),
    price_unit VARCHAR(50) DEFAULT 'fixed', -- fixed, hourly, daily, project
    service_area VARCHAR(255),
    is_remote BOOLEAN DEFAULT false,
    experience_years INTEGER,
    certifications TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_service_type ON service_details(service_type);
CREATE INDEX idx_service_price ON service_details(min_price);
CREATE INDEX idx_service_area ON service_details(service_area);

-- ============================================
-- IMAGES TABLE
-- ============================================
CREATE TABLE images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    thumbnail_url TEXT,
    is_primary BOOLEAN DEFAULT false,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_images_listing ON images(listing_id);
CREATE INDEX idx_images_primary ON images(listing_id, is_primary);

-- ============================================
-- FAVORITES TABLE
-- ============================================
CREATE TABLE favorites (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, listing_id)
);

CREATE INDEX idx_favorites_user ON favorites(user_id);
CREATE INDEX idx_favorites_listing ON favorites(listing_id);

-- ============================================
-- REVIEWS TABLE
-- ============================================
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
    reviewer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    reviewed_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(listing_id, reviewer_id)
);

CREATE INDEX idx_reviews_listing ON reviews(listing_id);
CREATE INDEX idx_reviews_user ON reviews(reviewed_user_id);

-- ============================================
-- MESSAGES TABLE (Optional for future)
-- ============================================
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    receiver_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_messages_sender ON messages(sender_id);
CREATE INDEX idx_messages_receiver ON messages(receiver_id);
CREATE INDEX idx_messages_listing ON messages(listing_id);

-- ============================================
-- ADMIN ACTIONS TABLE (Moderation log)
-- ============================================
CREATE TYPE admin_action_type AS ENUM ('block', 'unblock', 'approve', 'reject', 'delete');

CREATE TABLE admin_actions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_id UUID NOT NULL REFERENCES users(id),
    target_type VARCHAR(50) NOT NULL, -- 'user' or 'listing'
    target_id UUID NOT NULL,
    action admin_action_type NOT NULL,
    reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_admin_actions_target ON admin_actions(target_type, target_id);
CREATE INDEX idx_admin_actions_admin ON admin_actions(admin_id);

-- ============================================
-- TRIGGERS FOR UPDATED_AT
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_listings_updated_at BEFORE UPDATE ON listings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- TRIGGER FOR USER RATING UPDATE
-- ============================================
CREATE OR REPLACE FUNCTION update_user_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE users
    SET 
        rating_avg = (SELECT AVG(rating)::DECIMAL(3,2) FROM reviews WHERE reviewed_user_id = NEW.reviewed_user_id),
        rating_count = (SELECT COUNT(*) FROM reviews WHERE reviewed_user_id = NEW.reviewed_user_id)
    WHERE id = NEW.reviewed_user_id;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_user_rating_on_review AFTER INSERT OR UPDATE ON reviews
    FOR EACH ROW EXECUTE FUNCTION update_user_rating();

-- ============================================
-- SEED DATA (Optional - for testing)
-- ============================================

-- Create a test user (password: 'password123')
INSERT INTO users (name, email, phone, password_hash, is_verified) VALUES
('John Doe', 'john@example.com', '+919876543210', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', true),
('Jane Smith', 'jane@example.com', '+919876543211', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', true);
