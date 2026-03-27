
import CalendarButtonEvent from "./CalendarButtonEvent"
import getProfessors from "@/app/action/getProfessors"
import HydrateProfessors from "./HydrateProfessors"

type Day = "Lunes" | "Martes" | "Miércoles" | "Jueves" | "Viernes" | "Sábado"
type Hour = 10 | 11 | 12 | 13 | 15 | 16 | 17 | 18 | 19 | 20 

const matrix = {
  Lunes:[null, 16,17,18,19,20],
  Martes:[null, 16,17,18,19,20],
  Miércoles:[null, 16,17,18,19,20],
  Jueves:[null, 16,17,18,19,20],
  Viernes:[15, 16,17,18,19,20],
  Sábado:[10,11,12,13],

}

const data = [1,2,3,null,5,6]



export default async function Calendar() {
  const res= await getProfessors()
  if(!res.success || !res.data){
    return <div>Error loading professors</div>
  }

  return (
    <section className="w-full h-full overflow-x-auto  p-4 scrollbar-thin">
      <HydrateProfessors professors={res.data} />
      <div className="w-max h-max rounded-lg grid grid-flow-col auto-cols-[320px] gap-2">
      {
        (["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"] as Day[]).map((day) => (
          <CalendarColumn key={day} day={day} />
        ))
      }
      </div>
    </section>
  )
}

async function CalendarBlock({ day, time }: { day: Day, time: Hour }) {
  return (
    <div className={`w-full border ${time == null ? "bg-[#dfdfdf]" : ""} border-gray-300 flex items-center justify-center flex-col`}>
     <div className="h-8 p-2 font-bold" >
      <p>{time == null ? "" : `${time}:00`}</p>
    </div>
    <div className="grid grid-cols-2 w-full gap-2 p-2 py-4 h-66">
      {
        time == null ? <div></div>:
        data.map((s, i) =>{
            return s == null ? <CalendarButtonEvent key={i} /> : <CalendarSlot key={i} day={day} time={time} />
        })
      }
    </div>
    </div>

  )
}

function CalendarColumn({ day }: { day: Day }) {
  return (
    <div className="flex flex-col bg-white  shadow ">
      <div className="h-16 p-2 font-bold bg-card flex items-center justify-center">
        <p>{day}</p>
      </div>
      {
      (matrix[day] as Hour[]).map((time) => (
        <CalendarBlock key={time} day={day} time={time} />
      ))
      }
    </div>
  )
}


function CalendarSlot({ day, time }: { day: Day, time: Hour }) {
  return (
    <div className="w-full flex-col border border-gray-300 flex items-center justify-center rounded-xl p-2">
     <p className=" text-gray-500">Juan Pérez</p>
      <p className=" text-gray-400">Guitarra</p>
    </div>

  )
} 