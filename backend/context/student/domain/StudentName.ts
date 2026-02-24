import { StringValueObject } from "@/backend/shared/domain/StringValueObject";

export class StudentName extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.ensureIsValid(value);
  }

  private ensureIsValid(value: string): void {
    if (value.length < 3 || value.length > 255) {
      throw new Error("Student name must be between 3 and 255 characters");
    }
  }
}