import { ValidateError } from "@/backend/error/ValidateError";
import { EnumValueObject } from "@/backend/shared/domain/EnumValueObject";

const validRoles = ["admin", "professor"] as const;
export type AuthRoleType = typeof validRoles[number];

export class AuthRole extends EnumValueObject<AuthRoleType> {

  constructor(value: AuthRoleType) {
    super(value);
  }

  protected validValues(): readonly AuthRoleType[] {
    return validRoles;
  }

  static fromString(role: string): AuthRole {
    if (!validRoles.includes(role as AuthRoleType)) {
      throw new ValidateError(`rol Invalido: ${role}`);
    }
    return new AuthRole(role as AuthRoleType);
  }

  is(role: AuthRoleType): boolean {
    return this.value === role;
  }
}