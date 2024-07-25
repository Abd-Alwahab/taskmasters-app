'use client'

import { useEffect, useRef, RefObject } from 'react'

type Handler = () => void // Explicit type for the handler function

export const useClickOutside = <T extends HTMLElement>(
  handler: Handler,
  captureClick: boolean = false,
): { ref: RefObject<T> } => {
  const ref = useRef<T>(null) // Generic type for the ref, ensuring compatibility with various HTML elements

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as Node // Type assertion for better type safety

      if (ref.current && !ref.current.contains(target)) {
        handler()
      }
    }

    document.addEventListener('click', handleClick, captureClick)

    return () => {
      document.removeEventListener('click', handleClick, captureClick)
    }
  }, [handler, captureClick]) // Dependencies for useEffect

  return { ref }
}
