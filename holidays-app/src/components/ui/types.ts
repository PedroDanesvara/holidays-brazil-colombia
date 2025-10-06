import type { ReactNode, HTMLAttributes, ButtonHTMLAttributes } from 'react'

/**
 * Variantes de botões
 */
export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost'

/**
 * Tamanhos de componentes
 */
export type ComponentSize = 'sm' | 'md' | 'lg'

/**
 * Props base para componentes
 */
export interface BaseComponentProps {
  className?: string
  children?: ReactNode
}

/**
 * Props para Button
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ComponentSize
  isLoading?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

/**
 * Props para Select
 */
export interface SelectProps<T = string>
  extends Omit<HTMLAttributes<HTMLSelectElement>, 'onChange'> {
  value: T
  onChange: (value: T) => void
  options: Array<{ label: string; value: T; disabled?: boolean }>
  placeholder?: string
  label?: string
  error?: string
  disabled?: boolean
}

/**
 * Props para Checkbox
 */
export interface CheckboxProps
  extends Omit<HTMLAttributes<HTMLInputElement>, 'onChange' | 'type'> {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  error?: string
  disabled?: boolean
}

/**
 * Props para Card
 */
export interface CardProps extends BaseComponentProps {
  title?: string
  subtitle?: string
  footer?: ReactNode
  hoverable?: boolean
  onClick?: () => void
}

/**
 * Props para Modal
 */
export interface ModalProps extends BaseComponentProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  size?: ComponentSize
  closeOnOverlayClick?: boolean
}

