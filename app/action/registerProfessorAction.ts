"use server";

import { TursoAuthRepository } from "@/backend/context/auth/infra/TursoAuthRepository";
import { RegisterProfessor } from "@/backend/context/professor/app/RegisterProfessor";
import { TursoProfessorRepository } from "@/backend/context/professor/infra/TursoProfessorRepository";
import { TursoClient } from "@/database/TursoClient";
import { ResponseType } from "./type";
import { ValidateError } from "@/backend/error/ValidateError";

export async function registerProfessorAction():Promise<ResponseType<void>> {
    try{
    // const email = formData.get("email") as string;
    // const name = formData.get("name") as string;
    // const specialties = formData.getAll("specialties") as string[];
    const email = "example@example.com";
    const name = "John Doe";
    const instrument = "Guitarra";

    const db = TursoClient.getInstance();

    const useCase = new RegisterProfessor(
      db,
      new TursoAuthRepository(),
      new TursoProfessorRepository()
    );

    await useCase.execute({
      email,
      name,
      instrument,
    });

    return { success: true };
    } catch (error) {
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