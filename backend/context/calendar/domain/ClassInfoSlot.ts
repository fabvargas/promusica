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

  static create(professorId: string, studentId: StudentId): ClassInfoSlot {
    return new ClassInfoSlot(
      new ProfessorId(professorId), 
      studentId);
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

  toPrimitives() {
    return {
      type: this.type(),
      professorId: this.getProfessorId().getValue(),
      studentId: this.getStudentId().getValue()
    };
  }

    static fromPrimitives(
      professorId: string ,
       studentId: string 
      ): ClassInfoSlot {
      return new ClassInfoSlot(
        new ProfessorId(professorId!),
        new StudentId(studentId!)
      );
    }

  }  

