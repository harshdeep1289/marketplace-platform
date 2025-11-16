import Link from 'next/link'
import { LucideIcon } from 'lucide-react'

interface CategoryCardProps {
  icon: LucideIcon
  title: string
  description: string
  href: string
  color: string
}

export default function CategoryCard({
  icon: Icon,
  title,
  description,
  href,
  color,
}: CategoryCardProps) {
  return (
    <Link href={href}>
      <div className="group h-full rounded-xl border border-gray-200 bg-white p-6 transition hover:border-primary hover:shadow-lg">
        <div
          className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg ${color}`}
        >
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-primary">
          {title}
        </h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </Link>
  )
}
