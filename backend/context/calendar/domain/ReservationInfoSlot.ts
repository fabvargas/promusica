
import { ProfessorId } from "../../professor/domain/ProfessorId";
import { CalendarSlotInfo } from "./CalendarSlotInfo";

export class ReservationInfoSlot extends CalendarSlotInfo {
  constructor(
  ) {
    super();
  }

  type() {
    return "reservation" as const;
  }

  getProfessorId(): ProfessorId | null {
  return null;
}

 
}