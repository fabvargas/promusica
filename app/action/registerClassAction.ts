"use server";

import { TursoClient } from "@/database/TursoClient";
import { ValidateError } from "@/backend/error/ValidateError";
import { RegisterCalendarClassSlot } from "@/backend/context/calendar/app/RegisterCalendarClassSlot";
import { TursoCalendarRepository } from "@/backend/context/calendar/infra/TursoCalendarRepository";
import { TursoStudentRepository } from "@/backend/context/student/infra/TursoStudentRepository";

type State = {
  success: boolean
  message?: string
}

export async function registerClassAction(
  prevState: State,
  formData: FormData
): Promise<State> {

  try {

    const day = formData.get("day") as string;
    const hour = Number(formData.get("hour"));
    const instrument = formData.get("instrument") as string;
    const professorId = formData.get("professorId") as string;
    const studentName = formData.get("studentName") as string;

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

    return {
      success: true,
      message: "Clase registrada correctamente"
    };

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