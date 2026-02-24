import { ProfessorId } from "../../professor/domain/ProfessorId";
import { CalendarSlotInfo } from "./CalendarSlotInfo";

export class RetakeInfoSlot extends CalendarSlotInfo {
  constructor(
    private readonly professorId: ProfessorId
  ) {
    super();
  }

  type() {
    return "retake" as const;
  }

  getProfessorId(): ProfessorId {
    return this.professorId;
  }

 
}