'use client'

import { Tag, MapPin, Clock, Percent } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function DealsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [userListings, setUserListings] = useState<any[]>([])

  const categories = [
    { id: 'all', label: 'All Deals' },
    { id: 'restaurant', label: 'Restaurant' },
    { id: 'shopping', label: 'Shopping' },
    { id: 'entertainment', label: 'Entertainment' },
    { id: 'travel', label: 'Travel' },
    { id: 'other', label: 'Other' },
  ]

  // Mock deal listings - replace with API call
  const dealListings = [
    {
      id: 1,
      category: 'restaurant',
      title: '50% Off on All Pizzas',
      merchant: 'Dominos Pizza',
      discount: 50,
      originalPrice: 800,
      price: 400,
      location: 'Multiple locations',
      description: 'Get flat 50% off on all pizzas. Valid on orders above ₹500.',
      expiryDate: '2025-12-31',
      telegramId: 'dominos_deals',
    },
    {
      id: 2,
      category: 'shopping',
      title: 'Buy 2 Get 1 Free - Clothing',
      merchant: 'Fashion Hub',
      discount: 33,
      originalPrice: 3000,
      price: 2000,
      location: 'Connaught Place, Delhi',
      description: 'Amazing offer on all clothing items. Mix and match available.',
      expiryDate: '2025-11-30',
      telegramId: 'fashionhub_offers',
    },
    {
      id: 3,
      category: 'entertainment',
      title: 'Movie Tickets @ ₹99',
      merchant: 'PVR Cinemas',
      discount: 67,
      originalPrice: 300,
      price: 99,
      location: 'All PVR locations',
      description: 'Book movie tickets at just ₹99. Valid on weekdays only.',
      expiryDate: '2025-12-15',
      telegramId: 'pvr_deals',
    },
    {
      id: 4,
      category: 'restaurant',
      title: '40% Off on Buffet',
      merchant: 'Barbeque Nation',
      discount: 40,
      originalPrice: 1200,
      price: 720,
      location: 'Bangalore',
      description: 'Enjoy unlimited buffet at 40% discount. Advance booking required.',
      expiryDate: '2025-12-20',
      telegramId: 'bbq_nation_deals',
    },
    {
      id: 5,
      category: 'travel',
      title: 'Goa Trip Package - 30% Off',
      merchant: 'Travel Experts',
      discount: 30,
      originalPrice: 15000,
      price: 10500,
      location: 'Goa',
      description: '3 days 2 nights package including hotel and sightseeing.',
      expiryDate: '2026-01-31',
      telegramId: 'travel_experts',
    },
    {
      id: 6,
      category: 'shopping',
      title: 'Electronics Clearance Sale',
      merchant: 'TechWorld',
      discount: 45,
      originalPrice: 50000,
      price: 27500,
      location: 'Multiple locations',
      description: 'Year-end clearance on selected electronics. Limited stock.',
      expiryDate: '2025-12-25',
      telegramId: 'techworld_deals',
    },
  ]

  // Load user-created listings from localStorage
  useEffect(() => {
    const storedListings = JSON.parse(localStorage.getItem('listings') || '[]')
    const dealListingsFromStorage = storedListings
      .filter((listing: any) => listing.listingType === 'deal' && listing.status !== 'sold')
      .map((listing: any) => ({
        id: listing.id,
        category: listing.category.toLowerCase(),
        title: listing.title,
        merchant: listing.providerName,
        discount: parseInt(listing.discount) || 0,
        originalPrice: parseInt(listing.originalPrice) || 0,
        price: parseInt(listing.price) || 0,
        location: listing.location,
        description: listing.description,
        expiryDate: listing.expiryDate || new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0],
        telegramId: listing.telegramId,
      }))
    setUserListings(dealListingsFromStorage)
  }, [])

  // Combine mock and user listings
  const allListings = [...dealListings, ...userListings]
  
  const filteredListings = selectedCategory === 'all' 
    ? allListings 
    : allListings.filter(listing => listing.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      <div className="container mx-auto max-w-7xl px-4 py-12">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
            Hot Deals
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Don't miss out on these amazing limited-time offers
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
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 shadow-sm hover:shadow-md'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Deal Listings Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredListings.map((listing) => (
            <div
              key={listing.id}
              className="group overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-xl"
            >
              <div className="p-6">
                {/* Discount Badge */}
                <div className="mb-4 inline-block rounded-full bg-red-600 px-4 py-1.5 text-sm font-bold text-white shadow-lg">
                  {listing.discount}% OFF
                </div>
                {/* Title & Merchant */}
                <h3 className="mb-2 text-xl font-bold text-gray-900">
                  {listing.title}
                </h3>
                <p className="mb-3 text-sm font-medium text-gray-600">{listing.merchant}</p>

                {/* Description */}
                <p className="mb-4 text-sm text-gray-600">{listing.description}</p>

                {/* Location & Expiry */}
                <div className="mb-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{listing.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>Valid till {new Date(listing.expiryDate).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between border-t pt-4">
                  <div>
                    <p className="text-sm text-gray-500 line-through">₹{listing.originalPrice.toLocaleString()}</p>
                    <p className="text-2xl font-bold text-red-600">₹{listing.price.toLocaleString()}</p>
                  </div>
                  <a
                    href={`https://t.me/${listing.telegramId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg bg-red-600 px-6 py-2.5 font-semibold text-white transition-colors duration-200 hover:bg-red-700"
                  >
                    Grab Deal
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 rounded-2xl bg-gradient-to-r from-red-500 to-orange-600 p-8 text-center text-white">
          <h2 className="mb-4 text-3xl font-bold">Have an Amazing Deal to Share?</h2>
          <p className="mb-6 text-lg">
            List your deals and reach thousands of potential customers
          </p>
          <a
            href="/sell"
            className="inline-block rounded-lg bg-white px-8 py-3 font-semibold text-red-600 transition-colors duration-300 hover:bg-gray-100"
          >
            Create Deal
          </a>
        </div>
      </div>
    </div>
  )
}
