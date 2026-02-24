import { Identifier } from "@/backend/shared/domain/Identifier";
import { UuidGenerator } from "@/backend/shared/infra/UuidGenerator";

export class StudentId extends Identifier{

    constructor(value: string){
        super(value);
    }

    static create(): StudentId{
        const id = UuidGenerator.generate();
        return new StudentId(id);
    }
    
}