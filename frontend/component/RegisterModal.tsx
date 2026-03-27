"use client"

import Modal from "../ui/Modal"
import Input from "../ui/Input"
import Button from "../ui/Button"
import { registerClassAction } from "@/app/action/registerClassAction"
import { useActionState, useEffect, useState } from "react"
import { Select } from "../ui/Select"
import { useProfesorStore } from "../storage/professorSotore"

type State = {
  success: boolean
  message?: string
}

const initialState: State = {
  success: false,
  message: undefined
}

export default function RegisterModal({
  open,
  close
}:{
  open:boolean
  close:()=>void
}) {

  const [state, formAction, pending] = useActionState(
    registerClassAction,
    initialState
  )
 const [instrument, setInstrument] = useState("")
 const [profesoresFiltrados, setProfesoresFiltrados] = useState<typeof profesores>([])
  const { profesores}= useProfesorStore()

  useEffect(() => {
    if (!instrument) {
      setProfesoresFiltrados([]);
    } else {
      const filtrados = profesores.filter((profesor) =>
        profesor.instrument.toLowerCase().includes(instrument.toLowerCase())
      );
      setProfesoresFiltrados( filtrados);
    }
  }, [instrument, profesores])

  const handleInstrumentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setInstrument(value);
  }




  return (
    <Modal open={open} close={close}>
      <form action={formAction} className="space-y-3">

        <h2 className="text-lg font-semibold mb-2">
          Registrar Alumno
        </h2>
        <div>
        <Input label="Nombre del alumno" name="studentName" required />
        <Select label="Día" name="day" required>
          <Select.Item value="lunes">Lunes</Select.Item>
          <Select.Item value="martes">Martes</Select.Item>
          <Select.Item value="miercoles">Miércoles</Select.Item>
          <Select.Item value="jueves">Jueves</Select.Item>
          <Select.Item value="viernes">Viernes</Select.Item>
          <Select.Item value="sabado">Sábado</Select.Item>
        </Select>
          <Select label="Hora" name="hour" required>
          <Select.Item value={"10"}>10:00</Select.Item>
          <Select.Item value={"11"}>11:00</Select.Item>
          <Select.Item value={"12"}>12:00</Select.Item>
          <Select.Item value={"13"}>13:00</Select.Item>
          <Select.Item value={"15"}>15:00</Select.Item>
          <Select.Item value={"16"}>16:00</Select.Item>
          <Select.Item value={"17"}>17:00</Select.Item>
          <Select.Item value={"18"}>18:00</Select.Item>
          <Select.Item value={"19"}>19:00</Select.Item>
          <Select.Item value={"20"}>20:00</Select.Item>
        </Select>
          <Select label="Instrumento" name="instrument" required  onChange={handleInstrumentChange}>
          <Select.Item value="Piano">Piano</Select.Item>
          <Select.Item value="Guitarra">Guitarra</Select.Item>
          <Select.Item value="Bajo">Bajo</Select.Item>
          <Select.Item value="Violin">Violin</Select.Item>
          <Select.Item value="Bateria">Bateria</Select.Item>
          <Select.Item value="Flauta">Flauta</Select.Item>
          <Select.Item value="Saxofon">Saxofon</Select.Item>
        </Select>
        <Select label="Profesor" name="professorId" required  disabled={!profesoresFiltrados.length}>
        {
          profesoresFiltrados.map((profesor) => (
            <Select.Item key={profesor.id} value={profesor.id}>
              {profesor.name} - {profesor.instrument}
            </Select.Item>
          ))
        }
        </Select>
        </div>

        {state?.message && (
          <p className={`text-sm ${state.success ? "text-green-600" : "text-red-500"}`}>
            {state.message}
          </p>
        )}

        <Button
          type="submit"
          className="mt-4 w-full"
          disabled={pending}
        >
          {pending ? "Registrando..." : "Registrar"}
        </Button>

      </form>
    </Modal>
  )
}