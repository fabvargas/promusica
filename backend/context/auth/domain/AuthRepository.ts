import { QueryRunner } from "@/backend/shared/app/DatabaseInterface";
import { Auth } from "./Auth";

export interface AuthRepository {
    save(auth: Auth, db: QueryRunner): Promise<void>;
}