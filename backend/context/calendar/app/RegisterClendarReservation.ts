import { DatabaseInterface } from "@/backend/shared/app/DatabaseInterface";
import { CalendarRepository } from "../domain/CalendarRepository";
import { CalendarSlot } from "../domain/CalendarSlot";

export type CalendarSlotCommand = { 
    day: string;
    hour: number;
    instrument: string;
}

export class RegisterCalendarReservation {
    constructor(
        private readonly db: DatabaseInterface,
        private readonly calendarRepo: CalendarRepository
    ){}

    async execute(command: CalendarSlotCommand): Promise<void> {
        const reservationSlot = CalendarSlot.createReservationSlot(command.day, command.hour, command.instrument);

        await this.db.transaction(async (runner) => {
            const version = await this.calendarRepo.getVersionByDayandHour(command.day, command.hour, runner);
            const blockFound = await this.calendarRepo.getSlotByDayandHour(command.day, command.hour, runner);
            blockFound.addSlot(reservationSlot);
            
            await this.calendarRepo.saveSlot(reservationSlot, runner);  

            const updated = await this.calendarRepo.checkConcurrency(
            command.day,
            command.hour,
            version,
            runner
            );
            if (!updated) {
                throw new Error("Concurrency error: The calendar block has been modified by another transaction. Please try again.");
            }   
        });
    }
}
