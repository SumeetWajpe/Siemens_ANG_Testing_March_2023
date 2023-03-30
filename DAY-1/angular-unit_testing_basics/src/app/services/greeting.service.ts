import { Injectable } from '@angular/core';

@Injectable()
export class GreetingService {
  greet(name: string) {
    return `Hello ${name} !`;
  }
}
