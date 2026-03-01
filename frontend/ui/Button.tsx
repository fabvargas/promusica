"use client"

import { registerClassAction } from "@/app/action/registerClassAction";
import { registerProfessorAction } from "@/app/action/registerProfessorAction";

export default function Button({ 
        children,
        onClick
    }: { 
        children: React.ReactNode; 
        onClick?: () => void 
    }) {
           
  const response =async ()=>{
    const result = await registerClassAction();
    console.log(result)
  }
  
  return (
   <button onClick={response}>{children}</button>
  )
}
