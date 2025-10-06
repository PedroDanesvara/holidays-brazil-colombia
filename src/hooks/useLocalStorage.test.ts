import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useLocalStorage } from './useLocalStorage'

describe('useLocalStorage', () => {
  const key = 'test-key'
  const initialValue = { count: 0 }

  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    localStorage.clear()
  })

  it('returns initial value when localStorage is empty', () => {
    const { result } = renderHook(() => useLocalStorage(key, initialValue))
    
    expect(result.current.value).toEqual(initialValue)
  })

  it('returns stored value when localStorage has data', () => {
    const storedValue = { count: 5 }
    localStorage.setItem(key, JSON.stringify(storedValue))
    
    const { result } = renderHook(() => useLocalStorage(key, initialValue))
    
    expect(result.current.value).toEqual(storedValue)
  })

  it('updates localStorage when setValue is called', () => {
    const { result } = renderHook(() => useLocalStorage(key, initialValue))
    
    const newValue = { count: 10 }
    
    act(() => {
      result.current.setValue(newValue)
    })
    
    expect(result.current.value).toEqual(newValue)
    expect(localStorage.getItem(key)).toBe(JSON.stringify(newValue))
  })

  it('supports functional updates', () => {
    const { result } = renderHook(() => useLocalStorage(key, initialValue))
    
    act(() => {
      result.current.setValue((prev) => ({ count: prev.count + 1 }))
    })
    
    expect(result.current.value).toEqual({ count: 1 })
  })

  it('removes value from localStorage', () => {
    const { result } = renderHook(() => useLocalStorage(key, initialValue))
    
    const newValue = { count: 10 }
    
    act(() => {
      result.current.setValue(newValue)
    })
    
    expect(localStorage.getItem(key)).toBeTruthy()
    
    act(() => {
      result.current.removeValue()
    })
    
    expect(localStorage.getItem(key)).toBeNull()
    expect(result.current.value).toEqual(initialValue)
  })

  it('handles invalid JSON in localStorage', () => {
    localStorage.setItem(key, 'invalid json{')
    
    const { result } = renderHook(() => useLocalStorage(key, initialValue))
    
    expect(result.current.value).toEqual(initialValue)
  })
})

