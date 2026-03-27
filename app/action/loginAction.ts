import { LoginAuth } from "@/backend/context/auth/app/LoginAuth";
import { TursoAuthRepository } from "@/backend/context/auth/infra/TursoAuthRepository";
import { TursoClient } from "@/database/TursoClient";
import { ResponseType } from "./type";

export async function loginAction(email: string): Promise<ResponseType<{id: string, email: string, role: string , instrument: string | null}>> {


    const authRepository = new TursoAuthRepository();
    const db = TursoClient.getInstance();
    const useCase = new LoginAuth(authRepository, db);

    const result = await useCase.execute(email)

    return {
        success: true,
        data: {
            id: result.id,
            email: result.email,
            role: result.role,
            instrument: result.instrument 
        }
    };


}

