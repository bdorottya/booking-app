import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar/calendar.component';
import { BookingsComponent } from './bookings/bookings.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { BookingDetailComponent } from './booking-detail/booking-detail.component';



@NgModule({
  declarations: [
    CalendarComponent,
    BookingsComponent,
    BookingDetailComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatButtonModule,
  ]
})
export class BookingModule { }
