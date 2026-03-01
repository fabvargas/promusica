import { QueryRunner } from "@/backend/shared/app/DatabaseInterface";
import { ProfessorRepository } from "../domain/ProfessorRepository";
import { Professor } from "../domain/Professor";

export class TursoProfessorRepository implements ProfessorRepository {

  async save(professor: Professor, db: QueryRunner): Promise<void> {
    const data = professor.toPrimitives();
    
    await db.execute(
      `
      INSERT INTO professor (id, auth_id, name, instrument)
      VALUES (?, ?, ?, ?)
      `,
      [
        data.id,
        data.authId,
        data.name,
        data.instrument
      ]
    );
}

}