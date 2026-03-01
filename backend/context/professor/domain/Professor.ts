
import { Instrument } from "../../instrument/domain/Instrument";
import { ProfessorId } from "./ProfessorId";
import { ProfessorName } from "./ProfessorName";
import { AuthId } from "../../auth/domain/AuthId";

export class Professor {

  private constructor(
    private readonly id: ProfessorId,
    private readonly authId: AuthId,
    private readonly name: ProfessorName,
    private readonly instrument: Instrument
  ) { }

    static create(authId: AuthId, name: string, instrument: string): Professor {
        const id = ProfessorId.create();
        const nameObj = new ProfessorName(name);
        const instrumentObj = Instrument.create(instrument);
        console.log(instrument, "desde profesor")
        return new Professor(id, authId, nameObj, instrumentObj);
    }


    canTeach(instrument: Instrument): boolean {
        return this.instrument.equals(instrument);
    }

    getId(): ProfessorId {
        return this.id;
    }

    getAuthId(): AuthId {
        return this.authId;
    }
    
    getName(): ProfessorName {
        return this.name;
    }

    getInstrument(): Instrument {
        return this.instrument;
    }

    toPrimitives() {
        return {
            id: this.id.getValue(),
            authId: this.authId.getValue(),
            name: this.name.getValue(),
            instrument: this.instrument.getValue()
        }
    }

}   