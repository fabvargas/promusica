import { ValidateError } from "@/backend/error/ValidateError";
import { ValueObject } from "./ValueObject";

export abstract class EnumValueObject<T extends string> 
  extends ValueObject<T> {

  constructor(
    value: T,
    private readonly validValues: readonly T[]
  ) {
    super(value);
    this.ensureIsValid(value);
  }

  private ensureIsValid(value: T): void {
    if (!this.validValues.includes(value)) {
      throw new ValidateError(`Invalid enum value: ${value}`);
    }
  }
}