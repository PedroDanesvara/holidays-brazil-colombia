import type { SelectProps } from '../types'
import clsx from 'clsx'

export function Select<T extends string | number>({
  value,
  onChange,
  options,
  placeholder,
  label,
  error,
  disabled,
  className,
  ...props
}: SelectProps<T>) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value as T
    onChange(newValue)
  }

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      
      <select
        value={value}
        onChange={handleChange}
        disabled={disabled}
        className={clsx(
          'px-3 py-2 border rounded-lg bg-white transition-all',
          'focus:outline-none focus:ring-2 focus:ring-[#47A1C3] focus:border-transparent',
          error && 'border-[#FF6B6B]',
          !error && 'border-gray-300',
          disabled && 'opacity-50 cursor-not-allowed bg-gray-100',
          className
        )}
        aria-label={label}
        aria-invalid={!!error}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option
            key={String(option.value)}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
      
      {error && (
        <span className="text-sm text-[#FF6B6B]" role="alert">
          {error}
        </span>
      )}
    </div>
  )
}

