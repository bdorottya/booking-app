import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarConfirmComponent } from './calendar-confirm.component';

describe('CalendarConfirmComponent', () => {
  let component: CalendarConfirmComponent;
  let fixture: ComponentFixture<CalendarConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarConfirmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
