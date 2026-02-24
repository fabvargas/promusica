import { EnumValueObject } from "@/backend/shared/domain/EnumValueObject";

const validValues = [
  "lunes",
  "martes",
  "miércoles",
  "jueves",
  "viernes",
  "sábado"
] as const;

export type ScheduleDayValue = typeof validValues[number];

export class ScheduleDay extends EnumValueObject<ScheduleDayValue> {
  constructor(value: ScheduleDayValue) {
    super(value, validValues);
  }

}