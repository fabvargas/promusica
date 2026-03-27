import { QueryRunner } from "@/backend/shared/app/DatabaseInterface";
import { ProfessorRepository } from "../domain/ProfessorRepository";
import { Instrument } from "../../instrument/domain/Instrument";

export class GetAllProfessors {
  constructor(
    private readonly professorRepository: ProfessorRepository,
    private readonly db: QueryRunner
  ) {}

  async execute() {
    const result =  await this.professorRepository.findAll(this.db);
    return result;
  }
}