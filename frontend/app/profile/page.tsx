'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { User, Package, Tag, Ticket, Briefcase, CheckCircle, XCircle, Trash2 } from 'lucide-react'

export default function ProfilePage() {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [userListings, setUserListings] = useState<any[]>([])
  const [selectedTab, setSelectedTab] = useState('all')

  useEffect(() => {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null')
    if (!user) {
      router.push('/auth/login?returnUrl=/profile')
      return
    }
    setCurrentUser(user)

    // Load user's listings
    loadUserListings(user.id)
  }, [])

  const loadUserListings = (userId: number) => {
    const allListings = JSON.parse(localStorage.getItem('listings') || '[]')
    const myListings = allListings.filter((listing: any) => listing.userId === userId)
    setUserListings(myListings)
  }

  const handleMarkAsSold = (listingId: number) => {
    const allListings = JSON.parse(localStorage.getItem('listings') || '[]')
    const updatedListings = allListings.map((listing: any) => {
      if (listing.id === listingId) {
        return { ...listing, status: 'sold' }
      }
      return listing
    })
    localStorage.setItem('listings', JSON.stringify(updatedListings))
    loadUserListings(currentUser.id)
    alert('Listing marked as sold!')
  }

  const handleMarkAsActive = (listingId: number) => {
    const allListings = JSON.parse(localStorage.getItem('listings') || '[]')
    const updatedListings = allListings.map((listing: any) => {
      if (listing.id === listingId) {
        return { ...listing, status: 'active' }
      }
      return listing
    })
    localStorage.setItem('listings', JSON.stringify(updatedListings))
    loadUserListings(currentUser.id)
    alert('Listing marked as active!')
  }

  const handleDeleteListing = (listingId: number) => {
    if (!confirm('Are you sure you want to delete this listing?')) {
      return
    }
    const allListings = JSON.parse(localStorage.getItem('listings') || '[]')
    const updatedListings = allListings.filter((listing: any) => listing.id !== listingId)
    localStorage.setItem('listings', JSON.stringify(updatedListings))
    loadUserListings(currentUser.id)
    alert('Listing deleted successfully!')
  }

  const handleLogout = () => {
    localStorage.removeItem('currentUser')
    router.push('/')
  }

  const getListingIcon = (type: string) => {
    switch (type) {
      case 'product': return Package
      case 'deal': return Tag
      case 'coupon': return Ticket
      case 'service': return Briefcase
      default: return Package
    }
  }

  const filteredListings = selectedTab === 'all' 
    ? userListings 
    : userListings.filter(listing => listing.listingType === selectedTab)

  if (!currentUser) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-primary p-4">
              <User className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{currentUser.name}</h1>
              <p className="text-gray-600">{currentUser.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-lg bg-red-600 px-6 py-2.5 font-semibold text-white transition-colors hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-white p-6 shadow-md">
            <p className="text-sm text-gray-600">Total Listings</p>
            <p className="text-3xl font-bold text-primary">{userListings.length}</p>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-md">
            <p className="text-sm text-gray-600">Active</p>
            <p className="text-3xl font-bold text-green-600">
              {userListings.filter(l => l.status !== 'sold').length}
            </p>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-md">
            <p className="text-sm text-gray-600">Sold</p>
            <p className="text-3xl font-bold text-gray-600">
              {userListings.filter(l => l.status === 'sold').length}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex flex-wrap gap-3">
          {['all', 'product', 'service', 'deal', 'coupon'].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`rounded-full px-6 py-2.5 font-medium capitalize transition-all duration-200 ${
                selectedTab === tab
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-white text-gray-700 shadow-sm hover:shadow-md'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Listings */}
        <div className="space-y-4">
          {filteredListings.length === 0 ? (
            <div className="rounded-xl bg-white p-12 text-center shadow-md">
              <p className="text-lg text-gray-600">No listings found</p>
              <a
                href="/sell"
                className="mt-4 inline-block rounded-lg bg-primary px-6 py-2.5 font-semibold text-white transition-colors hover:bg-primary/90"
              >
                Create Your First Listing
              </a>
            </div>
          ) : (
            filteredListings.map((listing) => {
              const Icon = getListingIcon(listing.listingType)
              const isSold = listing.status === 'sold'
              
              return (
                <div
                  key={listing.id}
                  className={`rounded-xl bg-white p-6 shadow-md transition-all hover:shadow-lg ${
                    isSold ? 'opacity-60' : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-1 gap-4">
                      {/* Icon */}
                      <div className={`rounded-lg ${isSold ? 'bg-gray-100' : 'bg-blue-50'} p-3`}>
                        <Icon className={`h-6 w-6 ${isSold ? 'text-gray-400' : 'text-primary'}`} />
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-3">
                          <h3 className="text-xl font-bold text-gray-900">{listing.title}</h3>
                          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                            {listing.listingType}
                          </span>
                          {isSold && (
                            <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                              SOLD
                            </span>
                          )}
                        </div>
                        
                        <p className="mb-2 text-sm text-gray-600">{listing.description}</p>
                        
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <span>Category: <strong>{listing.category}</strong></span>
                          <span>Price: <strong>₹{listing.price}</strong></span>
                          <span>Location: <strong>{listing.location}</strong></span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2">
                      {!isSold ? (
                        <button
                          onClick={() => handleMarkAsSold(listing.id)}
                          className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-700"
                        >
                          <CheckCircle className="h-4 w-4" />
                          Mark as Sold
                        </button>
                      ) : (
                        <button
                          onClick={() => handleMarkAsActive(listing.id)}
                          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                        >
                          <XCircle className="h-4 w-4" />
                          Mark as Active
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteListing(listing.id)}
                        className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
