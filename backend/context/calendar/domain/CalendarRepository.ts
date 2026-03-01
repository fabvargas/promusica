import { QueryRunner } from "@/backend/shared/app/DatabaseInterface";
import { CalendarSlot } from "./CalendarSlot";
import { CalendarBlock } from "./CalendarBlock";

export interface CalendarRepository {
    saveSlot(slot: CalendarSlot, queryRunner: QueryRunner): Promise<void>;
    getSlotByDayandHour(day: string, hour: number, queryRunner: QueryRunner): Promise<CalendarBlock >;
    checkConcurrency(day: string, hour: number, version: number, queryRunner: QueryRunner): Promise<boolean>;
    getVersionByDayandHour(day: string, hour: number, queryRunner: QueryRunner): Promise<number>;
}