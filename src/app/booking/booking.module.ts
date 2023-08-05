import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CalendarComponent } from './calendar/calendar.component';
import { BookingsComponent } from './bookings/bookings.component';
import {  MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule} from '@angular/material/dialog';
import {  MatButtonModule } from '@angular/material/button';
import { BookingDetailComponent } from './booking-detail/booking-detail.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { CalendarConfirmComponent } from './calendar-confirm/calendar-confirm.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { NewBookingComponent } from './new-booking/new-booking.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { CheckInComponent } from './check-in/check-in.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDividerModule} from '@angular/material/divider';
import { ForthcomingBookingsComponent } from './forthcoming-bookings/forthcoming-bookings.component';
import { ActiveBookingsComponent } from './active-bookings/active-bookings.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';



@NgModule({
  declarations: [
    CalendarComponent,
    BookingsComponent,
    BookingDetailComponent,
    CalendarConfirmComponent,
    NewBookingComponent,
    CheckInComponent,
    ForthcomingBookingsComponent,
    ActiveBookingsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatDatepickerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatIconModule,
    MatProgressBarModule,
    MatStepperModule,
    MatDividerModule,
    MatSnackBarModule
  ],
  providers: [DatePipe],
  exports: [CalendarComponent]
})
export class BookingModule { }
