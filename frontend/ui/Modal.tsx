"use client"

import { ReactNode, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import useClickOutside from "../hooks/useClickOutsider"

type ModalProps = {
  open: boolean
  close: () => void
  children: ReactNode
}

export default function Modal({ open, close, children }: ModalProps) {

  const modalRef = useRef<HTMLDivElement>(null)
  useClickOutside(modalRef, close)

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
    }
    document.addEventListener("keydown", handleEsc)
    return () => {
      document.removeEventListener("keydown", handleEsc)
    }
  }, [close])

  if (!open) return null

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      <div
        onClick={close}
        className="absolute inset-0 bg-black/40"
      />

      <div
        ref={modalRef}
        className="relative bg-white rounded-xl shadow-xl p-6 w-[400px]"
      >
        {children}

        <button
          onClick={close}
          className="absolute size-8 grid place-items-center bg-[#dfdfdf] top-2 right-2 rounded-full"
        >
          x
        </button>
      </div>

    </div>,
    document.body
  )
}