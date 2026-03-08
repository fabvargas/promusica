import { DatabaseInterface } from "@/backend/shared/app/DatabaseInterface"
import { CalendarRepository } from "../domain/CalendarRepository"
import { CalendarSlot } from "../domain/CalendarSlot";
import { ValidateError } from "@/backend/error/ValidateError";


export type CalendarSlotCommand = { 
    day: string;
    hour: number;
    instrument: string;
    professorId: string;
}

export class RegisterCalendarRetakeSlot {

    constructor(
        private readonly db : DatabaseInterface,
        private readonly calendarRepo : CalendarRepository
    ){}

    async execute(command:CalendarSlotCommand): Promise<void> {
        const retakeSlot = CalendarSlot.createRetakeSlot(command.day, command.hour, command.instrument, command.professorId);

        await this.db.transaction(async (runner) => {
            const version = await this.calendarRepo.getVersionByDayandHour(command.day, command.hour, runner);
            const blockFound = await this.calendarRepo.getSlotByDayandHour(command.day, command.hour, runner);
            blockFound.addSlot(retakeSlot);
            
            await this.calendarRepo.saveSlot(retakeSlot, runner);

            const updated = await this.calendarRepo.checkConcurrency(
            command.day,
            command.hour,
            version,
            runner
            );
            if (!updated) {
                throw new ValidateError("Concurrency error: The calendar block has been modified by another transaction. Please try again.");
            }   
        });
    }

}