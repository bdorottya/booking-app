import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { BookingService } from '../booking.service';
import { Observable, ReplaySubject } from 'rxjs';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { BookingDetailComponent } from '../booking-detail/booking-detail.component';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {

  constructor(private appService: AppService, private bookingService: BookingService,
    private dialog: MatDialog) { }

  isLoading:boolean = false;

  pendingBookings:ReplaySubject<{id:any, data:any}> = new ReplaySubject();
  acceptedBookings:ReplaySubject<{id:any, data:any}> = new ReplaySubject();

  pendings: any[] = [];
  accepted: any[] = [];

  allBooking: any[] = [];

  ngOnInit(): void {
    this.appService.activeRoute.next('bookings');
    this.isLoading = true;
    this.bookingService.getBookings().then(data => {
      data.forEach(doc => {
        this.allBooking.push(doc.data());
      })
    })
    this.pendingBookings.subscribe(obs => {
      this.pendings.push(obs);
    })
    this.acceptedBookings.subscribe(obs => {
      console.log('new value');
      this.accepted.push(obs);
    })
    this.bookingService.getPendingBookings().then(data => {
      data.forEach(doc => {
        this.pendingBookings.next({ 'id': doc.id, 'data': doc.data() });
      })
    })
    this.bookingService.getActiveBookings().then(data => {
      data.forEach(doc => {
        this.acceptedBookings.next({'id': doc.id, 'data': doc.data()});
      })
      this.isLoading = false;
    })
  }

  acceptBooking(bookingId:string){
    this.isLoading = true;
    console.log(bookingId);
    this.bookingService.changeBookingStatus(bookingId, 'Accepted').then(data => {
      this.pendings.forEach(booking => {
        if(booking.id == bookingId){
          this.acceptedBookings.next(booking);
        }
      })
      let removable = this.pendings.findIndex(element => element.id === bookingId);
      console.log(removable);
      if(removable > -1){
        this.pendings.splice(removable,1);
      }
      console.log(this.pendings);
      this.isLoading = false;
    })
  }

  bookingDetails(booking:any){
    this.dialog.open(BookingDetailComponent);
  }

}
