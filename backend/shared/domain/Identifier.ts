import { IdentifierError } from "@/backend/error/IdentifierError";
import { StringValueObject } from "./StringValueObject";

export abstract class Identifier extends StringValueObject {

    private static UUID_V7_REGEX =
        /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    constructor(value: string) {
        super(value);
        this.ensureIsValidUuidV7(value);
    }

    private ensureIsValidUuidV7(value: string): void {
        if (!Identifier.UUID_V7_REGEX.test(value)) {
            throw new IdentifierError("Identifier must be a valid UUID v7");
        }
    }

}