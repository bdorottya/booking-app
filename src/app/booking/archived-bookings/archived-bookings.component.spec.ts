import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedBookingsComponent } from './archived-bookings.component';

describe('ArchivedBookingsComponent', () => {
  let component: ArchivedBookingsComponent;
  let fixture: ComponentFixture<ArchivedBookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivedBookingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchivedBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
