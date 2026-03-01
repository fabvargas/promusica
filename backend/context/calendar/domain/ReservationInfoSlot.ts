
import { CalendarSlotInfo } from "./CalendarSlotInfo";

export class ReservationInfoSlot extends CalendarSlotInfo {
  constructor(
  ) {
    super();
  }

  type() {
    return "reservation" as const;
  }

  toPrimitives() {
  return {
    type: "reservation" as const,
    professorId: null,
    studentId: null
  };
}

  static fromPrimitives(): ReservationInfoSlot {
    return new ReservationInfoSlot();
  }

  getProfessorId(): null {
    return null;
  }

  getStudentId(): null {
    return null;
  }

}