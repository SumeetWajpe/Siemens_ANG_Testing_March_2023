import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GreetingService } from './services/greeting.service';
import { DomtestingComponent } from './domtesting/domtesting.component';

@NgModule({
  declarations: [AppComponent, DomtestingComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [GreetingService],
  bootstrap: [AppComponent],
})
export class AppModule {}
