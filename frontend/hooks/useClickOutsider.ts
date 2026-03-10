"use client"

import { RefObject, useEffect } from "react"

export default function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T | null>,
  handler: () => void
) {

  useEffect(() => {

    const listener = (event: MouseEvent) => {
      if (!ref.current) return

      if (!ref.current.contains(event.target as Node)) {
        handler()
      }
    }

    document.addEventListener("mousedown", listener)

    return () => {
      document.removeEventListener("mousedown", listener)
    }

  }, [ref, handler])
}