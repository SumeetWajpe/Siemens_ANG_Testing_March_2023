import { Injectable } from '@angular/core';

@Injectable()
export class AsyncGreetingService {
  greetAsync(name: string): Promise<string> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(`Hello ${name}`);
      }, 3000);
    });
  }
}
