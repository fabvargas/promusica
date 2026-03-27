"use client"

import { useActionState } from "react"
import Modal from "../ui/Modal"
import Input from "../ui/Input"
import Button from "../ui/Button"
import { Select } from "../ui/Select"
import { registerProfessorAction } from "@/app/action/registerProfessorAction"

const subjects = [
  { value: "Guitarra", label: "Guitarra" },
  { value: "Piano", label: "Piano" },
  { value: "Bajo", label: "Bajo" },
  { value: "Bateria", label: "Bateria" },
  { value: "Canto", label: "Canto" },
  { value: "Violin", label: "Violin" },
  { value: "Viento", label: "Viento" },
]

type State = {
  success: boolean
  message?: string
}

const initialState: State = {
  success: false,
  message: undefined
}

export default function AddProfessorModal({
  open,
  close
}:{
  open:boolean
  close:()=>void
}) {

  const [state, formAction, pending] = useActionState(
    registerProfessorAction,
    initialState
  )

  return (
    <Modal open={open} close={close}>
      <form action={formAction} className="space-y-3">

        <h2 className="text-lg font-semibold">
          Registrar Profesor
        </h2>
        <div>
          <Input label="Nombre" name="name" required />
        <Input label="Apellido" name="lastname" required />
        <Input label="Email" name="email" type="email" required />

        <Select label="Instrumento" name="instrument" required>
          {subjects.map((subject) => (
            <Select.Item key={subject.value} value={subject.value}>
              {subject.label}
            </Select.Item>
          ))}
        </Select>
        </div>
      
          <div className="h-3"> 
         {state && !state.success && state.message && (
          <p className="text-sm text-red-500">
            {state.message}
          </p>
        )}

        {state && state.success && state.message && (
          <p className="text-sm text-green-600">
            {state.message}
          </p>
        )}
          </div>
  

        <Button
          type="submit"
          className="mt-2 w-full"
          disabled={pending}
        >
          {pending ? "Registrando..." : "Registrar"}
        </Button>

      </form>
    </Modal>
  )
}