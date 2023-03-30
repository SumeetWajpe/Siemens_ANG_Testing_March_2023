import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GreetingService } from './services/greeting.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [GreetingService],
  bootstrap: [AppComponent],
})
export class AppModule {}
