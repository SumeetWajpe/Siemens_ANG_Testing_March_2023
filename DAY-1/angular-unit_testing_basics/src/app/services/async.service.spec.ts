import { AsyncGreetingService } from './async.service';
import { TestBed, waitForAsync } from '@angular/core/testing';

describe('async service  - Greeting Service', () => {
  let servObj: AsyncGreetingService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [AsyncGreetingService],
    });
    servObj = TestBed.inject(AsyncGreetingService); // Dependency Injection
  });

  it('should check if a service object is created ', () => {
    expect(servObj).toBeDefined();
  });

  it('calls async greet method - using async await', async () => {
    let result = await servObj.greetAsync('Ranjan');
    expect(result).toBe('Hello Ranjan');
  });

  it('calls async greet method - using waitForAsync', waitForAsync(() => {
    servObj.greetAsync('Amit').then((result) => {
      expect(result).toBe('Hello Amit');
    });
  }));
});
