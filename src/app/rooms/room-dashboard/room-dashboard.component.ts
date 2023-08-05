import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Room } from '../room.model';
import { RoomsService } from '../rooms.service';
import { BookingService } from 'src/app/booking/booking.service';
import { Booking } from 'src/app/booking/booking.model';
import { Timestamp } from '@angular/fire/firestore';
import { DateRange } from '@angular/material/datepicker';

export class Connected{
  booking!: Booking;
  room!: Room;
}

@Component({
  selector: 'app-room-dashboard',
  templateUrl: './room-dashboard.component.html',
  styleUrls: ['./room-dashboard.component.scss']
})
export class RoomDashboardComponent implements OnInit{

  constructor(private appService:AppService, private roomService: RoomsService,
    private bookingService: BookingService){}

  allRooms: Room[] = [];
  connectedBookings: Connected[] = [];

  bookedRanges:DateRange<Date>[] = [];

  ngOnInit(): void {
    /*this.appService.activeRoute.next('rooms');
    this.roomService.getRooms().then(() => {
      this.allRooms = this.roomService.roomArray;
      //this.compareRoomsWithBookings();
    });
    //this.bookedRanges = this.bookingService.getbookedRanges();
    console.log(this.bookedRanges);*/
  }

  /*compareRoomsWithBookings(){
    this.bookingService.getBookings().then(data => {
      data.forEach(booking => {
        let book = booking.data() as Booking;
        let room = this.allRooms.find(a => a.roomNo == book.roomNo);
        if(room){
          let newConnected:Connected = {room: room, booking: book};
          this.connectedBookings.push(newConnected);
        }
      })
    })
  }*/


}
