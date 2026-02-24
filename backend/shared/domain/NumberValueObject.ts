import { NumberError } from "./NumberError";
import { ValueObject } from "./ValueObject";

export abstract class NumberValueObject extends ValueObject<number> {

    constructor(value: number) {
        super(value);
        this.isValidNumber(value);
    }

    isValidNumber(value: number): void {
        if (typeof value !== 'number' || isNaN(value)) {
            throw new NumberError('Invalid number value');
        }
    }

}