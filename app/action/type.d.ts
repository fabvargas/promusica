export interface ResponseType<T>{
    success: boolean;
    message?: string;
    data?: T;
    error?:Error
}

export type Professor = {
    id: string;
    name: string;
    instrument: string;
}