import { QueryRunner } from "@/backend/shared/app/DatabaseInterface";
import { AuthRepository } from "../domain/AuthRepository";
import { Auth } from "../domain/Auth";
import { DataBaseError } from "@/backend/error/DatabasError";
import { AuthEmail } from "../domain/AuthEmail";
import { ValidateError } from "@/backend/error/ValidateError";

type AuthRow = {
    id: string;
    email: string;
    role: string;
}

type AuthLoginRow = {
    id: string;
    email: string;
    role: string;
    instrument: string | null
}


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
      throw new ValidateError("Email already exists");
    }

    throw error;
  }
}

  async findByEmail(email: AuthEmail, db: QueryRunner): Promise<Auth | null> {
    const result = await db.execute<AuthRow>(`
      SELECT id, email, role 
      FROM auth
      WHERE email = ?
    `, [email.getValue()]);

    if (result.rows.length === 0) {
      return null;
    }

    const row = result.rows[0];
    
    return Auth.fromPrimitives({
      id: row.id,
      email: row.email,
      role: row.role
    });
  }

async findLoginByEmail(
  email: AuthEmail,
  db: QueryRunner
): Promise<{ id: string; email: string; role: string; instrument: string | null } | null> {

  const result = await db.execute<AuthLoginRow>(`
    SELECT a.id, a.email, a.role, p.instrument
    FROM auth a
    LEFT JOIN professor p ON a.id = p.auth_id
    WHERE a.email = ?
  `, [email.getValue()]);

  if (result.rows.length === 0) {
    return null;
  }

  const row = result.rows[0];

  return {
    id: row.id,
    email: row.email,
    role: row.role,
    instrument: row.instrument ?? null
  };
}


}