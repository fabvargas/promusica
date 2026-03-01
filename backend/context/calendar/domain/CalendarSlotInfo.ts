import { ValidateError } from "@/backend/error/ValidateError";
import { ProfessorId } from "../../professor/domain/ProfessorId";
import { StudentId } from "../../student/domain/StudentId";
import { ClassInfoSlot } from "./ClassInfoSlot";
import { ReservationInfoSlot } from "./ReservationInfoSlot";
import { RetakeInfoSlot } from "./RetakeInfoSlot";

export abstract class CalendarSlotInfo {
  abstract type(): "class" | "retake" | "reservation";

  abstract toPrimitives(): {
    type: "class" | "retake" | "reservation";
    professorId: string | null;
    studentId: string | null;
  };


  isClass(): boolean {
    return this.type() === "class";
  }

  isRetake(): boolean {
    return this.type() === "retake";
  }

  isReservation(): boolean {
    return this.type() === "reservation";
  }

  abstract getProfessorId(): ProfessorId | null;
  abstract getStudentId(): StudentId | null;
}