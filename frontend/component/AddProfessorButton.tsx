"use client"
import { useState } from 'react'
import Button from '../ui/Button'
import AddProfessorModal from './AddProfessorModal'

export default function AddProfessorButton() {
    const [open, setOpen] = useState(false)

  return (
    <>
    <Button className='mb-4 fixed bottom-5 right-5' onClick={() => setOpen(true)}>Add Professor</Button>
    <AddProfessorModal open={open} close={() => setOpen(false)} />
    </>
  )
}
