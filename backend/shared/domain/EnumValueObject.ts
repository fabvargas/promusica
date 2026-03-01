import { ValidateError } from "@/backend/error/ValidateError";
import { ValueObject } from "./ValueObject";

export abstract class EnumValueObject<T extends string | number>
  extends ValueObject<T> {

  protected abstract validValues(): readonly T[];

  constructor(value: T) {
    super(value);
    this.ensureIsValid(value);
  }

  private ensureIsValid(value: T): void {
    if (!this.validValues().includes(value)) {
      throw new ValidateError(`Invalid enum value: ${value}`);
    }
  }
}