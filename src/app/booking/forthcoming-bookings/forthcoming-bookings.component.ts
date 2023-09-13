import { Component, Input, OnInit } from '@angular/core';
import { Booking } from '../booking.model';
import { MatDialog } from '@angular/material/dialog';
import { NewBookingComponent } from '../new-booking/new-booking.component';
import { RoomsService } from 'src/app/rooms/rooms.service';
import { Room } from 'src/app/rooms/room.model';
import { BookingDetailComponent } from '../booking-detail/booking-detail.component';
import { Observable, Subject, map } from 'rxjs';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-forthcoming-bookings',
  templateUrl: './forthcoming-bookings.component.html',
  styleUrls: ['./forthcoming-bookings.component.scss']
})
export class ForthcomingBookingsComponent implements OnInit {

  constructor(private dialog: MatDialog, private roomService: RoomsService){}

  @Input() allBooking!:Observable<Booking[]>;
  forthcomingBooking$!:Observable<Booking[]>;

  @Input() rooms: Room[] = [];

  length!:number;
  today = new Date();


  ngOnInit(): void {
    this.allBooking.subscribe(obs => {
      this.forthcomingBooking$ = this.mapForthBooking();
      this.forthcomingBooking$.subscribe(data => this.length = data.length);
    })

  }

  mapForthBooking(){
    return this.allBooking.pipe(
        map((bookings:Booking[]) => bookings.filter(booking =>
          booking.bookingStatus != 'Archived')))
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

  addBooking(){
    let dialogRef = this.dialog.open(NewBookingComponent, {
      width: '90%',
      minHeight: '75%',
      data: {rooms: this.rooms}
    });

    dialogRef.afterClosed().subscribe(data => {

    });
  }

  dateConverter(date:Date){
    return (date as unknown as Timestamp).toDate()
  }

}
