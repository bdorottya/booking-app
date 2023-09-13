import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Room } from '../room.model';
import { RoomsService } from '../rooms.service';
import { BookingService } from 'src/app/booking/booking.service';
import { Timestamp } from '@angular/fire/firestore';
import { DateRange } from '@angular/material/datepicker';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-room-dashboard',
  templateUrl: './room-dashboard.component.html',
  styleUrls: ['./room-dashboard.component.scss']
})
export class RoomDashboardComponent implements OnInit{

  constructor(private appService:AppService, private roomService: RoomsService,
    private bookingService: BookingService){}

  allRooms: Observable<Room[]> = new Observable<Room[]>();


  bookedRanges:DateRange<Date>[] = [];

  ngOnInit(): void {
    this.appService.activeRoute.next('rooms');
    this.allRooms = this.roomService.getRooms();

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
