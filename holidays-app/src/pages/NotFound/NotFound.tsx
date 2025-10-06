import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Home, ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'

export function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <Card className="text-center p-8">
          <div className="text-6xl font-bold text-[#47A1C3] mb-4">404</div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Page Not Found
          </h1>
          
          <p className="text-gray-600 mb-6">
            Sorry, the page you are looking for doesn't exist or has been moved.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/">
              <Button variant="primary" leftIcon={<Home size={18} />}>
                Go Home
              </Button>
            </Link>
            
            <Button
              variant="secondary"
              leftIcon={<ArrowLeft size={18} />}
              onClick={() => window.history.back()}
            >
              Go Back
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}

