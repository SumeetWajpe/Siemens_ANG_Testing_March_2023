import { Component } from '@angular/core';
import { GreetingService } from './services/greeting.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-unit_testing_basics';
  constructor(public servObj: GreetingService) {
    this.servObj.greet('Nadal');
  }
}
