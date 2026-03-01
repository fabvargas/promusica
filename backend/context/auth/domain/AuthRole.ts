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

  is(role: AuthRoleType): boolean {
    return this.value === role;
  }
}