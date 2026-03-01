import { QueryRunner } from "@/backend/shared/app/DatabaseInterface";
import { Student } from "../domain/Student";
import { StudentRepository } from "../domain/StudentRepository";


export class TursoStudentRepository implements StudentRepository {
  async save(student: Student, db: QueryRunner): Promise<void> {
    const data = student.toPrimitives();
    
    await db.execute(
      `
      INSERT INTO student (id, name, instrument)
      VALUES (?, ?, ?)
      `,
      [
        data.id,
        data.name,
        data.instrument
      ]
    );
}

}