import { ValidateError } from "@/backend/error/ValidateError";
import { StringValueObject } from "@/backend/shared/domain/StringValueObject";

export class ProfessorName extends StringValueObject{

    constructor(value: string){
        super(value);
        this.ensureIsValid(value);
    }

    private ensureIsValid(value: string): void {
        if(value.length < 3 || value.length > 100){
            throw new ValidateError("Nombre debe tener entre 3 y 100 caracteres");
        }

    }


}