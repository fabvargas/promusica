import { QueryRunner } from "@/backend/shared/app/DatabaseInterface";
import { Professor } from "./Professor";
import { Instrument } from "../../instrument/domain/Instrument";

export interface ProfessorRepository{
    save(professor: Professor, db: QueryRunner): Promise<void>;
    findAll(db: QueryRunner): Promise<Professor[]>;
}