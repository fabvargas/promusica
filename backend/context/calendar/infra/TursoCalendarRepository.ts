import { QueryRunner } from "@/backend/shared/app/DatabaseInterface";
import { CalendarSlot } from "../domain/CalendarSlot";
import { CalendarRepository } from "../domain/CalendarRepository";
import { CalendarBlock } from "../domain/CalendarBlock";


type CalendarSlotData = {
    id: string;
    type: "class" | "retake" | "reservation";
    day: string;
    hour: number;
    instrument: string;
    professor_id: string | null;
    student_id: string | null;
}

type TursoExecuteResult = {
  rows: unknown[];
  rowsAffected: number;
  lastInsertRowid?: bigint;
};


export class TursoCalendarRepository implements CalendarRepository {


    async saveSlot(slot: CalendarSlot, queryRunner: QueryRunner): Promise<void> {
        const primitives = slot.toPrimitives();
        await queryRunner.execute(
            `INSERT INTO calendar (id, type, day, hour, instrument, professor_id, student_id) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                primitives.id,
                primitives.type, 
                primitives.day, 
                primitives.hour, 
                primitives.instrument, 
                primitives.professorId, 
                primitives.studentId
            ]
        );
    }

  

    async getSlotByDayandHour(
  day: string,
  hour: number,
  queryRunner: QueryRunner
): Promise<CalendarBlock> {

  const result = await queryRunner.execute<CalendarSlotData>(
    `SELECT * FROM calendar WHERE day = ? AND hour = ?`,
    [day, hour]
  );

  const block = CalendarBlock.createEmpty(day, hour);

  result.rows.forEach(row => {
    const slot = CalendarSlot.fromPrimitives(
      row.id,
      row.type,
      row.day,
      row.hour,
      row.instrument,
      row.professor_id,
      row.student_id
    );
    block.addSlot(slot);
  });

  return block;
}

    async checkConcurrency(day: string, hour: number, version: number, queryRunner: QueryRunner): Promise<boolean> {
        const result = await queryRunner.execute<TursoExecuteResult>(
            `UPDATE calendar_block SET version = version + 1
             WHERE day = ? AND hour = ? AND version = ?`,
            [day, hour, version]
        );
        return result.rowsAffected > 0;
    }

    async getVersionByDayandHour(day: string, hour: number, queryRunner: QueryRunner): Promise<number> {
        const result = await queryRunner.execute<{version: number}>(
            `SELECT version FROM calendar_block WHERE day = ? AND hour = ?`,
            [day, hour]
        );
        return result.rows[0].version
    }
}
