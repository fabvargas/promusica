import { QueryRunner } from "@/backend/shared/app/DatabaseInterface";
import { Auth } from "./Auth";
import { AuthEmail } from "./AuthEmail";

export interface AuthRepository {
    save(auth: Auth, db: QueryRunner): Promise<void>;
    findByEmail(email: AuthEmail, db: QueryRunner): Promise<Auth | null>;
    findLoginByEmail(email: AuthEmail, db: QueryRunner): Promise<{ id: string; email: string; role: string; instrument: string | null } | null>;    
}