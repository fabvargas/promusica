import { EnumValueObject } from "@/backend/shared/domain/EnumValueObject";

const validHours = [
  10,11,12,13,
  14,15,16,17,18,19,20
] as const;

export type ScheduleHourValue = typeof validHours[number];

export class ScheduleHour extends EnumValueObject<ScheduleHourValue> {
  constructor(value: ScheduleHourValue) {
    super(value);
  }

  static create(value:number){
    return new ScheduleHour(value as ScheduleHourValue)
  }

  protected validValues(): readonly ScheduleHourValue[] {
    return validHours;
  }

  toNumber(): number {
    return Number(this.value);
  }

}