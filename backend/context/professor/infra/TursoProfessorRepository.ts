import { QueryRunner } from "@/backend/shared/app/DatabaseInterface";
import { ProfessorRepository } from "../domain/ProfessorRepository";
import { Professor } from "../domain/Professor";
import { Instrument } from "../../instrument/domain/Instrument";

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

  async findAll(db: QueryRunner): Promise<Professor[]> {
    const result = await db.execute(
      `
      SELECT * FROM professor
      `
    );

    return result.rows.map((row: any) => Professor.fromPrimitives({
      id: row.id,
      authId: row.auth_id,
      name: row.name,
      instrument: row.instrument
    }));
  }

}