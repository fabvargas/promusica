import { QueryRunner } from "@/backend/shared/app/DatabaseInterface";
import { AuthRepository } from "../domain/AuthRepository";
import { Auth } from "../domain/Auth";
import { DataBaseError } from "@/backend/error/DatabasError";


export class TursoAuthRepository implements AuthRepository {

async save(auth: Auth, db: QueryRunner): Promise<void> {
  try {
    const data = auth.toPrimitives();

    await db.execute(`
      INSERT INTO auth (id, email, role)
      VALUES (?, ?, ?)
    `, [
      data.id,
      data.email,
      data.role
    ]);

  } catch (error) {

    if (error instanceof Error && error.message.includes("UNIQUE") && error.message.includes("email")) {
      throw new DataBaseError("Email already exists");
    }

    throw error;
  }
}
}