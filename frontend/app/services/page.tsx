'use client'

import { ShoppingBag, UtensilsCrossed, Package, MapPin, Star, Clock, X, User, Send, Calendar, ShoppingCart, Tag } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ServicesPage() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [userListings, setUserListings] = useState<any[]>([])
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [selectedListing, setSelectedListing] = useState<any>(null)
  const [sortByDiscount, setSortByDiscount] = useState(false)

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'instamart', label: 'Instamart Order' },
    { id: 'food', label: 'Food Order' },
    { id: 'other', label: 'Other' },
  ]

  // Mock service listings - replace with API call
  const serviceListings = [
    {
      id: 1,
      category: 'instamart',
      title: 'Will do your Instamart shopping',
      provider: 'Rahul Kumar',
      telegramId: 'harshdeep1289',
      rating: 4.8,
      reviews: 124,
      price: 50,
      location: 'Sector 62, Noida',
      description: 'Quick and reliable Instamart orders. I can get your groceries in 30 mins.',
      deliveryTime: '30 mins',
      icon: ShoppingBag,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      id: 2,
      category: 'food',
      title: 'Food delivery service',
      provider: 'Priya Sharma',
      telegramId: 'priya_fooddelivery',
      rating: 4.9,
      reviews: 89,
      price: 40,
      location: 'Connaught Place, Delhi',
      description: 'Fast food delivery from any restaurant. Hot and fresh guaranteed!',
      deliveryTime: '45 mins',
      icon: UtensilsCrossed,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      id: 3,
      category: 'instamart',
      title: 'Grocery pickup & delivery',
      provider: 'Amit Singh',
      telegramId: 'amit_grocery',
      rating: 4.7,
      reviews: 67,
      price: 60,
      location: 'Whitefield, Bangalore',
      description: 'I will get your groceries from Instamart quickly and safely.',
      deliveryTime: '40 mins',
      icon: ShoppingBag,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      id: 4,
      category: 'food',
      title: 'Restaurant order pickup',
      provider: 'Neha Gupta',
      telegramId: 'neha_restaurants',
      rating: 5.0,
      reviews: 143,
      price: 35,
      location: 'Koramangala, Bangalore',
      description: 'Expert in handling food orders. Your meal will arrive fresh!',
      deliveryTime: '35 mins',
      icon: UtensilsCrossed,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      id: 5,
      category: 'other',
      title: 'Package pickup service',
      provider: 'Vikram Mehta',
      telegramId: 'vikram_courier',
      rating: 4.6,
      reviews: 92,
      price: 80,
      location: 'Powai, Mumbai',
      description: 'Reliable delivery service for packages, documents, and more.',
      deliveryTime: '1 hour',
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      id: 6,
      category: 'other',
      title: 'Errand running service',
      provider: 'Sneha Patel',
      telegramId: 'sneha_errands',
      rating: 4.8,
      reviews: 76,
      price: 100,
      location: 'Bandra, Mumbai',
      description: 'I can run any errand for you - shopping, pickup, drop-off, etc.',
      deliveryTime: 'Flexible',
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
  ]

  // Check if user is logged in
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null')
    setCurrentUser(user)
  }, [])

  // Load user-created listings from localStorage
  useEffect(() => {
    const storedListings = JSON.parse(localStorage.getItem('listings') || '[]')
    const serviceListingsFromStorage = storedListings
      .filter((listing: any) => listing.listingType === 'service' && listing.status !== 'sold')
      .map((listing: any) => {
        // Map category names to filter IDs
        let categoryId = 'other'
        if (listing.category === 'Instamart Order') {
          categoryId = 'instamart'
        } else if (listing.category === 'Food Order') {
          categoryId = 'food'
        }
        
        return {
          id: listing.id,
          category: categoryId,
          title: listing.title,
          provider: listing.providerName,
          rating: 4.5,
          reviews: 0,
          price: parseInt(listing.price) || 0,
          location: listing.location,
          description: listing.description,
          deliveryTime: listing.deliveryTime || 'Contact for details',
          minimumCartValue: listing.minimumCartValue,
          serviceDiscount: listing.serviceDiscount,
          icon: listing.category === 'Instamart Order' ? ShoppingBag : 
                listing.category === 'Food Order' ? UtensilsCrossed : Package,
          color: listing.category === 'Instamart Order' ? 'text-purple-600' : 
                 listing.category === 'Food Order' ? 'text-orange-600' : 'text-blue-600',
          bgColor: listing.category === 'Instamart Order' ? 'bg-purple-50' : 
                   listing.category === 'Food Order' ? 'bg-orange-50' : 'bg-blue-50',
          telegramId: listing.telegramId,
        }
      })
    setUserListings(serviceListingsFromStorage)
  }, [])

  // Calculate actual ratings from bookings
  const calculateSellerRating = (telegramId: string) => {
    const allBookings = JSON.parse(localStorage.getItem('bookings') || '[]')
    const sellerBookings = allBookings.filter(
      (booking: any) => booking.sellerTelegram === telegramId && booking.rating
    )
    
    if (sellerBookings.length === 0) {
      return { rating: 0, reviews: 0 }
    }
    
    const totalRating = sellerBookings.reduce((sum: number, booking: any) => sum + booking.rating, 0)
    const averageRating = totalRating / sellerBookings.length
    
    return {
      rating: Math.round(averageRating * 10) / 10, // Round to 1 decimal
      reviews: sellerBookings.length
    }
  }

  // Combine mock and user listings with calculated ratings
  const allListingsWithRatings = [...serviceListings, ...userListings].map(listing => {
    const { rating, reviews } = calculateSellerRating(listing.telegramId)
    return {
      ...listing,
      rating: rating, // Use calculated rating (0 if none)
      reviews: reviews // Use calculated review count (0 if none)
    }
  })
  
  let filteredListings = selectedCategory === 'all' 
    ? allListingsWithRatings 
    : allListingsWithRatings.filter(listing => listing.category === selectedCategory)
  
  // Sort by discount if enabled
  if (sortByDiscount) {
    filteredListings = [...filteredListings].sort((a, b) => {
      const discountA = parseInt(a.serviceDiscount) || 0
      const discountB = parseInt(b.serviceDiscount) || 0
      return discountB - discountA // High to low
    })
  }

  const handleBookNowClick = (listing: any) => {
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null')
    
    if (!user) {
      const confirmed = confirm('You need to login first to book a service. Would you like to go to the login page?')
      if (confirmed) {
        // Store the listing they wanted to book
        localStorage.setItem('pendingBookingListing', JSON.stringify(listing))
        router.push('/auth/login?returnUrl=/services')
      }
      return
    }
    
    // Show confirmation modal
    setSelectedListing(listing)
    setShowBookingModal(true)
  }

  const handleConfirmBooking = () => {
    if (!selectedListing || !currentUser) return

    // Create booking
    const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]')
    
    const newBooking = {
      id: Date.now(),
      listingId: selectedListing.id,
      listingTitle: selectedListing.title,
      listingType: 'service',
      category: selectedListing.category,
      price: selectedListing.price,
      location: selectedListing.location,
      sellerName: selectedListing.provider,
      sellerTelegram: selectedListing.telegramId,
      buyerId: currentUser.id,
      buyerName: currentUser.name,
      createdAt: new Date().toISOString(),
      status: 'pending',
    }
    
    existingBookings.push(newBooking)
    localStorage.setItem('bookings', JSON.stringify(existingBookings))
    
    // Close modal
    setShowBookingModal(false)
    
    // Show success message and redirect
    alert('Booking confirmed! You can now contact the service provider on Telegram.')
    router.push('/bookings')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto max-w-7xl px-4 py-12">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
            Service Listings
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Browse services from trusted providers in your area
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-6 flex flex-wrap justify-center gap-3">
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

        {/* Sort Filter */}
        <div className="mb-8 flex justify-center">
          <button
            onClick={() => setSortByDiscount(!sortByDiscount)}
            className={`flex items-center gap-2 rounded-full px-6 py-2.5 font-medium transition-all duration-200 ${
              sortByDiscount
                ? 'bg-green-600 text-white shadow-lg'
                : 'bg-white text-gray-700 shadow-sm hover:shadow-md'
            }`}
          >
            <Tag className="h-4 w-4" />
            <span>High Discount</span>
          </button>
        </div>

        {/* Service Listings Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredListings.map((listing) => (
            <div
              key={listing.id}
              className="group overflow-hidden rounded-xl bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl"
            >
              {/* Icon Badge */}
              <div className={`mb-4 inline-flex rounded-lg ${listing.bgColor} p-3`}>
                <listing.icon className={`h-6 w-6 ${listing.color}`} />
              </div>

              {/* Title & Provider */}
              <h3 className="mb-2 text-xl font-bold text-gray-900">
                {listing.title}
              </h3>
              <p className="mb-3 text-sm text-gray-600">by {listing.provider}</p>

              {/* Rating */}
              <div className="mb-3 flex items-center gap-2">
                {listing.rating > 0 ? (
                  <>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-gray-900">{listing.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">({listing.reviews} reviews)</span>
                  </>
                ) : (
                  <span className="text-sm text-gray-500">No ratings yet</span>
                )}
              </div>

              {/* Description */}
              <p className="mb-4 text-sm text-gray-600">{listing.description}</p>

              {/* Location & Time */}
              <div className="mb-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{listing.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>{listing.deliveryTime}</span>
                </div>
              </div>

              {/* Service Details & CTA */}
              <div className="border-t pt-4">
                <div className="mb-3 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <ShoppingCart className="h-4 w-4" />
                      <span>Min. Cart Value</span>
                    </div>
                    <span className="font-semibold text-gray-900">₹{listing.minimumCartValue || 0}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Tag className="h-4 w-4" />
                      <span>Discount</span>
                    </div>
                    <span className="font-semibold text-green-600">₹{listing.serviceDiscount || 0} off</span>
                  </div>
                </div>
                <button
                  onClick={() => handleBookNowClick(listing)}
                  className="w-full rounded-lg bg-primary px-6 py-2.5 font-semibold text-white transition-colors duration-200 hover:bg-primary/90"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 p-8 text-center text-white">
          <h2 className="mb-4 text-3xl font-bold">Want to Offer Your Services?</h2>
          <p className="mb-6 text-lg">
            Join our platform and start earning by helping others with their daily tasks
          </p>
          <button className="rounded-lg bg-white px-8 py-3 font-semibold text-blue-600 transition-colors duration-300 hover:bg-gray-100">
            Create Listing
          </button>
        </div>
      </div>

      {/* Booking Confirmation Modal */}
      {showBookingModal && selectedListing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            {/* Modal Header */}
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">Confirm Booking</h3>
              <button
                onClick={() => setShowBookingModal(false)}
                className="rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Service Details */}
            <div className="mb-6 space-y-4">
              <div>
                <h4 className="text-lg font-semibold text-gray-900">{selectedListing.title}</h4>
                <p className="text-sm text-gray-600">by {selectedListing.provider}</p>
              </div>

              <div className="space-y-3 rounded-lg bg-gray-50 p-4">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 text-gray-400" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-700">Location</p>
                    <p className="text-sm text-gray-600">{selectedListing.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 text-gray-400" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-700">Delivery Time</p>
                    <p className="text-sm text-gray-600">{selectedListing.deliveryTime}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Send className="mt-0.5 h-5 w-5 text-gray-400" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-700">Contact</p>
                    <p className="text-sm text-gray-600">@{selectedListing.telegramId}</p>
                  </div>
                </div>

                <div className="border-t pt-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-700">Service Price</p>
                    <p className="text-2xl font-bold text-primary">₹{selectedListing.price}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-blue-50 p-4">
                <p className="text-sm text-gray-700">
                  <strong>Note:</strong> After confirming, you'll be redirected to your bookings page where you can contact the service provider on Telegram to finalize the details.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowBookingModal(false)}
                className="flex-1 rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmBooking}
                className="flex-1 rounded-lg bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary/90"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
