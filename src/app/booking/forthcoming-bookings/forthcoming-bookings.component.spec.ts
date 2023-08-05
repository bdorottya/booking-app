import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForthcomingBookingsComponent } from './forthcoming-bookings.component';

describe('ForthcomingBookingsComponent', () => {
  let component: ForthcomingBookingsComponent;
  let fixture: ComponentFixture<ForthcomingBookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForthcomingBookingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForthcomingBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
