import { Card } from '@/components/ui/Card'
import { Calendar, Globe, Heart, Zap } from 'lucide-react'
import { motion } from 'framer-motion'

export function About() {
  const features = [
    {
      icon: <Calendar size={32} />,
      title: 'Multiple Views',
      description: 'Switch between list and calendar views to explore holidays in different ways.',
    },
    {
      icon: <Globe size={32} />,
      title: 'Multiple Countries',
      description: 'Browse holidays from Brazil and Colombia with country-specific filters.',
    },
    {
      icon: <Zap size={32} />,
      title: 'Advanced Filters',
      description: 'Filter by country, year, month, and week to find exactly what you need.',
    },
    {
      icon: <Heart size={32} />,
      title: 'Modern Design',
      description: 'Beautiful, responsive interface with smooth animations and accessibility.',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-white mb-4">
          About Holidays App
        </h1>
        <p className="text-white/90 text-lg max-w-2xl mx-auto">
          A modern web application to explore and manage holidays from Brazil and Colombia.
          Built with React, TypeScript, and best practices in mind.
        </p>
      </motion.div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="h-full">
              <div className="flex flex-col items-center text-center p-4">
                <div className="text-[#47A1C3] mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Tech Stack */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <Card>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Built With
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="font-semibold text-gray-900">React 19</div>
              <div className="text-sm text-gray-600">UI Library</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-gray-900">TypeScript</div>
              <div className="text-sm text-gray-600">Type Safety</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-gray-900">Vite</div>
              <div className="text-sm text-gray-600">Build Tool</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-gray-900">Tailwind CSS</div>
              <div className="text-sm text-gray-600">Styling</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-gray-900">Zustand</div>
              <div className="text-sm text-gray-600">State Management</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-gray-900">Framer Motion</div>
              <div className="text-sm text-gray-600">Animations</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-gray-900">date-fns</div>
              <div className="text-sm text-gray-600">Date Utils</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-gray-900">Lucide React</div>
              <div className="text-sm text-gray-600">Icons</div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Project Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        <Card>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Project Details
          </h2>
          <div className="space-y-3 text-gray-600">
            <p>
              <strong className="text-gray-900">Version:</strong> 1.0.0
            </p>
            <p>
              <strong className="text-gray-900">License:</strong> MIT
            </p>
            <p>
              <strong className="text-gray-900">Repository:</strong>{' '}
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#47A1C3] hover:underline"
              >
                GitHub
              </a>
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}

