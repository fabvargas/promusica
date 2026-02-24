import { StudentId } from "../../student/domain/StudentId";
import { ProfessorId } from "../../professor/domain/ProfessorId";
import { CalendarSlotInfo } from "./CalendarSlotInfo";

export class ClassInfoSlot extends CalendarSlotInfo {
  constructor(
    private readonly professorId: ProfessorId,
    private readonly studentId: StudentId
  ){
    super();
  }

  type() {
    return "class" as const;
  }

  getProfessorId(): ProfessorId {
    return this.professorId;
  }

  getStudentId(): StudentId {
    return this.studentId;
  }
}