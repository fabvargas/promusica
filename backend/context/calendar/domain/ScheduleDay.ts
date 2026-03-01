import { EnumValueObject } from "@/backend/shared/domain/EnumValueObject";

const validValues = [
  "lunes",
  "martes",
  "miercoles",
  "jueves",
  "viernes",
  "sabado"
] as const;

export type ScheduleDayValue = typeof validValues[number];

export class ScheduleDay extends EnumValueObject<ScheduleDayValue> {
  constructor(value: ScheduleDayValue) {
    super(value);
  }

  static create(value:string){
    return new ScheduleDay(value as ScheduleDayValue)
  }

  protected validValues(): readonly ScheduleDayValue[] {
    return validValues;
  }

  
}