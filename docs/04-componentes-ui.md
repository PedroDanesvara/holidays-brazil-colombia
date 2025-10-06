# 🎨 Passo 4: Componentes UI Base

## Objetivo
Criar componentes UI reutilizáveis e acessíveis que servirão como blocos de construção para toda a aplicação.

## Princípios

1. **Acessibilidade First**: ARIA labels, navegação por teclado, screen reader support
2. **Composição**: Componentes pequenos e combináveis
3. **Customização**: Props para variações visuais
4. **Performance**: Memoização quando apropriado
5. **Type Safety**: Props completamente tipadas

## Componentes a Implementar

### 1. Button

**`src/components/ui/Button/Button.tsx`**
```typescript
import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'
import { ButtonProps } from '../types'

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
    
    const variantClasses = {
      primary: 'bg-brazil text-white hover:bg-brazil-dark focus:ring-brazil',
      secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-400',
      danger: 'bg-colombia text-white hover:bg-colombia-dark focus:ring-colombia',
      ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-400',
    }
    
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    }
    
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        className={clsx(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="ml-2">{rightIcon}</span>}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'
```

**`src/components/ui/Button/Button.test.tsx`**
```typescript
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './Button'

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    await userEvent.click(screen.getByText('Click me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>)
    expect(screen.getByText('Click me')).toBeDisabled()
  })

  it('shows loading state', () => {
    render(<Button isLoading>Click me</Button>)
    expect(screen.getByText('Click me')).toBeDisabled()
  })

  it('applies variant classes correctly', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>)
    expect(screen.getByText('Primary')).toHaveClass('bg-brazil')
    
    rerender(<Button variant="danger">Danger</Button>)
    expect(screen.getByText('Danger')).toHaveClass('bg-colombia')
  })
})
```

**`src/components/ui/Button/index.ts`**
```typescript
export { Button } from './Button'
export type { ButtonProps } from '../types'
```

### 2. Select

**`src/components/ui/Select/Select.tsx`**
```typescript
import { SelectProps } from '../types'
import clsx from 'clsx'

export function Select<T extends string | number>({
  value,
  onChange,
  options,
  placeholder,
  label,
  error,
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
        className={clsx(
          'px-3 py-2 border rounded-lg bg-white transition-all',
          'focus:outline-none focus:ring-2 focus:ring-brazil focus:border-transparent',
          error && 'border-colombia',
          !error && 'border-gray-300',
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
        <span className="text-sm text-colombia" role="alert">
          {error}
        </span>
      )}
    </div>
  )
}
```

**`src/components/ui/Select/index.ts`**
```typescript
export { Select } from './Select'
```

### 3. Checkbox

**`src/components/ui/Checkbox/Checkbox.tsx`**
```typescript
import { CheckboxProps } from '../types'
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
              'peer-focus:ring-2 peer-focus:ring-brazil peer-focus:ring-offset-2',
              checked
                ? 'bg-brazil border-brazil'
                : 'bg-white border-gray-300',
              error && 'border-colombia'
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
        <span className="text-sm text-colombia ml-7" role="alert">
          {error}
        </span>
      )}
    </div>
  )
}
```

**`src/components/ui/Checkbox/index.ts`**
```typescript
export { Checkbox } from './Checkbox'
```

### 4. Card

**`src/components/ui/Card/Card.tsx`**
```typescript
import { CardProps } from '../types'
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
```

**`src/components/ui/Card/index.ts`**
```typescript
export { Card } from './Card'
```

### 5. Modal

**`src/components/ui/Modal/Modal.tsx`**
```typescript
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ModalProps } from '../types'
import clsx from 'clsx'

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  closeOnOverlayClick = true,
  className,
}: ModalProps) {
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={closeOnOverlayClick ? onClose : () => {}}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={clsx(
                  'w-full transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all',
                  sizeClasses[size],
                  className
                )}
              >
                {title && (
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 mb-4"
                  >
                    {title}
                  </Dialog.Title>
                )}
                
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
```

**`src/components/ui/Modal/index.ts`**
```typescript
export { Modal } from './Modal'
```

### 6. LoadingSpinner

**`src/components/common/LoadingSpinner/LoadingSpinner.tsx`**
```typescript
import clsx from 'clsx'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function LoadingSpinner({ size = 'md', className }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  }

  return (
    <div className={clsx('flex items-center justify-center', className)}>
      <svg
        className={clsx(
          'animate-spin text-brazil',
          sizeClasses[size]
        )}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  )
}
```

**`src/components/common/LoadingSpinner/index.ts`**
```typescript
export { LoadingSpinner } from './LoadingSpinner'
```

### 7. EmptyState

**`src/components/common/EmptyState/EmptyState.tsx`**
```typescript
import { ReactNode } from 'react'
import clsx from 'clsx'

interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description?: string
  action?: ReactNode
  className?: string
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={clsx(
        'flex flex-col items-center justify-center py-12 px-4 text-center',
        className
      )}
    >
      {icon && (
        <div className="mb-4 text-gray-400">
          {icon}
        </div>
      )}
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      
      {description && (
        <p className="text-gray-600 mb-6 max-w-md">
          {description}
        </p>
      )}
      
      {action && <div>{action}</div>}
    </div>
  )
}
```

**`src/components/common/EmptyState/index.ts`**
```typescript
export { EmptyState } from './EmptyState'
```

## Instalação de Dependências Adicionais

```bash
# Headless UI para componentes acessíveis
npm install @headlessui/react

# Ícones (opcional, mas recomendado)
npm install lucide-react
```

## Storybook (Opcional mas Recomendado)

```bash
# Instalar Storybook
npx storybook@latest init

# Iniciar Storybook
npm run storybook
```

**Exemplo de Story: `src/components/ui/Button/Button.stories.tsx`**
```typescript
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    children: 'Button',
    variant: 'secondary',
  },
}

export const Loading: Story = {
  args: {
    children: 'Loading...',
    isLoading: true,
  },
}

export const WithIcons: Story = {
  args: {
    children: 'With Icons',
    leftIcon: '←',
    rightIcon: '→',
  },
}
```

## Checklist de Acessibilidade

- ✅ Todos os botões tem foco visível
- ✅ Inputs tem labels associados
- ✅ Erros são anunciados com `role="alert"`
- ✅ Modais trapam o foco
- ✅ Navegação por teclado funciona
- ✅ Contraste de cores adequado (WCAG AA)
- ✅ ARIA labels onde necessário

---

**Próximo Passo**: [05-gerenciamento-de-estado.md](./05-gerenciamento-de-estado.md)

