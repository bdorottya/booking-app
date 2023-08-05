import { Component, Input, OnInit } from '@angular/core';
import { Booking } from '../booking.model';
import { MatDialog } from '@angular/material/dialog';
import { NewBookingComponent } from '../new-booking/new-booking.component';
import { RoomsService } from 'src/app/rooms/rooms.service';
import { Room } from 'src/app/rooms/room.model';
import { BookingDetailComponent } from '../booking-detail/booking-detail.component';
import { Subject } from 'rxjs';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-forthcoming-bookings',
  templateUrl: './forthcoming-bookings.component.html',
  styleUrls: ['./forthcoming-bookings.component.scss']
})
export class ForthcomingBookingsComponent implements OnInit {

  constructor(private dialog: MatDialog, private roomService: RoomsService){}

  @Input() allBooking:any;

  @Input() rooms: Room[] = [];


  ngOnInit(): void {

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
      if(data){
        this.allBooking.next(data);
      }
    });
  }

  dateConverter(date:Date){
    return (date as unknown as Timestamp).toDate()
  }

}
