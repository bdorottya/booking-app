import { Component, Input, OnInit } from '@angular/core';
import { Observable, filter, map, of, switchMap } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { Room } from 'src/app/rooms/room.model';
import { RoomsService } from 'src/app/rooms/rooms.service';
import { BookingService } from '../booking.service';
import { Booking } from '../booking.model';
import { Timestamp } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { BookingDetailComponent } from '../booking-detail/booking-detail.component';

@Component({
  selector: 'app-weekly-view',
  templateUrl: './weekly-view.component.html',
  styleUrls: ['./weekly-view.component.scss']
})
export class WeeklyViewComponent implements OnInit{

  constructor(private appService: AppService, private roomService: RoomsService, private bookingService:
    BookingService, private dialog:MatDialog){}

  rooms!: Observable<Room[]>;
  week:Date[] = [];
  currentDate : Date = new Date();
  today = new Date();

  bookings: Observable<Booking[]> = new Observable<Booking[]>();

  ngOnInit(): void {
    console.log(this.today);
    this.appService.activeRoute.next('/weekly');
    this.rooms = this.roomService.getRooms();
    this.week = this.getWeek(this.currentDate);
    this.bookings = this.bookingService.getBookings();
  }

  insideBooking(date:Date, booking:Booking){
    return this.dateConverter(booking.arrivalDate) <= date && this.dateConverter(booking.departureDate) >= date ? true : false;
  }

  getWeek(day: Date){
    let days:Date[] = [];
    days.push(day);
    for(let i = 0; i < 6; i++){
      const newDate = new Date(day);
      newDate.setDate(day.getDate()+1);
      days.push(newDate);
      day = newDate;
    }
    console.log(days[0]);
    return days;
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

  nextWeek(){
    const newDate = new Date(this.currentDate);
    newDate.setDate(this.currentDate.getDate()+7);
    console.log(newDate);
    this.currentDate = newDate;
    this.week = this.getWeek(newDate);
  }

  prevWeek(){
    const newDate = new Date(this.currentDate);
    newDate.setDate(this.currentDate.getDate()-7);
    console.log(newDate);
    this.currentDate = newDate;
    this.week = this.getWeek(newDate);
  }

  dateConverter(date:Date){
    return (date as unknown as Timestamp).toDate()
  }

  /*this.allBooking$.pipe(map(array =>{
    this.activeBookings = array.filter(booking => booking.arrivalDate > currentDate && booking.departureDate < currentDate);
    console.log(this.activeBookings);*/

  getBookingsForRoom(roomNo:string) : Observable<Booking[]>{
    const bookings = this.bookingService.getBookings();
    return bookings.pipe(
      map(array => array.filter(booking => booking.roomNo == roomNo && booking.bookingStatus == 'Accepted')),
      map((array:Booking[]) => {
        return array;
      })
    )

  }


}
