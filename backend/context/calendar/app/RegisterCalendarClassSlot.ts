import { DatabaseInterface } from "@/backend/shared/app/DatabaseInterface";
import { Student } from "../../student/domain/Student";
import { StudentRepository } from "../../student/domain/StudentRepository";
import { CalendarRepository } from "../domain/CalendarRepository";
import { CalendarSlot } from "../domain/CalendarSlot";
import { ValidateError } from "@/backend/error/ValidateError";


export type CalendarSlotCommand = { 
    day: string;
    hour: number;
    instrument: string;
    professorId: string;
    studentName: string;
}

export class RegisterCalendarClassSlot {
    constructor(
        private readonly db: DatabaseInterface,
        private readonly studentRepo: StudentRepository,
        private readonly calendarRepo:CalendarRepository,
    ){}

    async execute(command: CalendarSlotCommand): Promise<void> {

        const student = Student.create(command.studentName, command.instrument);
        const classSlot = CalendarSlot.createClassSlot(command.day, command.hour, command.instrument, command.professorId, student.getId());

        await this.db.transaction(async (runner) => {
            const version = await this.calendarRepo.getVersionByDayandHour(command.day, command.hour, runner);
            const blockFound = await this.calendarRepo.getSlotByDayandHour(command.day, command.hour, runner);
            blockFound.addSlot(classSlot);
            
            
            await this.studentRepo.save(student, runner);
            await this.calendarRepo.saveSlot(classSlot, runner);

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