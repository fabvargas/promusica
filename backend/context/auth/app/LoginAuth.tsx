import { QueryRunner } from "@/backend/shared/app/DatabaseInterface";
import { AuthEmail } from "../domain/AuthEmail";
import { AuthRepository } from "../domain/AuthRepository"
import { Auth } from "../domain/Auth";
import { ValidateError } from "@/backend/error/ValidateError";
import { ProfessorRepository } from "../../professor/domain/ProfessorRepository";

export class LoginAuth {

    constructor(
        private readonly authRepository: AuthRepository,
        private readonly db: QueryRunner
    ) {}

    async execute(email: string): Promise<{ id: string; email: string; role: string; instrument: string | null }> {
        const authEmail = new AuthEmail(email);
        const auth = await this.authRepository.findLoginByEmail(authEmail, this.db);

        if (!auth) {
            throw new ValidateError("email no encontrado");
        }

        return auth;
    }
}