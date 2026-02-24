import { Instrument } from "../../instrument/domain/Instrument";
import { ProfessorId } from "./ProfessorId";
import { ProfessorName } from "./ProfessorName";

export class Professor {

  private constructor(
    private readonly id: ProfessorId,
    private readonly name: ProfessorName,
    private readonly specialties: Instrument[]
  ) {}

    static create(id: ProfessorId, name: ProfessorName, specialties: Instrument[]): Professor {
        return new Professor(id, name, specialties);
    }

    canTeach(instrument: Instrument): boolean {
        return this.specialties.some(i => i.equals(instrument));
    }

    getId(): ProfessorId {
        return this.id;
    }
    
    getName(): ProfessorName {
        return this.name;
    }
}