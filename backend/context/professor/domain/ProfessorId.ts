import { Identifier } from "@/backend/shared/domain/Identifier";
import { UuidGenerator } from "@/backend/shared/infra/UuidGenerator";

export class ProfessorId extends Identifier{

    constructor(value: string){
        super(value);
    }

    static create(): ProfessorId{
        const id = UuidGenerator.generate();
        return new ProfessorId(id);
    }
    
}