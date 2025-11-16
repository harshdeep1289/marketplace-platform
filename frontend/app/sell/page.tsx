'use client'

import { ShoppingBag, Tag, Ticket, Briefcase, User, MapPin, DollarSign, Clock, Send, Percent, Calendar, ShoppingCart } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function SellPage() {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    listingType: '',
    category: '',
    title: '',
    providerName: '',
    telegramId: '',
    price: '',
    originalPrice: '',
    discount: '',
    minimumCartValue: '',
    serviceDiscount: '',
    location: '',
    deliveryTime: '',
    expiryDate: '',
    description: '',
    image: '',
  })

  // Check authentication on mount
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null')
    setCurrentUser(user)
  }, [])

  const listingTypes = [
    { id: 'product', label: 'Product', icon: ShoppingBag },
    { id: 'service', label: 'Service', icon: Briefcase },
    { id: 'deal', label: 'Deal', icon: Tag },
    { id: 'coupon', label: 'Coupon', icon: Ticket },
  ]

  const categoryOptions: Record<string, string[]> = {
    product: ['Electronics', 'Furniture', 'Clothing', 'Books', 'Sports', 'Other'],
    service: ['Instamart Order', 'Food Order', 'Home Services', 'Professional Services', 'Other'],
    deal: ['Restaurant', 'Shopping', 'Entertainment', 'Travel', 'Other'],
    coupon: ['Food', 'Shopping', 'Online Services', 'Entertainment', 'Other'],
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null')
    if (!user) {
      const confirmed = confirm('You need to login first to create a listing. Would you like to go to the login page?')
      if (confirmed) {
        router.push('/auth/login?returnUrl=/sell')
      }
      return
    }
    
    // Create listing object
    const newListing = {
      id: Date.now(),
      ...formData,
      userId: user.id,
      status: 'active',
      createdAt: new Date().toISOString(),
    }
    
    // Get existing listings from localStorage
    const existingListings = JSON.parse(localStorage.getItem('listings') || '[]')
    
    // Add new listing
    existingListings.push(newListing)
    
    // Save to localStorage
    localStorage.setItem('listings', JSON.stringify(existingListings))
    
    console.log('Form submitted:', newListing)
    
    // Redirect to appropriate page based on listing type
    const redirectMap: Record<string, string> = {
      product: '/products',
      service: '/services',
      deal: '/deals',
      coupon: '/coupons',
    }
    
    const redirectPath = redirectMap[formData.listingType] || '/'
    alert(`Listing created successfully! Redirecting to ${formData.listingType} page...`)
    
    // Redirect after a short delay
    setTimeout(() => {
      router.push(redirectPath)
    }, 1000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
      // Reset category when listing type changes
      ...(name === 'listingType' ? { category: '' } : {}),
    })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Create image preview
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setImagePreview(result)
        setFormData({ ...formData, image: result })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="container mx-auto max-w-3xl px-4">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
            Create Your Listing
          </h1>
          <p className="text-lg text-gray-600">
            List your products, services, deals, or coupons to reach thousands of buyers
          </p>
        </div>

        {/* Form */}
        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Listing Type Selection */}
            <div>
              <label className="mb-3 block text-sm font-semibold text-gray-700">
                Listing Type *
              </label>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {listingTypes.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, listingType: option.id, category: '' })}
                    className={`flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-all ${
                      formData.listingType === option.id
                        ? 'border-primary bg-blue-50 text-primary'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <option.icon className="h-8 w-8" />
                    <span className="font-medium">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Category Selection - Shows after listing type is selected */}
            {formData.listingType && (
              <div>
                <label htmlFor="category" className="mb-2 block text-sm font-semibold text-gray-700">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="">Select a category</option>
                  {categoryOptions[formData.listingType]?.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Title */}
            <div>
              <label htmlFor="title" className="mb-2 block text-sm font-semibold text-gray-700">
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., iPhone 13 Pro Max, 50% off Pizza, Instamart delivery service"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* Provider Name */}
            <div>
              <label htmlFor="providerName" className="mb-2 block text-sm font-semibold text-gray-700">
                Your Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  id="providerName"
                  name="providerName"
                  required
                  value={formData.providerName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full rounded-lg border border-gray-300 py-3 pl-11 pr-4 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            {/* Telegram ID */}
            <div>
              <label htmlFor="telegramId" className="mb-2 block text-sm font-semibold text-gray-700">
                Telegram Username *
              </label>
              <div className="relative">
                <Send className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  id="telegramId"
                  name="telegramId"
                  required
                  value={formData.telegramId}
                  onChange={handleChange}
                  placeholder="@yourusername"
                  className="w-full rounded-lg border border-gray-300 py-3 pl-11 pr-4 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Customers will contact you via Telegram
              </p>
            </div>

            {/* Price Row */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {/* Current Price */}
              <div>
                <label htmlFor="price" className="mb-2 block text-sm font-semibold text-gray-700">
                  Price (₹) *
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    id="price"
                    name="price"
                    required
                    min="0"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="500"
                    className="w-full rounded-lg border border-gray-300 py-3 pl-11 pr-4 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              {/* Original Price (for deals/coupons) */}
              {(formData.listingType === 'deal' || formData.listingType === 'coupon') && (
                <div>
                  <label htmlFor="originalPrice" className="mb-2 block text-sm font-semibold text-gray-700">
                    Original Price (₹)
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <input
                      type="number"
                      id="originalPrice"
                      name="originalPrice"
                      min="0"
                      value={formData.originalPrice}
                      onChange={handleChange}
                      placeholder="1000"
                      className="w-full rounded-lg border border-gray-300 py-3 pl-11 pr-4 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
              )}

              {/* Discount Percentage */}
              {(formData.listingType === 'deal' || formData.listingType === 'coupon') && (
                <div>
                  <label htmlFor="discount" className="mb-2 block text-sm font-semibold text-gray-700">
                    Discount (%)
                  </label>
                  <div className="relative">
                    <Percent className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <input
                      type="number"
                      id="discount"
                      name="discount"
                      min="0"
                      max="100"
                      value={formData.discount}
                      onChange={handleChange}
                      placeholder="50"
                      className="w-full rounded-lg border border-gray-300 py-3 pl-11 pr-4 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Service-specific fields */}
            {formData.listingType === 'service' && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Minimum Cart Value */}
                <div>
                  <label htmlFor="minimumCartValue" className="mb-2 block text-sm font-semibold text-gray-700">
                    Minimum Cart Value (₹) *
                  </label>
                  <div className="relative">
                    <ShoppingCart className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <input
                      type="number"
                      id="minimumCartValue"
                      name="minimumCartValue"
                      required
                      min="0"
                      value={formData.minimumCartValue}
                      onChange={handleChange}
                      placeholder="e.g., 500"
                      className="w-full rounded-lg border border-gray-300 py-3 pl-11 pr-4 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Minimum order value for this service
                  </p>
                </div>

                {/* Service Discount */}
                <div>
                  <label htmlFor="serviceDiscount" className="mb-2 block text-sm font-semibold text-gray-700">
                    Discount Offered (₹) *
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <input
                      type="number"
                      id="serviceDiscount"
                      name="serviceDiscount"
                      required
                      min="0"
                      value={formData.serviceDiscount}
                      onChange={handleChange}
                      placeholder="e.g., 50"
                      className="w-full rounded-lg border border-gray-300 py-3 pl-11 pr-4 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Discount amount you offer on the service fee
                  </p>
                </div>
              </div>
            )}

            {/* Additional Details Row */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Delivery Time (for products/services) */}
              {(formData.listingType === 'product' || formData.listingType === 'service') && (
                <div>
                  <label htmlFor="deliveryTime" className="mb-2 block text-sm font-semibold text-gray-700">
                    Delivery Time
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      id="deliveryTime"
                      name="deliveryTime"
                      value={formData.deliveryTime}
                      onChange={handleChange}
                      placeholder="e.g., 2-3 days, 30 mins"
                      className="w-full rounded-lg border border-gray-300 py-3 pl-11 pr-4 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
              )}

              {/* Expiry Date (for deals/coupons) */}
              {(formData.listingType === 'deal' || formData.listingType === 'coupon') && (
                <div>
                  <label htmlFor="expiryDate" className="mb-2 block text-sm font-semibold text-gray-700">
                    Expiry Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <input
                      type="date"
                      id="expiryDate"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 py-3 pl-11 pr-4 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="mb-2 block text-sm font-semibold text-gray-700">
                Location *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  id="location"
                  name="location"
                  required
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g., Sector 62, Noida"
                  className="w-full rounded-lg border border-gray-300 py-3 pl-11 pr-4 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="mb-2 block text-sm font-semibold text-gray-700">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                required
                value={formData.description}
                onChange={handleChange}
                rows={4}
                placeholder="Provide detailed information about your listing..."
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* Image Upload (only for products) */}
            {formData.listingType === 'product' && (
              <div>
                <label htmlFor="image" className="mb-2 block text-sm font-semibold text-gray-700">
                  Product Image *
                </label>
                <div className="space-y-3">
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    required
                    onChange={handleImageChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  {imagePreview && (
                    <div className="mt-3">
                      <p className="mb-2 text-sm text-gray-600">Preview:</p>
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="h-48 w-full rounded-lg object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full rounded-lg bg-primary py-4 text-lg font-semibold text-white transition-colors hover:bg-primary/90"
            >
              Create Listing
            </button>
          </form>
        </div>

        {/* Info Section */}
        <div className="mt-8 rounded-xl bg-blue-50 p-6">
          <h3 className="mb-3 font-semibold text-gray-900">How it works:</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="mt-1 text-primary">✓</span>
              <span>Choose your listing type: Product, Service, Deal, or Coupon</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-primary">✓</span>
              <span>Fill out the form with complete details</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-primary">✓</span>
              <span>Your listing will be visible to thousands of potential buyers</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-primary">✓</span>
              <span>Customers will contact you directly via Telegram</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-primary">✓</span>
              <span>Close the deal and earn money!</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
