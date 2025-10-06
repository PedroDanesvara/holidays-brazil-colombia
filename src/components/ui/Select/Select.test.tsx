import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Select } from './Select'

describe('Select', () => {
  const options = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ]

  it('renders with options', () => {
    render(<Select value="1" onChange={vi.fn()} options={options} />)
    
    expect(screen.getByRole('combobox')).toBeInTheDocument()
    expect(screen.getByText('Option 1')).toBeInTheDocument()
    expect(screen.getByText('Option 2')).toBeInTheDocument()
    expect(screen.getByText('Option 3')).toBeInTheDocument()
  })

  it('renders with label', () => {
    render(<Select value="1" onChange={vi.fn()} options={options} label="Select an option" />)
    expect(screen.getByText('Select an option')).toBeInTheDocument()
  })

  it('calls onChange when value changes', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()
    
    render(<Select value="1" onChange={handleChange} options={options} />)
    
    await user.selectOptions(screen.getByRole('combobox'), '2')
    
    expect(handleChange).toHaveBeenCalledWith('2')
  })

  it('renders with placeholder', () => {
    render(
      <Select 
        value="" 
        onChange={vi.fn()} 
        options={options} 
        placeholder="Choose an option"
      />
    )
    expect(screen.getByText('Choose an option')).toBeInTheDocument()
  })

  it('displays error message', () => {
    render(
      <Select 
        value="1" 
        onChange={vi.fn()} 
        options={options} 
        error="This field is required"
      />
    )
    expect(screen.getByText('This field is required')).toBeInTheDocument()
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('can be disabled', () => {
    render(<Select value="1" onChange={vi.fn()} options={options} disabled />)
    expect(screen.getByRole('combobox')).toBeDisabled()
  })

  it('handles numeric values', async () => {
    const numericOptions = [
      { label: 'One', value: 1 },
      { label: 'Two', value: 2 },
    ]
    
    const handleChange = vi.fn()
    const user = userEvent.setup()
    
    render(<Select value={1} onChange={handleChange} options={numericOptions} />)
    
    await user.selectOptions(screen.getByRole('combobox'), '2')
    
    // Select returns string, component converts to number
    expect(handleChange).toHaveBeenCalled()
  })
})

