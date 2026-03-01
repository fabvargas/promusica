import { UuidGenerator } from "@/backend/shared/infra/UuidGenerator";
import { Instrument } from "../../instrument/domain/Instrument";
import { ProfessorId } from "../../professor/domain/ProfessorId";
import { CalendarSlotId } from "./CalendarSlotId";
import { CalendarSlotInfo } from "./CalendarSlotInfo";
import { CalendarSlotTime } from "./CalendarSlotTime";
import { StudentId } from "../../student/domain/StudentId";
import { ClassInfoSlot } from "./ClassInfoSlot";
import { RetakeInfoSlot } from "./RetakeInfoSlot";
import { ReservationInfoSlot } from "./ReservationInfoSlot";
import { CalendarSlotInfoFactory } from "./CalendarSlotInfoFactory";


export class CalendarSlot {
  private constructor(
    private readonly id: CalendarSlotId,
    private readonly instrument: Instrument,
    private readonly time: CalendarSlotTime,
    private readonly info: CalendarSlotInfo
  ) {}

  static createClassSlot(
    day: string,
    hour: number,
    instrument: string,
    professorId: string,
    studentId: StudentId
  ): CalendarSlot {
    const id = UuidGenerator.generate();
    const instrumentObj = Instrument.create(instrument);
    const time = CalendarSlotTime.create(day, hour);
    const info = ClassInfoSlot.create(professorId, studentId);

    return new CalendarSlot(
      new CalendarSlotId(id),
      instrumentObj,
      time,
      info
    )
  }
  
  static createRetakeSlot(
    day: string,
    hour: number,
    instrument: string,
    professorId: string
  ): CalendarSlot {
    const id = UuidGenerator.generate();
    const instrumentObj = Instrument.create(instrument);
    const time = CalendarSlotTime.create(day, hour);
    const info = RetakeInfoSlot.create(professorId);

    return new CalendarSlot(
      new CalendarSlotId(id),
      instrumentObj,
      time,
      info
    )
  }

  static createReservationSlot(
    day: string,
    hour: number,
    instrument: string
  ): CalendarSlot {
    const id = UuidGenerator.generate();
    const instrumentObj = Instrument.create(instrument);
    const time = CalendarSlotTime.create(day, hour);

    return new CalendarSlot(
      new CalendarSlotId(id),
      instrumentObj,
      time,
      new ReservationInfoSlot()
    )
  }

  getTime(): CalendarSlotTime {
    return this.time;   
  }

  getProfessorId(): ProfessorId | null {
    return this.info.getProfessorId();
  }


  hasProfessorAssigned(): boolean {
    return this.getProfessorId() !== null;
  }

  isTaughtBy(professorId: ProfessorId): boolean {
    const current = this.getProfessorId();
    return current?.equals(professorId) ?? false;
  }

  countsAsDrum(): boolean {
    return this.instrument.isDrums();
  }

  countsForPianoSingingQuota(): boolean {
    return this.instrument.isPiano() || this.instrument.isSinging();
  }

  toPrimitives() {
  const time = this.time.toPrimitives();
  const info = this.info.toPrimitives();

  return {
    id: this.id.getValue(),
    instrument: this.instrument.getValue(),
    day: time.day,
    hour: time.hour,
    type: info.type,
    professorId: info.professorId,
    studentId: info.studentId
  };
  }

  static fromPrimitives(
    id:string,
    type: "class" | "retake" | "reservation",
    day: string,
    hour: number,
   instrument: string,
    professorId: string | null,
    studentId: string | null
  ): CalendarSlot {
    return new CalendarSlot(
      new CalendarSlotId(id),
      Instrument.fromPrimitives(instrument),
      CalendarSlotTime.fromPrimitives(day, hour),
      CalendarSlotInfoFactory.fromPrimitives(type, professorId, studentId)
    );
  }
   

} 
  

  
