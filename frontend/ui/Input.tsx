import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}




export default function Input({ label, ...props }: InputProps) {
  return (
    <div className='flex flex-col'>
      <label className='mb-1 text-sm font-medium text-gray-700'>
        {label}
        <input {...props} className='border border-gray-300 rounded-md p-2 w-full' />
      </label>
    </div>
  )
}
