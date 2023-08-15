import { Component, Input, OnInit } from '@angular/core';
import { Booking } from '../booking.model';
import { BookingService } from '../booking.service';
import { Observable, filter, forkJoin, map, switchMap } from 'rxjs';
import { Timestamp } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { BookingDetailComponent } from '../booking-detail/booking-detail.component';
import { Room } from 'src/app/rooms/room.model';

@Component({
  selector: 'app-active-bookings',
  templateUrl: './active-bookings.component.html',
  styleUrls: ['./active-bookings.component.scss']
})
export class ActiveBookingsComponent implements OnInit {

  constructor(private bookingService: BookingService, private dialog: MatDialog){}


  @Input() bookings$!: Observable<Booking[]>;
  @Input() rooms!: Room[];

  activeBookings$!: Observable<Booking[]>;
  length!:number;



  ngOnInit(): void {
    this.bookings$.subscribe(obs =>{
      this.activeBookings$ = this.mapActiveBookings();
      this.activeBookings$.subscribe(data => this.length = data.length);
    })
  }

  mapActiveBookings(): Observable<Booking[]>{
    let currentDate = new Date();
    return this.bookings$.pipe(
      map((bookings: Booking[]) => bookings.filter(booking =>
      (booking.arrivalDate as unknown as Timestamp).toDate() <= currentDate &&
      (booking.departureDate as unknown as Timestamp).toDate() >= currentDate)))
  }

  bookingDetails(booking:Booking, active: boolean){
    let dialog = this.dialog.open(BookingDetailComponent, {
      width: '60%',
      data: {rooms: this.rooms, active: active}
    });
    dialog.componentInstance.booking = booking;
    dialog.afterClosed().subscribe(data => {
      if(data === 'Status Changed'){

      }
    })
  }

  archiveBooking(book:Booking){
    this.bookingService.changeBookingStatus(book.id, 'Archived').then(() =>{

    })
  }


  dateConverter(date:Date){
    return (date as unknown as Timestamp).toDate()
  }

  progress(date1:Date, date2:Date){
    let fullDate = this.dateConverter(date2).getDate() - this.dateConverter(date1).getDate();
    let currentDate = new Date();
    let currentProgress = currentDate.getDate() - this.dateConverter(date1).getDate()
    return (currentProgress / fullDate)*100;
  }

}
