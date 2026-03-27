import Calendar from "../component/Calendar";
import WrapPage from "../ui/WrapPage";


export default function CalendarPage() {
  return (
   <WrapPage>
    <Calendar />
    {/* margin bottom to avoid overlap with AddProfessorButton */}
    <div className="w-full h-8"></div> 
   </WrapPage>
  )
}
