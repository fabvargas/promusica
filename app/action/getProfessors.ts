import { GetAllProfessors } from '@/backend/context/professor/app/GetAllProfessors';
import { TursoProfessorRepository } from '@/backend/context/professor/infra/TursoProfessorRepository';
import { TursoClient } from '@/database/TursoClient';
import { Professor, ResponseType } from './type';
import { ValidateError } from '@/backend/error/ValidateError';

export default async function getProfessors(): Promise<ResponseType<Professor[]>> {
    
    try{
    const professorRepo = new TursoProfessorRepository();
    const db = TursoClient.getInstance()
    const useCase = new GetAllProfessors(professorRepo, db);
    const result = await useCase.execute();
    return {
        success: true,
        data: result.map(prof => prof.toPrimitives()),
        }
    } catch (error) {
        if(error instanceof ValidateError){
            return {
                success: false,
                data: [],
                message: error.message
            }
        }
        return {
            success: false,
            data: [],
            message: "Unexpected error"
        }
    }
  
}
