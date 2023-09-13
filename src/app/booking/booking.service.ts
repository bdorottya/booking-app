import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Booking } from './booking.model';
import { Firestore, Timestamp, collection, collectionData } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, Subject, filter, map } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';



@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private af: AngularFirestore, private db: Firestore, private router: Router, private snackBar: MatSnackBar) {
    this.af.collection('bookings').stateChanges().subscribe(obs =>{
      if(obs.length == 1 && obs[0].type == 'added'){
        this.snackBar.open('New Booking!', 'View', {panelClass: 'new-booking', verticalPosition: 'top',
          duration: 4000});
      }
    })

  }

  bookingSnapshot = this.af.collection('bookings').stateChanges();
  allBooking$: Subject<Booking[]> = new Subject<Booking[]>();
  bookingRef: AngularFirestoreCollection = this.af.collection('booking');

  getBookings(): Observable<Booking[]>{
    const ref = collection(this.db, 'bookings');
    const data = collectionData(ref, {
      idField: 'id',
    })
    return data as Observable<Booking[]>;
  }

 async newBooking(booking:Booking){
    const db = this.af.collection('bookings');
    db.doc().set(booking).then(() =>{
      this.allBooking$.next([booking]);
      this.refreshData();
    });
  }

  refreshData(){
    this.getBookings();
  }
  /*getbookedRanges(){
    let booked: DateRange<Date>[] = [];
    this.getBookings();

    .then(data => {
      data.forEach(doc => {
        let booking = doc.data() as Booking;
        if(booking.bookingStatus == 'Accepted'){
          let range: DateRange<Date> = new DateRange((booking.arrivalDate as unknown as Timestamp).toDate(), (booking.departureDate as unknown as Timestamp).toDate());
          booked.push(range);
        }
      })
    })
    return booked;
  }*/


  async updateBooking(bookingId:string, bookingData:Booking){
    const db = this.af.collection('bookings');
    return db.doc(bookingId).ref.update(Object.assign({}, bookingData));
  }

  async changeBookingStatus(bookingId:string, newStatus:string){
    const doc = this.af.collection('bookings').doc(bookingId);
    return doc.ref.update({'bookingStatus': newStatus});
  }


  /*convertBookingDatesToRanges(roomNo:string){
    let bookedRanges: DateRange<Date>[] = [];
    this.getBookings().then(data => {
      data.forEach(doc => {
        let newBooking = doc.data() as Booking;
        if(newBooking.roomNo == roomNo){
          let range: DateRange<Date> = new DateRange((newBooking.arrivalDate as unknown as Timestamp).toDate(),
          (newBooking.departureDate as unknown as Timestamp).toDate());
          bookedRanges.push(range);
        }
      })
    })
    return bookedRanges;
  }*/
}
