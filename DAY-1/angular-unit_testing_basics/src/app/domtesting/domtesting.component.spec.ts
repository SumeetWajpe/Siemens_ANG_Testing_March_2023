import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { DomtestingComponent } from './domtesting.component';

describe('DomtestingComponent', () => {
  let component: DomtestingComponent;
  let fixture: ComponentFixture<DomtestingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DomtestingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DomtestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the DOM element -container- if boolean (isVisible) is set to true', () => {
    const containerElement = fixture.debugElement.query(By.css('.container'));
    expect(containerElement).toBeDefined();
  });

  it('should not have the DOM element -container- if boolean (isVisible) is set to false', () => {
    component.isVisible = false;
    fixture.detectChanges(); // reflecting changes after model change
    const containerElement = fixture.debugElement.query(By.css('.container'));
    expect(containerElement).toBeNull();
  });

  fit('should toggle container visibility on click', async () => {
    const button = fixture.debugElement.query(By.css('button'));
    let containerElement = fixture.debugElement.query(By.css('.container'));
    expect(containerElement).toBeDefined();
    button.triggerEventHandler('click', <Event>{});
    fixture.detectChanges();
    containerElement = fixture.debugElement.query(By.css('.container'));
    expect(containerElement).toBeNull();
  });
});
