export class ClientDatabaseError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ClientDatabaseError";
    }
}