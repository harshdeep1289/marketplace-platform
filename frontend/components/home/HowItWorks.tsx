import { Upload, Search, CheckCircle } from 'lucide-react'

export default function HowItWorks() {
  const steps = [
    {
      icon: Upload,
      title: 'Post Your Listing',
      description: 'Create a listing in seconds with our simple form',
    },
    {
      icon: Search,
      title: 'Get Discovered',
      description: 'Your listing reaches thousands of potential buyers',
    },
    {
      icon: CheckCircle,
      title: 'Deal Done',
      description: 'Connect with buyers and close the deal',
    },
  ]

  return (
    <section className="bg-gradient-to-b from-white to-blue-50 px-4 py-12 md:py-16">
      <div className="container mx-auto max-w-6xl">
        <h2 className="mb-12 text-center text-2xl font-bold text-gray-900 md:text-3xl">
          How It Works
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white">
                <step.icon className="h-8 w-8" />
              </div>
              <div className="mb-2 text-sm font-semibold text-primary">
                Step {index + 1}
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
