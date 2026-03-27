import React from "react"

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string
  name: string
  children: React.ReactNode
}


export function Select({ label, name, children, ...props}: SelectProps) {
  return (
  
        <label className="mb-1 text-sm font-medium text-gray-700">{label}
        <select
        name={name}
        {...props}
      className="border border-gray-300 rounded-md p-2 w-full"
    >
      {children}
    </select>
    </label>
    
   
  )
}

type SelectItemProps = {
  value: string
  children: React.ReactNode
}

 function SelectItem({ value, children }: SelectItemProps) {
  return <option value={value}>{children}</option>
}

Select.Item = SelectItem