import { DatabaseInterface } from "@/backend/shared/app/DatabaseInterface";
import { AuthRepository } from "../../auth/domain/AuthRepository";
import { ProfessorRepository } from "../domain/ProfessorRepository";
import { Auth } from "../../auth/domain/Auth";
import { Professor } from "../domain/Professor";


export interface RegisterProfessorCommand {
  email: string;
  name: string;
  instrument: string;
}


export class RegisterProfessor {

    constructor(
        private readonly db:DatabaseInterface,
        private readonly authRepository: AuthRepository,
        private readonly professorRepository: ProfessorRepository
    ){}

    async execute(command: RegisterProfessorCommand): Promise<void> {
        const auth = Auth.createProfessor(command.email);
        const professor = Professor.create(auth.getId(),command.name, command.instrument);

        await this.db.transaction(async (runner) => {
            await this.authRepository.save(auth, runner);
            await this.professorRepository.save(professor, runner);
        });
    }
}