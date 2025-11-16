'use client'

import { Ticket, Clock, Copy, Check } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function CouponsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [userListings, setUserListings] = useState<any[]>([])

  const categories = [
    { id: 'all', label: 'All Coupons' },
    { id: 'food', label: 'Food' },
    { id: 'shopping', label: 'Shopping' },
    { id: 'online', label: 'Online Services' },
    { id: 'entertainment', label: 'Entertainment' },
    { id: 'other', label: 'Other' },
  ]

  // Mock coupon listings - replace with API call
  const couponListings = [
    {
      id: 1,
      category: 'food',
      title: 'Swiggy - ₹100 Off',
      merchant: 'Swiggy',
      code: 'SWIGGY100',
      discount: 100,
      minOrder: 299,
      description: 'Get ₹100 off on orders above ₹299. Valid for all users.',
      expiryDate: '2025-12-31',
      telegramId: 'swiggy_coupons',
    },
    {
      id: 2,
      category: 'shopping',
      title: 'Amazon - 20% Off Electronics',
      merchant: 'Amazon',
      code: 'TECH20',
      discount: 20,
      minOrder: 2000,
      description: '20% discount on electronics. Max discount ₹1000.',
      expiryDate: '2025-12-25',
      telegramId: 'amazon_deals',
    },
    {
      id: 3,
      category: 'food',
      title: 'Zomato Gold Membership',
      merchant: 'Zomato',
      code: 'GOLDMEMBER',
      discount: 50,
      minOrder: 0,
      description: 'Get 50% off with Zomato Gold. Valid at partner restaurants.',
      expiryDate: '2026-01-31',
      telegramId: 'zomato_offers',
    },
    {
      id: 4,
      category: 'online',
      title: 'Netflix - 1 Month Free',
      merchant: 'Netflix',
      code: 'NETFLIX30',
      discount: 100,
      minOrder: 0,
      description: 'First month free for new subscribers. Premium plan.',
      expiryDate: '2025-12-31',
      telegramId: 'netflix_deals',
    },
    {
      id: 5,
      category: 'shopping',
      title: 'Flipkart - ₹500 Off Fashion',
      merchant: 'Flipkart',
      code: 'FASHION500',
      discount: 500,
      minOrder: 1999,
      description: 'Flat ₹500 off on fashion items above ₹1999.',
      expiryDate: '2025-11-30',
      telegramId: 'flipkart_coupons',
    },
    {
      id: 6,
      category: 'entertainment',
      title: 'BookMyShow - ₹150 Off',
      merchant: 'BookMyShow',
      code: 'BMS150',
      discount: 150,
      minOrder: 500,
      description: '₹150 off on movie tickets. Valid on 2 or more tickets.',
      expiryDate: '2025-12-20',
      telegramId: 'bms_offers',
    },
  ]

  // Load user-created listings from localStorage
  useEffect(() => {
    const storedListings = JSON.parse(localStorage.getItem('listings') || '[]')
    const couponListingsFromStorage = storedListings
      .filter((listing: any) => listing.listingType === 'coupon' && listing.status !== 'sold')
      .map((listing: any) => ({
        id: listing.id,
        category: listing.category.toLowerCase().replace(' ', ''),
        title: listing.title,
        merchant: listing.providerName,
        code: 'COUPON' + listing.id,
        discount: parseInt(listing.discount) || parseInt(listing.price) || 0,
        minOrder: 0,
        description: listing.description,
        expiryDate: listing.expiryDate || new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0],
        telegramId: listing.telegramId,
      }))
    setUserListings(couponListingsFromStorage)
  }, [])

  // Combine mock and user listings
  const allListings = [...couponListings, ...userListings]
  
  const filteredListings = selectedCategory === 'all' 
    ? allListings 
    : allListings.filter(listing => listing.category === selectedCategory)

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto max-w-7xl px-4 py-12">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
            Exclusive Coupons
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Grab the best coupon codes and save big on your purchases
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
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 shadow-sm hover:shadow-md'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Coupon Listings Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredListings.map((listing) => (
            <div
              key={listing.id}
              className="group overflow-hidden rounded-xl border-2 border-dashed border-green-300 bg-white p-6 shadow-md transition-all duration-300 hover:border-green-500 hover:shadow-xl"
            >
              {/* Header with Icon */}
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-green-100 p-2">
                    <Ticket className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{listing.title}</h3>
                    <p className="text-sm text-gray-600">{listing.merchant}</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="mb-4 text-sm text-gray-600">{listing.description}</p>

              {/* Coupon Code */}
              <div className="mb-4 rounded-lg bg-green-50 p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">Coupon Code</p>
                    <p className="font-mono text-lg font-bold text-green-700">{listing.code}</p>
                  </div>
                  <button
                    onClick={() => handleCopyCode(listing.code)}
                    className="rounded-lg bg-green-600 p-2 text-white transition-colors hover:bg-green-700"
                  >
                    {copiedCode === listing.code ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <Copy className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Details */}
              <div className="mb-4 space-y-2 border-t pt-3">
                {listing.minOrder > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Min. Order:</span>
                    <span className="font-semibold text-gray-900">₹{listing.minOrder}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Discount:</span>
                  <span className="font-semibold text-green-600">
                    {typeof listing.discount === 'number' && listing.discount <= 100 
                      ? `${listing.discount}%` 
                      : `₹${listing.discount}`}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>Valid till {new Date(listing.expiryDate).toLocaleDateString()}</span>
                </div>
              </div>

              {/* CTA */}
              <a
                href={`https://t.me/${listing.telegramId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full rounded-lg bg-green-600 py-3 text-center font-semibold text-white transition-colors duration-200 hover:bg-green-700"
              >
                Get Coupon
              </a>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 rounded-2xl bg-gradient-to-r from-green-500 to-teal-600 p-8 text-center text-white">
          <h2 className="mb-4 text-3xl font-bold">Share Your Coupons!</h2>
          <p className="mb-6 text-lg">
            Have exclusive coupon codes? Share them with the community
          </p>
          <a
            href="/sell"
            className="inline-block rounded-lg bg-white px-8 py-3 font-semibold text-green-600 transition-colors duration-300 hover:bg-gray-100"
          >
            Submit Coupon
          </a>
        </div>
      </div>
    </div>
  )
}
