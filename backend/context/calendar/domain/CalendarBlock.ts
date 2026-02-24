import { ScheduleError } from "@/backend/error/ScheduleError";
import { CalendarSlot } from "./CalendarSlot";
import { CalendarSlotTime } from "./CalendarSlotTime";

const MAX_TOTAL = 6;
const MAX_DRUMS = 2; 
const MAX_PIANO_SINGING = 4;

export class CalendarBlock {

  private constructor(
    private readonly time: CalendarSlotTime,
    private readonly slots: CalendarSlot[]
  ) {}

  static create(time: CalendarSlotTime): CalendarBlock {
    return new CalendarBlock(time, []);
  }

  addSlot(slot: CalendarSlot): void {
    this.ensureSameTime(slot);
    this.ensureCapacity();
    this.ensureProfessorAvailability(slot);
    this.ensureInstrumentQuota(slot);

    this.slots.push(slot);
  }

  private ensureSameTime(slot: CalendarSlot): void {
    if (!slot.getTime().equals(this.time)) {
      throw new ScheduleError("El slot no pertenece a este bloque horario");
    }
  }

 private ensureCapacity(): void {
  if (this.slots.length + 1 > MAX_TOTAL) {
    throw new ScheduleError("Máximo 6 clases por bloque");
  }
}

  private ensureProfessorAvailability(slot: CalendarSlot): void {
    if (!slot.hasProfessorAssigned()) return;

    const duplicated = this.slots.some(existing =>
      slot.hasProfessorAssigned() &&
      existing.hasProfessorAssigned() &&
      slot.isTaughtBy(existing.getProfessorId()!)
    );

    if (duplicated) {
      throw new ScheduleError(
        "El profesor ya tiene una clase asignada en este bloque horario"
      );
    }
  }

 private ensureInstrumentQuota(slot: CalendarSlot): void {

  if (
    slot.countsAsDrum() &&
    this.countDrums() + 1 > MAX_DRUMS
  ) {
    throw new ScheduleError(
      `Máximo ${MAX_DRUMS} clases de batería`
    );
  }

  if (
    slot.countsForPianoSingingQuota() &&
    this.countPianoSinging() + 1 > MAX_PIANO_SINGING
  ) {
    throw new ScheduleError(
      `Máximo ${MAX_PIANO_SINGING} clases de piano + canto`
    );
  }
  }
  
  private countDrums(): number {
    return this.slots.filter(s => s.countsAsDrum()).length;
  }

  private countPianoSinging(): number {
    return this.slots.filter(s =>
      s.countsForPianoSingingQuota()
    ).length;
  }

  getSlots(): CalendarSlot[] {
    return [...this.slots];
  }
}