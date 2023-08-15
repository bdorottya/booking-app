import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { BookingService } from '../booking.service';
import { Observable, map} from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { BookingDetailComponent } from '../booking-detail/booking-detail.component';
import { Booking } from '../booking.model';
import { DatePipe } from '@angular/common';
import { Firestore, Timestamp } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NewBookingComponent } from '../new-booking/new-booking.component';
import { RoomsService } from 'src/app/rooms/rooms.service';
import { Room } from 'src/app/rooms/room.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit, OnDestroy {

  constructor(private appService: AppService, private bookingService: BookingService,
    private datePipe: DatePipe, private roomService: RoomsService, private snackBar: MatSnackBar) {
    }
  ngOnDestroy(): void {
    //this.bookingService.allBooking$.unsubscribe();
    //this.roomService.room$.unsubscribe();
  }


  allBooking$!: Observable<Booking[]>;
  activeBookings: Booking[] = [];
  rooms: Room[] = [];




  ngOnInit(): void {
    this.appService.activeRoute.next('/bookings');
    this.allBooking$ = this.bookingService.getBookings();
    this.getActiveBookings();
    this.roomService.room$.subscribe(data =>{
      this.rooms = [...this.rooms, data];
    })
    /*console.log(this.allBooking);
    this.appService.activeRoute.next('bookings');
    //this.getAllBookings();
    this.bookingService.getBookings().pipe(map(bookings =>{
      bookings.forEach(doc =>{
        let booking = doc as Booking;
        booking.arrivalDate = (booking.arrivalDate as unknown as Timestamp).toDate();
        booking.departureDate = (booking.departureDate as unknown as Timestamp).toDate();
        booking.bookingDate = (booking.bookingDate as unknown as Timestamp).toDate();
        this.allBooking = [...this.allBooking, booking];
      })
    })).subscribe(() =>{
      console.log('collection changed');
    })*/


  }

  /*getAllBookings(){
    this.bookingService.getBookings().then(data => {
      data.forEach(doc => {
        let newBooking:Booking = new Booking();
        newBooking = doc.data() as Booking;
        newBooking.id = doc.id;
        newBooking.arrivalDate = (newBooking.arrivalDate as unknown as Timestamp).toDate();
        newBooking.departureDate = (newBooking.departureDate as unknown as Timestamp).toDate();
        newBooking.bookingDate = (newBooking.bookingDate as unknown as Timestamp).toDate();
        this.allBooking.push(newBooking);
      })
    }).then(d => {
      this.getActiveBookings();
    })
  }*/

  getActiveBookings(){
    let currentDate = new Date();
    this.allBooking$.pipe(map(array =>{
      this.activeBookings = array.filter(booking => booking.arrivalDate > currentDate && booking.departureDate < currentDate);
      console.log(this.activeBookings);
    }));
    /*this.allBooking.forEach(booking => {
      if(booking.arrivalDate <= currentDate && booking.departureDate >= currentDate){
        this.activeBookings.push(booking);
      }
    })*/
  }

  remainingDay(booking:Booking){
    const currentDate = new Date();
    let bookingLength = booking.departureDate.getTime() - booking.arrivalDate.getTime();
    let remainigDays = (booking.departureDate.getTime() - currentDate.getTime());
    return 100 - ((100*remainigDays) / bookingLength);
  }

}
