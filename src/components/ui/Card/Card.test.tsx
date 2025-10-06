import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Card } from './Card'

describe('Card', () => {
  it('renders with children', () => {
    render(<Card>Card content</Card>)
    expect(screen.getByText('Card content')).toBeInTheDocument()
  })

  it('renders with title', () => {
    render(<Card title="Card Title">Content</Card>)
    expect(screen.getByText('Card Title')).toBeInTheDocument()
  })

  it('renders with subtitle', () => {
    render(<Card subtitle="Card Subtitle">Content</Card>)
    expect(screen.getByText('Card Subtitle')).toBeInTheDocument()
  })

  it('renders with footer', () => {
    render(<Card footer={<div>Footer content</div>}>Content</Card>)
    expect(screen.getByText('Footer content')).toBeInTheDocument()
  })

  it('applies hoverable class', () => {
    const { container } = render(<Card hoverable>Content</Card>)
    const card = container.firstChild as HTMLElement
    expect(card.className).toContain('transition')
  })

  it('handles click when onClick is provided', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()
    
    const { container } = render(<Card onClick={handleClick}>Content</Card>)
    const card = container.firstChild as HTMLElement
    
    await user.click(card)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('applies custom className', () => {
    const { container } = render(<Card className="custom-class">Content</Card>)
    expect(container.firstChild).toHaveClass('custom-class')
  })
})

