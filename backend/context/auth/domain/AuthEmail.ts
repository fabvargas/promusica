import { ValidateError } from "@/backend/error/ValidateError";
import { StringValueObject } from "@/backend/shared/domain/StringValueObject";

export class AuthEmail extends StringValueObject {

    constructor(value: string) {
        super(value);
        this.validateEmail(value);
    }

    private validateEmail(email: string): void {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new ValidateError("el email no es valido");
        }
        if (email.length < 5 || email.length > 200) {
            throw new ValidateError("el email debe tener entre 5 y 200 caracteres");
        }
    }

    getValue(): string {
        return this.value;
    }
    
}