import { Instrument } from "../../instrument/domain/Instrument";
import { StudentId } from "./StudentId";
import { StudentName } from "./StudentName";


export class  Student {
    private constructor(
        private readonly id: StudentId,
        private readonly name: StudentName,
        private readonly instrument:Instrument,
      
    ){}

    static create(id: StudentId, name: StudentName, instrument: Instrument): Student {
        return new Student(id, name, instrument);
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
}