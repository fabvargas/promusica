export class NumberError extends Error {

    constructor(message: string) {
        super(message);
        this.name = 'NumberError';
    }

}