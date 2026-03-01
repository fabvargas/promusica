import { ProfessorId } from "../../professor/domain/ProfessorId";
import { CalendarSlotInfo } from "./CalendarSlotInfo";

export class RetakeInfoSlot extends CalendarSlotInfo {
  constructor(
    private readonly professorId: ProfessorId
  ) {
    super();
  }

  static create(professorId: string): RetakeInfoSlot {
    return new RetakeInfoSlot(
      new ProfessorId(professorId)
    );
  }

  type() {
    return "retake" as const;
  }

  getProfessorId(): ProfessorId {
    return this.professorId;
  }

  toPrimitives() {
  return {
    type: "retake" as const,
    professorId: this.professorId.getValue(),
    studentId: null
  };
  }

  static fromPrimitives(
     professorId: string ,
    ): RetakeInfoSlot {
      return new RetakeInfoSlot(
        new ProfessorId(professorId)
      );
    }

  getStudentId(): null {
    return null;
  }
  
}