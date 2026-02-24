
import { ValueObject } from "./ValueObject";
import { StringError } from "@/backend/error/StringError";

export abstract class StringValueObject extends ValueObject<string> {

    constructor(value: string) {
        super(value);
        this.isValidString(value);
    }

    isValidString(value: string): void{
        if (typeof value !== 'string' || value.trim() === '') {
            throw new StringError('Invalid string value');
        }
    }

}