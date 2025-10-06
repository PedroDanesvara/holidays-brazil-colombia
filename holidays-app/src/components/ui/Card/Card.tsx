import type { CardProps } from '../types'
import clsx from 'clsx'
import { motion } from 'framer-motion'

export function Card({
  children,
  title,
  subtitle,
  footer,
  hoverable = false,
  onClick,
  className,
}: CardProps) {
  const Component = onClick ? motion.button : motion.div

  return (
    <Component
      whileHover={hoverable ? { y: -4, boxShadow: '0 10px 30px rgba(0,0,0,0.15)' } : undefined}
      onClick={onClick}
      className={clsx(
        'bg-white rounded-lg shadow-md overflow-hidden transition-all',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {(title || subtitle) && (
        <div className="px-6 py-4 border-b border-gray-100">
          {title && (
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          )}
          {subtitle && (
            <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
          )}
        </div>
      )}
      
      <div className="px-6 py-4">{children}</div>
      
      {footer && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
          {footer}
        </div>
      )}
    </Component>
  )
}

