import type { CheckboxProps } from '../types'
import clsx from 'clsx'
import { motion } from 'framer-motion'

export function Checkbox({
  checked,
  onChange,
  label,
  error,
  className,
  disabled,
  ...props
}: CheckboxProps) {
  return (
    <div className={clsx('flex flex-col gap-1', className)}>
      <label
        className={clsx(
          'inline-flex items-center cursor-pointer',
          disabled && 'cursor-not-allowed opacity-50'
        )}
      >
        <div className="relative">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            disabled={disabled}
            className="sr-only peer"
            aria-invalid={!!error}
            {...props}
          />
          
          <div
            className={clsx(
              'w-5 h-5 border-2 rounded transition-all',
              'peer-focus:ring-2 peer-focus:ring-[#47A1C3] peer-focus:ring-offset-2',
              checked
                ? 'bg-[#47A1C3] border-[#47A1C3]'
                : 'bg-white border-gray-300',
              error && 'border-[#FF6B6B]'
            )}
          >
            {checked && (
              <motion.svg
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-full h-full text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </motion.svg>
            )}
          </div>
        </div>
        
        {label && (
          <span className="ml-2 text-sm text-gray-700">{label}</span>
        )}
      </label>
      
      {error && (
        <span className="text-sm text-[#FF6B6B] ml-7" role="alert">
          {error}
        </span>
      )}
    </div>
  )
}

