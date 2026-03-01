import { QueryRunner } from "@/backend/shared/app/DatabaseInterface";
import { Student } from "./Student";

export interface StudentRepository {
    save(student: Student, queryRunner: QueryRunner): Promise<void>;
}