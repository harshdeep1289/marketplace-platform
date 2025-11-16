# Multi-Marketplace Platform API Documentation

Base URL: `http://localhost:4000/api`

## Authentication

All authenticated endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

---

## 🔐 Authentication Endpoints

### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+919876543210",
  "password": "password123"
}
```

**Response:**
```json
{
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+919876543210",
    "avatar_url": null
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:** Same as register

### Get Current User
```http
GET /auth/me
Authorization: Bearer <token>
```

---

## 📋 Listings Endpoints

### Get All Listings
```http
GET /listings?type=deal&city=Mumbai&page=1&limit=20
```

**Query Parameters:**
- `type` (optional): `deal`, `coupon`, `product`, `service`
- `city` (optional): Filter by city
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "type": "deal",
      "title": "50% off on Electronics",
      "description": "Amazing deal on laptops",
      "base_price": 50000,
      "location_city": "Mumbai",
      "is_online": false,
      "status": "active",
      "created_at": "2024-01-15T10:30:00Z",
      "deal_detail": {
        "original_price": 100000,
        "deal_price": 50000,
        "discount_type": "percent",
        "discount_value": 50,
        "expiry_date": "2024-02-15"
      },
      "images": [
        {
          "url": "https://...",
          "is_primary": true
        }
      ],
      "user": {
        "id": "uuid",
        "name": "John Doe",
        "rating_avg": 4.5
      }
    }
  ],
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 20,
    "totalPages": 5
  }
}
```

### Get Single Listing
```http
GET /listings/:id
```

### Create Deal Listing
```http
POST /listings
Authorization: Bearer <token>
Content-Type: application/json

{
  "type": "deal",
  "title": "50% off on Electronics",
  "description": "Amazing deal on laptops and accessories",
  "location_city": "Mumbai",
  "location_state": "Maharashtra",
  "is_online": false,
  "deal_detail": {
    "original_price": 100000,
    "deal_price": 50000,
    "discount_type": "percent",
    "discount_value": 50,
    "expiry_date": "2024-02-15",
    "quantity_available": 10
  },
  "images": [
    {
      "url": "https://cdn.example.com/image1.jpg",
      "is_primary": true,
      "display_order": 0
    }
  ]
}
```

### Create Coupon Listing
```http
POST /listings
Authorization: Bearer <token>
Content-Type: application/json

{
  "type": "coupon",
  "title": "Amazon 20% Cashback",
  "description": "Get 20% cashback on orders above ₹1000",
  "is_online": true,
  "coupon_detail": {
    "brand_name": "Amazon",
    "store_url": "https://amazon.in",
    "coupon_code": "SAVE20",
    "discount_type": "percent",
    "discount_value": 20,
    "min_order_value": 1000,
    "max_discount": 500,
    "expiry_date": "2024-03-31"
  }
}
```

### Create Product Listing
```http
POST /listings
Authorization: Bearer <token>
Content-Type: application/json

{
  "type": "product",
  "title": "iPhone 13 Pro - 128GB",
  "description": "Like new condition, warranty valid",
  "base_price": 75000,
  "location_city": "Bangalore",
  "location_state": "Karnataka",
  "product_detail": {
    "category": "Electronics",
    "subcategory": "Mobile Phones",
    "brand": "Apple",
    "condition": "used",
    "quantity": 1,
    "is_negotiable": true,
    "warranty_months": 6
  },
  "images": [
    {
      "url": "https://cdn.example.com/iphone.jpg",
      "is_primary": true
    }
  ]
}
```

### Create Service Listing
```http
POST /listings
Authorization: Bearer <token>
Content-Type: application/json

{
  "type": "service",
  "title": "Professional Web Development",
  "description": "Full-stack web development services",
  "location_city": "Delhi",
  "is_online": true,
  "service_detail": {
    "service_type": "Web Development",
    "subcategory": "Full Stack",
    "min_price": 50000,
    "max_price": 200000,
    "price_unit": "project",
    "is_remote": true,
    "experience_years": 5,
    "certifications": "AWS Certified, React Developer"
  }
}
```

### Update Listing
```http
PUT /listings/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated title",
  "description": "Updated description",
  "status": "inactive"
}
```

### Delete Listing
```http
DELETE /listings/:id
Authorization: Bearer <token>
```

### Get User's Listings
```http
GET /listings/user/:userId
```

---

## 🔍 Search Endpoints

### Global Search
```http
GET /search?q=laptop&type=product&city=Mumbai&minPrice=10000&maxPrice=50000
```

**Query Parameters:**
- `q` (required): Search query
- `type` (optional): Filter by listing type
- `city` (optional): Filter by city
- `minPrice` (optional): Minimum price
- `maxPrice` (optional): Maximum price
- `category` (optional): For products
- `brand` (optional): For products/coupons

**Response:**
```json
{
  "results": [
    {
      "id": "uuid",
      "type": "product",
      "title": "Dell Laptop XPS 13",
      "base_price": 45000,
      "location_city": "Mumbai",
      "highlight": "<em>Laptop</em> in excellent condition",
      "images": [...]
    }
  ],
  "meta": {
    "total": 50,
    "took": 15
  }
}
```

---

## 👤 User Endpoints

### Get User Profile
```http
GET /users/:id
```

**Response:**
```json
{
  "id": "uuid",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+919876543210",
  "avatar_url": "https://...",
  "bio": "Tech enthusiast",
  "rating_avg": 4.5,
  "rating_count": 25,
  "is_verified": true,
  "created_at": "2024-01-01T00:00:00Z"
}
```

### Update Profile
```http
PUT /users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Doe Updated",
  "bio": "Updated bio",
  "avatar_url": "https://new-avatar.jpg"
}
```

---

## 📊 Dashboard Endpoints

### Get My Listings
```http
GET /dashboard/my-listings
Authorization: Bearer <token>
```

### Get Favorites
```http
GET /dashboard/favorites
Authorization: Bearer <token>
```

### Add to Favorites
```http
POST /dashboard/favorites
Authorization: Bearer <token>
Content-Type: application/json

{
  "listing_id": "uuid"
}
```

### Remove from Favorites
```http
DELETE /dashboard/favorites/:listingId
Authorization: Bearer <token>
```

---

## ⚡ Trending & Featured

### Get Trending Deals
```http
GET /listings/trending/deals?limit=10
```

### Get Hot Coupons
```http
GET /listings/trending/coupons?limit=10
```

### Get Popular Products
```http
GET /listings/trending/products?limit=10
```

---

## Error Responses

### 400 Bad Request
```json
{
  "statusCode": 400,
  "message": ["title should not be empty"],
  "error": "Bad Request"
}
```

### 401 Unauthorized
```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

### 404 Not Found
```json
{
  "statusCode": 404,
  "message": "Listing not found"
}
```

### 500 Internal Server Error
```json
{
  "statusCode": 500,
  "message": "Internal server error"
}
```

---

## Rate Limiting

- **Default:** 10 requests per minute per IP
- **Authenticated:** 100 requests per minute per user

---

## Pagination

All list endpoints support pagination:
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20, max: 100)

---

## Image Upload

Images should be uploaded to S3-compatible storage and URLs provided in listing creation.

Future enhancement: Direct upload endpoint
```http
POST /upload
Authorization: Bearer <token>
Content-Type: multipart/form-data

file: <binary>
```

---

## Webhooks (Future)

Configure webhooks for:
- New listing created
- Listing status changed
- User registered
