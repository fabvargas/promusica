import { Instrument } from "../../instrument/domain/Instrument";
import { ProfessorId } from "../../professor/domain/ProfessorId";
import { CalendarSlotId } from "./CalendarSlotId";
import { CalendarSlotInfo } from "./CalendarSlotInfo";
import { CalendarSlotTime } from "./CalendarSlotTime";

export class CalendarSlot {
  constructor(
    private readonly id: CalendarSlotId,
    private readonly instrument: Instrument,
    private readonly time: CalendarSlotTime,
    private readonly info: CalendarSlotInfo
  ) {}

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
}