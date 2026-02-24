import { v7 as uuidv7 } from 'uuid';

export class UuidGenerator {
    
  static generate(): string {
    return uuidv7();
  }
}