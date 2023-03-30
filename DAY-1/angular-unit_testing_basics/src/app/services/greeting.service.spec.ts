import { GreetingService } from './greeting.service';
import { inject, TestBed } from '@angular/core/testing';

xdescribe('service  - Greeting Service', () => {
  let servObj: GreetingService;

  beforeEach(async () => {
    servObj = new GreetingService(); //Manual creation
  });

  it('calls greet method', () => {
    let player = servObj.greet('Djokovic');
    expect(player).toBe('Hello Djokovic !');
  });
});

xdescribe('service  - Greeting Service (Using Dependency Injection)', () => {
  let servObj: GreetingService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [GreetingService],
    });
    servObj = TestBed.inject(GreetingService); // Dependency Injection
  });

  it('tests if servObj is defined', () => {
    expect(servObj).toBeDefined();
  });
});

xdescribe('service  - Greeting Service (Injected at Test case level)', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [GreetingService],
    });
  });

  it('tests if servObj is defined', inject(
    [GreetingService],
    (servObj: GreetingService) => {
      expect(servObj).toBeDefined();
    }
  ));
});
