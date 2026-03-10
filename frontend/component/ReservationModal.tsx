"use client"

import Modal from "../ui/Modal"
import Input from "../ui/Input"
import Button from "../ui/Button"

export default function RegisterModal({
  open,
  close
}:{
  open:boolean
  close:()=>void
}) {

  return (
    <Modal open={open} close={close}>
      <form>

        <h2 className="text-lg font-semibold mb-2">
          Registrar Alumno
        </h2>

        <Input label="Nombre" name="name" />
        <Input label="Apellido" name="lastname" />
        <Input label="Email" name="email" type="email" />

        <Button type="submit" className="mt-4">
          Registrar
        </Button>

      </form>
    </Modal>
  )
}