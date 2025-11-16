'use client'

interface TrendingSectionProps {
  title: string
  subtitle: string
  type: 'deals' | 'coupons' | 'products' | 'services'
  bgColor?: string
}

export default function TrendingSection({
  title,
  subtitle,
  type,
  bgColor = 'bg-white',
}: TrendingSectionProps) {
  // Mock data - replace with API call
  const items = Array(6).fill(null).map((_, i) => ({
    id: i,
    title: `${type} item ${i + 1}`,
    price: Math.floor(Math.random() * 10000) + 1000,
    image: `https://via.placeholder.com/300x200?text=${type}+${i + 1}`,
  }))

  return (
    <section className={`px-4 py-12 md:py-16 ${bgColor}`}>
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">
            {title}
          </h2>
          <p className="text-gray-600">{subtitle}</p>
        </div>

        {/* Horizontal Scrollable Cards */}
        <div className="relative">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {items.map((item) => (
              <div
                key={item.id}
                className="min-w-[250px] flex-shrink-0 rounded-lg border border-gray-200 bg-white p-4 transition hover:shadow-lg sm:min-w-[280px]"
              >
                <div className="mb-3 aspect-video overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="mb-2 font-semibold text-gray-900">{item.title}</h3>
                <p className="text-lg font-bold text-primary">₹{item.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
