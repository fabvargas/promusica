import { ValidateError } from "@/backend/error/ValidateError";
import { ScheduleDay } from "./ScheduleDay";
import { ScheduleHour } from "./ScheduleHour";


export class CalendarSlotTime {
  private constructor(
    private readonly day: ScheduleDay,
    private readonly hour: ScheduleHour
  ) {
    this.ensureIsValid(day.value, hour.value);
  }

  static create(day: ScheduleDay, hour: ScheduleHour): CalendarSlotTime {
    return new CalendarSlotTime(day, hour);
  }

  private ensureIsValid(day:string, hour:string): void {
    const dayValue = this.day.value;
    const hourNumber = this.hour.toNumber();

    const isWeekDay =
      dayValue === "lunes" ||
      dayValue === "martes" ||
      dayValue === "miércoles" ||
      dayValue === "jueves" ||
      dayValue === "viernes";

    const isSaturday = dayValue === "sábado";

    // Lunes a viernes: 16 a 20
    if (isWeekDay && (hourNumber < 16 || hourNumber > 20)) {
      throw new ValidateError(`Día ${dayValue} solo puede tener horas entre 16 y 20.`);
    }

    // Sábado: 10 a 13
    if (isSaturday && (hourNumber < 10 || hourNumber > 13)) {
      throw new ValidateError(`Día ${dayValue} solo puede tener horas entre 10 y 13.`);
    }
  }

  equals(other: CalendarSlotTime): boolean {
  return this.day.equals(other.day) && this.hour.equals(other.hour);
  }

  getDay(): ScheduleDay {
    return this.day;
  }

  getHour(): ScheduleHour {
    return this.hour;
  }

  toString(): string {
    return `${this.day.value}-${this.hour.value}`;
  }
}