import { QueryRunner } from "@/backend/shared/app/DatabaseInterface";
import { Professor } from "./Professor";

export interface ProfessorRepository{
    save(professor: Professor, db: QueryRunner): Promise<void>;
}