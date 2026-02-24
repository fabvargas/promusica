import { Identifier } from "@/backend/shared/domain/Identifier";
import { UuidGenerator } from "@/backend/shared/infra/UuidGenerator";

export class AuthId extends Identifier{

    constructor(value: string) {
        super(value);
    }

    static create(): AuthId {
        const id = UuidGenerator.generate();
        return new AuthId(id);
    }
        
}