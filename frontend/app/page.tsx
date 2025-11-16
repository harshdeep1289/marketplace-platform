import SearchBar from '@/components/search/SearchBar'
import CategoryCard from '@/components/home/CategoryCard'
import TrendingSection from '@/components/home/TrendingSection'
import HowItWorks from '@/components/home/HowItWorks'
import { Tag, Ticket, Package, Briefcase } from 'lucide-react'

export default function Home() {
  const categories = [
    {
      icon: Tag,
      title: 'Deals',
      description: 'Explore hot deals and limited-time offers',
      href: '/deals',
      color: 'bg-red-50 text-red-600',
    },
    {
      icon: Ticket,
      title: 'Coupons',
      description: 'Grab coupons before they expire',
      href: '/coupons',
      color: 'bg-green-50 text-green-600',
    },
    {
      icon: Package,
      title: 'Products',
      description: 'Buy and sell items in your area',
      href: '/products',
      color: 'bg-blue-50 text-blue-600',
    },
    {
      icon: Briefcase,
      title: 'Services',
      description: 'Hire trusted service providers',
      href: '/services',
      color: 'bg-purple-50 text-purple-600',
    },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white px-4 py-12 md:py-20">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col items-center text-center">
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
              Find Deals, Coupons, Products & Services
              <br />
              <span className="text-primary">All in One Place</span>
            </h1>
            <p className="mb-8 max-w-2xl text-base text-gray-600 md:text-lg">
              Your one-stop marketplace for discovering amazing deals, exclusive coupons,
              quality products, and trusted services near you.
            </p>
            
            {/* Search Bar */}
            <div className="w-full max-w-4xl">
              <SearchBar />
            </div>

            {/* Quick Filter Chips */}
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {['All', 'Deals', 'Coupons', 'Products', 'Services', 'Near Me'].map((filter) => (
                <button
                  key={filter}
                  className="rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 hover:shadow-md"
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Category Cards */}
      <section className="px-4 py-12 md:py-16">
        <div className="container mx-auto max-w-6xl">
          <h2 className="mb-8 text-center text-2xl font-bold text-gray-900 md:text-3xl">
            Browse by Category
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <CategoryCard key={category.title} {...category} />
            ))}
          </div>
        </div>
      </section>

      {/* Trending Deals */}
      <TrendingSection
        title="Trending Deals"
        subtitle="Don't miss out on these hot offers"
        type="deals"
      />

      {/* Hot Coupons */}
      <TrendingSection
        title="Hot Coupons"
        subtitle="Grab these before they expire"
        type="coupons"
        bgColor="bg-gray-50"
      />

      {/* Popular Products */}
      <TrendingSection
        title="Popular Products"
        subtitle="Best-selling items in your area"
        type="products"
      />

      {/* How It Works */}
      <HowItWorks />
    </div>
  )
}
