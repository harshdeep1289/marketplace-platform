'use client'

import { ShoppingBag, MapPin, Star, User } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [userListings, setUserListings] = useState<any[]>([])

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'electronics', label: 'Electronics' },
    { id: 'furniture', label: 'Furniture' },
    { id: 'clothing', label: 'Clothing' },
    { id: 'books', label: 'Books' },
    { id: 'sports', label: 'Sports' },
    { id: 'other', label: 'Other' },
  ]

  // Mock product listings - replace with API call
  const productListings = [
    {
      id: 1,
      category: 'electronics',
      title: 'iPhone 13 Pro Max - 256GB',
      seller: 'Rajesh Kumar',
      rating: 4.9,
      reviews: 45,
      price: 75000,
      location: 'Connaught Place, Delhi',
      description: 'Excellent condition, barely used for 6 months. All accessories included.',
      image: 'https://via.placeholder.com/300x300?text=iPhone+13',
      telegramId: 'rajesh_tech',
    },
    {
      id: 2,
      category: 'furniture',
      title: 'Wooden Study Table with Chair',
      seller: 'Meera Patel',
      rating: 4.7,
      reviews: 23,
      price: 8500,
      location: 'Whitefield, Bangalore',
      description: 'Solid wood construction, perfect for work from home setup.',
      image: 'https://via.placeholder.com/300x300?text=Study+Table',
      telegramId: 'meera_furniture',
    },
    {
      id: 3,
      category: 'electronics',
      title: 'Sony WH-1000XM4 Headphones',
      seller: 'Arjun Singh',
      rating: 5.0,
      reviews: 67,
      price: 18000,
      location: 'Sector 62, Noida',
      description: 'Premium noise cancelling headphones. Like new condition.',
      image: 'https://via.placeholder.com/300x300?text=Headphones',
      telegramId: 'arjun_gadgets',
    },
    {
      id: 4,
      category: 'clothing',
      title: 'Designer Leather Jacket',
      seller: 'Priya Sharma',
      rating: 4.8,
      reviews: 34,
      price: 12000,
      location: 'Bandra, Mumbai',
      description: 'Genuine leather, size M. Worn only twice. Original price 25k.',
      image: 'https://via.placeholder.com/300x300?text=Leather+Jacket',
      telegramId: 'priya_fashion',
    },
    {
      id: 5,
      category: 'books',
      title: 'Complete Harry Potter Collection',
      seller: 'Amit Verma',
      rating: 4.6,
      reviews: 28,
      price: 3500,
      location: 'Koramangala, Bangalore',
      description: 'All 7 books in excellent condition. Hardcover editions.',
      image: 'https://via.placeholder.com/300x300?text=Harry+Potter',
      telegramId: 'amit_books',
    },
    {
      id: 6,
      category: 'sports',
      title: 'Yonex Badminton Racket',
      seller: 'Vikram Reddy',
      rating: 4.9,
      reviews: 19,
      price: 4500,
      location: 'Hitech City, Hyderabad',
      description: 'Professional grade racket, barely used. Comes with cover.',
      image: 'https://via.placeholder.com/300x300?text=Badminton',
      telegramId: 'vikram_sports',
    },
  ]

  // Load user-created listings from localStorage
  useEffect(() => {
    const storedListings = JSON.parse(localStorage.getItem('listings') || '[]')
    const productListingsFromStorage = storedListings
      .filter((listing: any) => listing.listingType === 'product' && listing.status !== 'sold')
      .map((listing: any) => ({
        id: listing.id,
        category: listing.category.toLowerCase(),
        title: listing.title,
        seller: listing.providerName,
        rating: 4.5,
        reviews: 0,
        price: parseInt(listing.price) || 0,
        location: listing.location,
        description: listing.description,
        image: listing.image || 'https://via.placeholder.com/300x300?text=' + encodeURIComponent(listing.title.substring(0, 20)),
        telegramId: listing.telegramId,
      }))
    setUserListings(productListingsFromStorage)
  }, [])

  // Combine mock and user listings
  const allListings = [...productListings, ...userListings]
  
  const filteredListings = selectedCategory === 'all' 
    ? allListings 
    : allListings.filter(listing => listing.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto max-w-7xl px-4 py-12">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
            Products for Sale
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Browse quality products from verified sellers in your area
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`rounded-full px-6 py-2.5 font-medium transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-white text-gray-700 shadow-sm hover:shadow-md'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Product Listings Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredListings.map((listing) => (
            <div
              key={listing.id}
              className="group overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-xl"
            >
              {/* Product Image */}
              <div className="aspect-square overflow-hidden bg-gray-100">
                <img
                  src={listing.image}
                  alt={listing.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="p-6">
                {/* Title & Seller */}
                <h3 className="mb-2 text-xl font-bold text-gray-900">
                  {listing.title}
                </h3>
                <div className="mb-3 flex items-center gap-2 text-sm text-gray-600">
                  <User className="h-4 w-4" />
                  <span>{listing.seller}</span>
                </div>

                {/* Rating */}
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-gray-900">{listing.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">({listing.reviews} reviews)</span>
                </div>

                {/* Description */}
                <p className="mb-4 text-sm text-gray-600">{listing.description}</p>

                {/* Location */}
                <div className="mb-4 flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{listing.location}</span>
                </div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between border-t pt-4">
                  <div>
                    <p className="text-sm text-gray-600">Price</p>
                    <p className="text-2xl font-bold text-primary">₹{listing.price.toLocaleString()}</p>
                  </div>
                  <a
                    href={`https://t.me/${listing.telegramId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg bg-primary px-6 py-2.5 font-semibold text-white transition-colors duration-200 hover:bg-primary/90"
                  >
                    Contact Seller
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 p-8 text-center text-white">
          <h2 className="mb-4 text-3xl font-bold">Want to Sell Your Products?</h2>
          <p className="mb-6 text-lg">
            List your items and reach thousands of potential buyers
          </p>
          <a
            href="/sell"
            className="inline-block rounded-lg bg-white px-8 py-3 font-semibold text-blue-600 transition-colors duration-300 hover:bg-gray-100"
          >
            Create Listing
          </a>
        </div>
      </div>
    </div>
  )
}
