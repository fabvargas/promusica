
"use server";

import { TursoClient } from "@/database/TursoClient";
import { ResponseType } from "./type";
import { ValidateError } from "@/backend/error/ValidateError";
import { RegisterCalendarClassSlot } from "@/backend/context/calendar/app/RegisterCalendarSlot";
import { TursoCalendarRepository } from "@/backend/context/calendar/infra/TursoCalendarRepository";
import { TursoStudentRepository } from "@/backend/context/student/infra/TursoStudentRepository";

export async function registerClassAction():Promise<ResponseType<void>> {
    try{
    const day = "lunes";
    const hour = 16;
    const instrument = "Guitarra";
    const professorId = "019ca1e7-6148-729a-a82a-6a1a4c16ca33";
    const studentName = "John Doe";

    const db = TursoClient.getInstance();

    const useCase = new RegisterCalendarClassSlot(
      db,
      new TursoStudentRepository(),
      new TursoCalendarRepository(),
    );

    await useCase.execute({
      day,
      hour,
      instrument,
      professorId,
      studentName
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
        message: error instanceof Error ? error.message : "Unexpected error"
      };
    }
}