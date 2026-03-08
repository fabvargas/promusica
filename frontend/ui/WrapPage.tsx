import React from 'react'

export default function WrapPage({ children }: { children: React.ReactNode }) {
  return (
    <div className='min-h-screen w-full py-4 px-2 sm:px-4 flex flex-col'>
      {children}
    </div>
  )
}
