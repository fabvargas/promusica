import { UuidGenerator } from "@/backend/shared/infra/UuidGenerator";
import { Instrument } from "../../instrument/domain/Instrument";
import { StudentId } from "./StudentId";
import { StudentName } from "./StudentName";


export class  Student {
    private constructor(
        private readonly id: StudentId,
        private readonly name: StudentName,
        private readonly instrument:Instrument,
      
    ){}

    static create(name: string, instrument: string): Student {
        const id = UuidGenerator.generate();
        const instrumentObj =Instrument.create(instrument);
        return new Student(
            new StudentId(id),
            new StudentName(name),
            instrumentObj
        );
    }

    getId(): StudentId {
        return this.id;
    }

    getName(): StudentName {
        return this.name;
    }

    getInstrument(): Instrument {
        return this.instrument;
    }
    
    plays(instrument: Instrument): boolean {
        return this.instrument.equals(instrument);
    }

    toPrimitives() {
        return {
            id: this.id.getValue(),
            name: this.name.getValue(),
            instrument: this.instrument.getValue()
        }
    }
}