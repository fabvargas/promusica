"use client"

import { useRef, useState } from "react"
import useClickOutside from "../hooks/useClickOutsider"

export default function DropMenu({
  trigger,
  children,
}: {
  trigger: (toggle: () => void) => React.ReactNode
  children: (close: () => void) => React.ReactNode
}) {

  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const toggle = () => setOpen(v => !v)
  const close = () => setOpen(false)

  useClickOutside(ref, close)

  return (
    <div ref={ref} className="relative m-auto">

      {trigger(toggle)}

      {open && (
        <div className="absolute mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          {children(close)}
        </div>
      )}

    </div>
  )
}


function DropMenuItem({ 
    children,
    onClick,
   
 }: {
    children: React.ReactNode,
    onClick?: () => void,
  
}) {

  

    return (
       <button onClick={onClick} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
        {children}
       </button>
    )
}

DropMenu.Item = DropMenuItem