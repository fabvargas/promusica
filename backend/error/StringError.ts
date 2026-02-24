export class StringError extends Error {

    constructor(message: string) {
        super(message);
        this.name = 'StringError';
    }

}