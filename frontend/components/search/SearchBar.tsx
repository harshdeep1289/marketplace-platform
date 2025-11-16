'use client'

import { useState } from 'react'
import { Search, MapPin } from 'lucide-react'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [location, setLocation] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement search logic
    console.log('Searching for:', query, 'in', location)
  }

  return (
    <form onSubmit={handleSearch} className="w-full">
      <div className="flex flex-col gap-2 rounded-xl bg-white p-2 shadow-lg md:flex-row md:items-center">
        {/* Category Dropdown */}
        <select className="rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-primary focus:outline-none md:w-40">
          <option value="all">All</option>
          <option value="deals">Deals</option>
          <option value="coupons">Coupons</option>
          <option value="products">Products</option>
          <option value="services">Services</option>
        </select>

        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search for deals, products, services..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-lg border border-gray-200 py-3 pl-10 pr-4 text-sm focus:border-primary focus:outline-none"
          />
        </div>

        {/* Location Input */}
        <div className="relative md:w-48">
          <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full rounded-lg border border-gray-200 py-3 pl-10 pr-4 text-sm focus:border-primary focus:outline-none"
          />
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="rounded-lg bg-primary px-6 py-3 font-medium text-white transition hover:bg-primary/90 md:px-8"
        >
          Search
        </button>
      </div>
    </form>
  )
}
