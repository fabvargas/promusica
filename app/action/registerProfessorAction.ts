"use server";

import { TursoAuthRepository } from "@/backend/context/auth/infra/TursoAuthRepository";
import { RegisterProfessor } from "@/backend/context/professor/app/RegisterProfessor";
import { TursoProfessorRepository } from "@/backend/context/professor/infra/TursoProfessorRepository";
import { TursoClient } from "@/database/TursoClient";
import { ValidateError } from "@/backend/error/ValidateError";

export async function registerProfessorAction(
  prevState: any,
  formData: FormData
) {
    try{
    const email = formData.get("email") as string;
    const name = formData.get("name") as string;
    const lastname = formData.get("lastname") as string;
    const instrument = formData.get("instrument") as string;

    const fullName = `${name} ${lastname}`;

    const db = TursoClient.getInstance();

    const useCase = new RegisterProfessor(
      db,
      new TursoAuthRepository(),
      new TursoProfessorRepository()
    );

    await useCase.execute({
      email,
      name: fullName,
      instrument
    });

    return { success: true , message: "Profesor Registrado"};
    } catch (error) {
      console.log(error)
        if (error instanceof ValidateError) {
            return {
                success: false,
                message: error.message
            };
        }
      return {
        success: false,
        message:"Unexpected error"
      };
    }
}