import { Component, OnInit } from '@angular/core';
import { RoomsService } from '../rooms.service';
import { Room } from '../room.model';
import { QuerySnapshot } from '@angular/fire/firestore';
import { BookingService } from 'src/app/booking/booking.service';
import { DateRange } from '@angular/material/datepicker';

@Component({
  selector: 'app-all-rooms',
  templateUrl: './all-rooms.component.html',
  styleUrls: ['./all-rooms.component.scss']
})
export class AllRoomsComponent implements OnInit{

  bookedRange:DateRange<Date> = new DateRange(new Date(), new Date());

  constructor(private roomService: RoomsService, private bookService: BookingService){

  }

  rooms:Room[] = [];

  ngOnInit(): void {
    this.roomService.getRooms();
    this.rooms = this.roomService.roomArray;
  }



}
