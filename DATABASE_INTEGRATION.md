# Database Integration Guide

## ✅ What's Been Set Up

### 1. Backend Configuration
- **MongoDB Atlas connection** configured in `/backend/.env`
- Connection string: `mongodb+srv://...@cluster0.nsvello.mongodb.net/marketplace`
- Backend restarted to connect to MongoDB Atlas

### 2. API Client Created
- Created `/frontend/lib/api.ts` with API functions for:
  - **Auth**: `register()`, `login()`, `getProfile()`
  - **Listings**: `create()`, `getAll()`, `getMyListings()`, `update()`, `delete()`, `markAsSold()`, `markAsActive()`
  - **Users**: `getProfile()`, `updateProfile()`

### 3. Backend API Available
- Backend running on: `http://localhost:4000/api`
- Swagger docs: `http://localhost:4000/api/docs`

## 🔧 Current State

**Frontend is still using localStorage** for:
- User authentication
- Storing listings
- Managing user sessions

**Backend has the following modules:**
- ✅ Auth module
- ✅ Users module  
- ✅ Listings module
- ✅ Search module

## 🚀 Next Steps to Complete Integration

### Step 1: Update Login Page to Use API
Replace localStorage auth in `/app/auth/login/page.tsx`:

```typescript
import { authAPI } from '@/lib/api'

// In signup handler:
const response = await authAPI.register({
  name: formData.name,
  email: formData.email,
  password: formData.password
})

// Store token and user info
localStorage.setItem('currentUser', JSON.stringify({
  id: response.user.id,
  name: response.user.name,
  email: response.user.email,
  token: response.token  // JWT token
}))

// In login handler:
const response = await authAPI.login({
  email: formData.email,
  password: formData.password
})

localStorage.setItem('currentUser', JSON.stringify({
  ...response.user,
  token: response.token
}))
```

### Step 2: Update Sell Page to Post to API
Replace localStorage save in `/app/sell/page.tsx`:

```typescript
import { listingsAPI } from '@/lib/api'

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  
  try {
    const response = await listingsAPI.create(formData)
    alert('Listing created successfully!')
    router.push(redirectPath)
  } catch (error) {
    alert('Error creating listing: ' + error.message)
  }
}
```

### Step 3: Update Listing Pages to Fetch from API
Update products, services, deals, coupons pages:

```typescript
import { listingsAPI } from '@/lib/api'

useEffect(() => {
  const fetchListings = async () => {
    try {
      const listings = await listingsAPI.getAll({ 
        type: 'product',  // or 'service', 'deal', 'coupon'
        status: 'active' 
      })
      setUserListings(listings)
    } catch (error) {
      console.error('Error fetching listings:', error)
    }
  }
  
  fetchListings()
}, [])
```

### Step 4: Update Profile Page to Use API
Replace localStorage operations in `/app/profile/page.tsx`:

```typescript
import { listingsAPI } from '@/lib/api'

// Load listings
const listings = await listingsAPI.getMyListings()

// Mark as sold
await listingsAPI.markAsSold(listingId)

// Mark as active
await listingsAPI.markAsActive(listingId)

// Delete
await listingsAPI.delete(listingId)
```

## 📊 Database Schema

The backend uses MongoDB with the following collections:

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Listings Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  listingType: String ('product' | 'service' | 'deal' | 'coupon'),
  category: String,
  title: String,
  description: String,
  price: Number,
  originalPrice: Number,
  discount: Number,
  location: String,
  telegramId: String,
  deliveryTime: String,
  expiryDate: Date,
  image: String (base64 or URL),
  status: String ('active' | 'sold'),
  createdAt: Date,
  updatedAt: Date
}
```

## 🧪 Testing the Backend

1. **Check backend health:**
   ```bash
   curl http://localhost:4000/api
   ```

2. **Test registration:**
   ```bash
   curl -X POST http://localhost:4000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
   ```

3. **Test login:**
   ```bash
   curl -X POST http://localhost:4000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"password123"}'
   ```

4. **View Swagger docs:**
   Open: http://localhost:4000/api/docs

## ⚠️ Important Notes

1. **JWT Tokens**: The API uses JWT for authentication. Store the token in localStorage and send it with every request.

2. **CORS**: Already configured in backend to accept requests from `http://localhost:3000`

3. **Image Uploads**: Currently using base64 strings. For production, consider using AWS S3 or similar.

4. **Error Handling**: Always wrap API calls in try-catch blocks and show user-friendly error messages.

5. **Loading States**: Add loading spinners while API requests are in progress.

## 🔐 Security

- Passwords are hashed using bcrypt
- JWT tokens expire in 7 days
- Rate limiting is enabled (10 requests per minute)
- Input validation on all endpoints

## 📱 Migration Strategy

To migrate from localStorage to database:

1. Keep localStorage as fallback initially
2. Test each API endpoint thoroughly
3. Gradually replace localStorage calls with API calls
4. Remove localStorage code once everything works
5. Clear localStorage on user's first API-connected login
