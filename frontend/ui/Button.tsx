"use client"

import { cn } from "@/frontend/lib/cn"
import React from "react"

type Variant = "primary" | "secondary" | "ghost" | "destructive"
type Size = "sm" | "md" | "lg"

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: Variant
  size?: Size
}

export default function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-xl font-medium transition focus:outline-none",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-primary text-white hover:opacity-90",

  secondary:
    "bg-gray-200 text-gray-900 hover:bg-gray-300",

  ghost:
    "bg-transparent text-foreground hover:bg-gray-100",

  destructive:
    "bg-red-600 text-white hover:bg-red-700",
}

const sizeStyles: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
}