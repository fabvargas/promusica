import { ProfessorId } from "../../professor/domain/ProfessorId";


export abstract class CalendarSlotInfo {
  abstract type(): "class" | "retake" | "reservation";
  isClass(): boolean {
    return this.type() === "class";
  }

  isRetake(): boolean {
    return this.type() === "retake";
  }

  isReservation(): boolean {
    return this.type() === "reservation";
  }

  getProfessorId(): ProfessorId | null {
  return null;
}

}