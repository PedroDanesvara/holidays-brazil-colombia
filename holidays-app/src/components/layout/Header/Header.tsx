import { Link, useLocation } from 'react-router-dom'
import { Calendar, Info } from 'lucide-react'
import clsx from 'clsx'
import { motion } from 'framer-motion'

export function Header() {
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white shadow-md"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <Calendar className="text-[#47A1C3] group-hover:scale-110 transition-transform" size={32} />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Holidays App
              </h1>
              <p className="text-xs text-gray-500">Brazil & Colombia</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex gap-6">
            <Link
              to="/"
              className={clsx(
                'flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all',
                isActive('/')
                  ? 'bg-[#47A1C3] text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              )}
            >
              <Calendar size={18} />
              <span>Home</span>
            </Link>
            
            <Link
              to="/about"
              className={clsx(
                'flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all',
                isActive('/about')
                  ? 'bg-[#47A1C3] text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              )}
            >
              <Info size={18} />
              <span>About</span>
            </Link>
          </nav>
        </div>
      </div>
    </motion.header>
  )
}

