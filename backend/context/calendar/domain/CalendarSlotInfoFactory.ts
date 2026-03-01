import { ValidateError } from "@/backend/error/ValidateError";
import { ClassInfoSlot } from "./ClassInfoSlot";
import { ReservationInfoSlot } from "./ReservationInfoSlot";
import { RetakeInfoSlot } from "./RetakeInfoSlot";
import { CalendarSlotInfo } from "./CalendarSlotInfo";

export class CalendarSlotInfoFactory {

  static fromPrimitives(
    type: "class" | "retake" | "reservation",
    professorId: string | null,
    studentId: string | null
  ): CalendarSlotInfo {

    switch (type) {

      case "class":
        if (!professorId || !studentId) {
          throw new ValidateError("ProfessorId and StudentId are required for class type");
        }
        return ClassInfoSlot.fromPrimitives(professorId, studentId);

      case "retake":
        if (!professorId) {
          throw new ValidateError("ProfessorId is required for retake type");
        }
        return RetakeInfoSlot.fromPrimitives(professorId);

      case "reservation":
        return ReservationInfoSlot.fromPrimitives();

      default:
        throw new ValidateError("Invalid slot type");
    }
  }
}