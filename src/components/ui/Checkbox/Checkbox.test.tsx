import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Checkbox } from './Checkbox'

describe('Checkbox', () => {
  it('renders unchecked by default', () => {
    render(<Checkbox checked={false} onChange={vi.fn()} />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).not.toBeChecked()
  })

  it('renders checked when checked prop is true', () => {
    render(<Checkbox checked={true} onChange={vi.fn()} />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeChecked()
  })

  it('renders with label', () => {
    render(<Checkbox checked={false} onChange={vi.fn()} label="Accept terms" />)
    expect(screen.getByText('Accept terms')).toBeInTheDocument()
  })

  it('calls onChange when clicked', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()
    
    render(<Checkbox checked={false} onChange={handleChange} />)
    
    await user.click(screen.getByRole('checkbox'))
    
    expect(handleChange).toHaveBeenCalledWith(true)
  })

  it('calls onChange with false when unchecking', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()
    
    render(<Checkbox checked={true} onChange={handleChange} />)
    
    await user.click(screen.getByRole('checkbox'))
    
    expect(handleChange).toHaveBeenCalledWith(false)
  })

  it('can be disabled', () => {
    render(<Checkbox checked={false} onChange={vi.fn()} disabled />)
    expect(screen.getByRole('checkbox')).toBeDisabled()
  })

  it('displays error message', () => {
    render(
      <Checkbox 
        checked={false} 
        onChange={vi.fn()} 
        error="This field is required"
      />
    )
    expect(screen.getByText('This field is required')).toBeInTheDocument()
  })

  it('clicking label toggles checkbox', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()
    
    render(<Checkbox checked={false} onChange={handleChange} label="Click me" />)
    
    await user.click(screen.getByText('Click me'))
    
    expect(handleChange).toHaveBeenCalledWith(true)
  })
})

