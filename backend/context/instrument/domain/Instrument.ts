import { EnumValueObject } from "@/backend/shared/domain/EnumValueObject";

const validInstruments = ["Piano", "Guitarra", "Violin", "Bateria", "Viento","Canto","Bajo"] as const;
type ValidInstruments = typeof validInstruments[number];

export class Instrument extends EnumValueObject<ValidInstruments> {
    constructor(value: ValidInstruments) {
        super(value, validInstruments);
    }

    is(value: ValidInstruments): boolean {
        return this.value === value;
    }

    isPiano(): boolean {
        return this.is("Piano");
    }

    isGuitar(): boolean {
        return this.is("Guitarra");
    }

    isViolin(): boolean {
        return this.is("Violin");
    }

    isDrums(): boolean {
        return this.is("Bateria");
    }

    isWind(): boolean {
        return this.is("Viento");
    }

    isSinging(): boolean {
        return this.is("Canto");
    }

    isBass(): boolean {
        return this.is("Bajo");
    }

    getValue(): ValidInstruments {
        return this.value;
    }
}