import { Identifier } from "@/backend/shared/domain/Identifier";
import { UuidGenerator } from "@/backend/shared/infra/UuidGenerator";

export class CalendarSlotId extends Identifier{

    constructor(value: string) {
        super(value);
    }

    static create(): CalendarSlotId {
        const id = UuidGenerator.generate();
        return new CalendarSlotId(id);
    }
}