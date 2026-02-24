export class NullOrUndefinedError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "NullOrUndefinedError";
    }
}