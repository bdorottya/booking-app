import { Component } from '@angular/core';
import { Booking } from '../booking.model';

@Component({
  selector: 'app-active-bookings',
  templateUrl: './active-bookings.component.html',
  styleUrls: ['./active-bookings.component.scss']
})
export class ActiveBookingsComponent {

  activeBookings: Booking[] = [];

  bookingDetails(book: Booking){}

}
