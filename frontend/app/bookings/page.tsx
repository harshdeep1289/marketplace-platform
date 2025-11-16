'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Clock, Send, Package, Tag, Ticket, Briefcase, Calendar, MapPin, Phone, Star, X } from 'lucide-react'

interface Booking {
  id: number
  listingId: number
  listingTitle: string
  listingType: string
  category: string
  price: number
  location: string
  sellerName: string
  sellerTelegram: string
  buyerId: number
  buyerName: string
  createdAt: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  rating?: number
  review?: string
}

export default function BookingsPage() {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [bookings, setBookings] = useState<Booking[]>([])
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [showRatingModal, setShowRatingModal] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [review, setReview] = useState('')

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null')
    if (!user) {
      router.push('/auth/login?returnUrl=/bookings')
      return
    }
    setCurrentUser(user)

    const allBookings = JSON.parse(localStorage.getItem('bookings') || '[]')
    const myBookings = allBookings.filter((b: Booking) => b.buyerId === user.id)
    setBookings(myBookings)
  }, [router])

  const getListingIcon = (type: string) => {
    switch (type) {
      case 'product': return Package
      case 'deal': return Tag
      case 'coupon': return Ticket
      case 'service': return Briefcase
      default: return Package
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-700'
      case 'completed': return 'bg-blue-100 text-blue-700'
      case 'cancelled': return 'bg-red-100 text-red-700'
      default: return 'bg-yellow-100 text-yellow-700'
    }
  }

  const filteredBookings = selectedStatus === 'all' 
    ? bookings 
    : bookings.filter(booking => booking.status === selectedStatus)

  const handleOpenRatingModal = (booking: Booking) => {
    setSelectedBooking(booking)
    setRating(booking.rating || 0)
    setReview(booking.review || '')
    setShowRatingModal(true)
  }

  const handleSubmitRating = () => {
    if (!selectedBooking || rating === 0) {
      alert('Please select a rating!')
      return
    }

    const allBookings = JSON.parse(localStorage.getItem('bookings') || '[]')
    const updatedBookings = allBookings.map((b: Booking) => {
      if (b.id === selectedBooking.id) {
        return { ...b, rating, review, status: 'completed' }
      }
      return b
    })
    
    localStorage.setItem('bookings', JSON.stringify(updatedBookings))
    
    // Reload bookings
    const myBookings = updatedBookings.filter((b: Booking) => b.buyerId === currentUser?.id)
    setBookings(myBookings)
    
    // Close modal
    setShowRatingModal(false)
    setRating(0)
    setHoverRating(0)
    setReview('')
    setSelectedBooking(null)
    
    alert('Thank you for your rating!')
  }

  if (!currentUser) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="container mx-auto max-w-5xl px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold text-gray-900">My Bookings</h1>
          <p className="text-lg text-gray-600">
            Track your bookings and contact sellers
          </p>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-xl bg-white p-4 shadow-md">
            <p className="text-sm text-gray-600">Total</p>
            <p className="text-2xl font-bold text-primary">{bookings.length}</p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow-md">
            <p className="text-sm text-gray-600">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">
              {bookings.filter(b => b.status === 'pending').length}
            </p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow-md">
            <p className="text-sm text-gray-600">Confirmed</p>
            <p className="text-2xl font-bold text-green-600">
              {bookings.filter(b => b.status === 'confirmed').length}
            </p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow-md">
            <p className="text-sm text-gray-600">Completed</p>
            <p className="text-2xl font-bold text-blue-600">
              {bookings.filter(b => b.status === 'completed').length}
            </p>
          </div>
        </div>

        {/* Status Filter */}
        <div className="mb-6 flex flex-wrap gap-3">
          {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`rounded-full px-5 py-2 font-medium capitalize transition-all duration-200 ${
                selectedStatus === status
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-white text-gray-700 shadow-sm hover:shadow-md'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <div className="rounded-xl bg-white p-12 text-center shadow-md">
            <Package className="mx-auto mb-4 h-16 w-16 text-gray-300" />
            <p className="mb-2 text-lg font-semibold text-gray-900">No bookings found</p>
            <p className="mb-6 text-gray-600">
              {selectedStatus === 'all' 
                ? "You haven't made any bookings yet." 
                : `You don't have any ${selectedStatus} bookings.`}
            </p>
            <a
              href="/services"
              className="inline-block rounded-lg bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary/90"
            >
              Browse Services
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((booking) => {
              const Icon = getListingIcon(booking.listingType)
              
              return (
                <div
                  key={booking.id}
                  className="overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg"
                >
                  <div className="p-6">
                    <div className="mb-4 flex items-start justify-between">
                      <div className="flex gap-4">
                        {/* Icon */}
                        <div className="rounded-lg bg-blue-50 p-3">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        
                        {/* Main Info */}
                        <div className="flex-1">
                          <div className="mb-2 flex flex-wrap items-center gap-2">
                            <h2 className="text-xl font-bold text-gray-900">
                              {booking.listingTitle}
                            </h2>
                            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold capitalize text-blue-700">
                              {booking.listingType}
                            </span>
                            <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusColor(booking.status)}`}>
                              {booking.status}
                            </span>
                          </div>
                          
                          <p className="mb-3 text-sm text-gray-600">
                            Category: <strong>{booking.category}</strong>
                          </p>
                          
                          {/* Details Grid */}
                          <div className="grid gap-3 text-sm text-gray-600 sm:grid-cols-2">
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-gray-400" />
                              <span>{booking.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-gray-400" />
                              <span>
                                {new Date(booking.createdAt).toLocaleDateString('en-IN', {
                                  day: 'numeric',
                                  month: 'short',
                                  year: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Price */}
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Price</p>
                        <p className="text-2xl font-bold text-primary">₹{booking.price}</p>
                      </div>
                    </div>
                    
                    {/* Seller Contact Section */}
                    <div className="border-t pt-4">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="mb-1 text-sm text-gray-600">Service Provider</p>
                          <p className="font-semibold text-gray-900">{booking.sellerName}</p>
                          {booking.rating && (
                            <div className="mt-1 flex items-center gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-4 w-4 ${
                                    star <= booking.rating!
                                      ? 'fill-yellow-400 text-yellow-400'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                              <span className="ml-1 text-xs text-gray-600">Your rating</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          <a
                            href={`https://t.me/${booking.sellerTelegram}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 font-semibold text-white transition-colors hover:bg-primary/90"
                          >
                            <Send className="h-4 w-4" />
                            Contact on Telegram
                          </a>
                          {!booking.rating && (
                            <button
                              onClick={() => handleOpenRatingModal(booking)}
                              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 font-semibold text-gray-700 transition-colors hover:bg-gray-50"
                            >
                              <Star className="h-4 w-4" />
                              Rate Service
                            </button>
                          )}
                        </div>
                      </div>
                      <p className="mt-2 text-xs text-gray-500">
                        Telegram: @{booking.sellerTelegram}
                      </p>
                      {booking.review && (
                        <div className="mt-3 rounded-lg bg-gray-50 p-3">
                          <p className="text-sm text-gray-600"><strong>Your review:</strong></p>
                          <p className="mt-1 text-sm text-gray-700">{booking.review}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Info Box */}
        {bookings.length > 0 && (
          <div className="mt-8 rounded-xl bg-blue-50 p-6">
            <h3 className="mb-3 font-semibold text-gray-900">Next Steps:</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-primary">1.</span>
                <span>Click "Contact on Telegram" to reach the service provider directly</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-primary">2.</span>
                <span>Discuss the details and finalize the service/delivery</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-primary">3.</span>
                <span>Complete the payment and service as agreed</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-primary">4.</span>
                <span>Rate your experience to help other users!</span>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Rating Modal */}
      {showRatingModal && selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            {/* Modal Header */}
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">Rate Service</h3>
              <button
                onClick={() => {
                  setShowRatingModal(false)
                  setRating(0)
                  setHoverRating(0)
                  setReview('')
                  setSelectedBooking(null)
                }}
                className="rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Service Info */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900">{selectedBooking.listingTitle}</h4>
              <p className="text-sm text-gray-600">by {selectedBooking.sellerName}</p>
            </div>

            {/* Star Rating */}
            <div className="mb-6">
              <label className="mb-3 block text-sm font-semibold text-gray-700">
                How was your experience?
              </label>
              <div className="flex items-center justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`h-10 w-10 ${
                        star <= (hoverRating || rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <p className="mt-2 text-center text-sm text-gray-600">
                  {rating === 1 && 'Poor'}
                  {rating === 2 && 'Below Average'}
                  {rating === 3 && 'Average'}
                  {rating === 4 && 'Good'}
                  {rating === 5 && 'Excellent'}
                </p>
              )}
            </div>

            {/* Review Text */}
            <div className="mb-6">
              <label htmlFor="review" className="mb-2 block text-sm font-semibold text-gray-700">
                Write a review (optional)
              </label>
              <textarea
                id="review"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                rows={4}
                placeholder="Share your experience with this service provider..."
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowRatingModal(false)
                  setRating(0)
                  setHoverRating(0)
                  setReview('')
                  setSelectedBooking(null)
                }}
                className="flex-1 rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitRating}
                className="flex-1 rounded-lg bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary/90"
              >
                Submit Rating
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
