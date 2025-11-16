'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, User, Plus, Package } from 'lucide-react'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)

  useEffect(() => {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null')
    setCurrentUser(user)
    
    // Listen for storage changes (when user logs in/out in another tab)
    const handleStorageChange = () => {
      const user = JSON.parse(localStorage.getItem('currentUser') || 'null')
      setCurrentUser(user)
    }
    
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  return (
    <nav className="sticky top-0 z-50 border-b bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-primary">Marketplace</div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-6 md:flex">
            <Link
              href="/deals"
              className="text-sm font-medium text-gray-700 transition hover:text-primary"
            >
              Deals
            </Link>
            <Link
              href="/coupons"
              className="text-sm font-medium text-gray-700 transition hover:text-primary"
            >
              Coupons
            </Link>
            <Link
              href="/products"
              className="text-sm font-medium text-gray-700 transition hover:text-primary"
            >
              Products
            </Link>
            <Link
              href="/services"
              className="text-sm font-medium text-gray-700 transition hover:text-primary"
            >
              Services
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* My Bookings Button (only when logged in) */}
            {currentUser && (
              <Link
                href="/bookings"
                className="hidden items-center space-x-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 md:flex"
              >
                <Package className="h-4 w-4" />
                <span>My Bookings</span>
              </Link>
            )}

            {/* Post Listing Button */}
            <Link
              href="/sell"
              className="flex items-center space-x-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary/90"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Post Listing</span>
              <span className="sm:hidden">Post</span>
            </Link>

            {/* User Menu */}
            {currentUser ? (
              <Link
                href="/profile"
                className="flex items-center space-x-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">My Profile</span>
              </Link>
            ) : (
              <Link
                href="/auth/login"
                className="flex items-center space-x-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Login</span>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t bg-white md:hidden">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col space-y-4">
              <Link
                href="/deals"
                className="text-base font-medium text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                Deals
              </Link>
              <Link
                href="/coupons"
                className="text-base font-medium text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                Coupons
              </Link>
              <Link
                href="/products"
                className="text-base font-medium text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                href="/services"
                className="text-base font-medium text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                Services
              </Link>
              {currentUser && (
                <>
                  <hr />
                  <Link
                    href="/bookings"
                    className="flex items-center space-x-2 text-base font-medium text-gray-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Package className="h-4 w-4" />
                    <span>My Bookings</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
