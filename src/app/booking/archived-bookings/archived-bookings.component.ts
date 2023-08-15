import { Component, Input, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Room } from 'src/app/rooms/room.model';
import { Booking } from '../booking.model';
import { Timestamp } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { BookingDetailComponent } from '../booking-detail/booking-detail.component';

@Component({
  selector: 'app-archived-bookings',
  templateUrl: './archived-bookings.component.html',
  styleUrls: ['./archived-bookings.component.scss']
})
export class ArchivedBookingsComponent implements OnInit {

  constructor(private dialog: MatDialog){}


  @Input() allBooking!:Observable<Booking[]>;
  archivedBookings$!: Observable<Booking[]>;

  @Input() rooms: Room[] = [];

  length!:number;

  ngOnInit(): void {
    this.allBooking.subscribe(obs =>{
      this.archivedBookings$ = this.mapArchivedBookings()
      this.archivedBookings$.subscribe(data => this.length = data.length);
    })


  }

  mapArchivedBookings(){
    return this.allBooking.pipe(map((bookings:Booking[]) => bookings.filter(booking =>
        booking.bookingStatus == 'Archived')))
  }

  dateConverter(date:Date){
    return (date as unknown as Timestamp).toDate()
  }

  bookingDetails(booking:Booking){
    let dialog = this.dialog.open(BookingDetailComponent, {
      width: '60%',
      data: {rooms: this.rooms}
    });
    dialog.componentInstance.booking = booking;
    dialog.afterClosed().subscribe(data => {
      if(data === 'Status Changed'){
      }
    })
  }
}
