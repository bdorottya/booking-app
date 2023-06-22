import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private af: AngularFirestore) { }

  async getBookings(){
    const db = this.af.collection('bookings');
    return await db.ref.get();
  }


  async getPendingBookings(){
    const db = this.af.collection('bookings');
    return await db.ref.where('bookingStatus', '==', 'Pending').get()
  }

  async getActiveBookings(){
    const db = this.af.collection('bookings');
    return await db.ref.where('bookingStatus', '==', 'Accepted').get()
  }

  async changeBookingStatus(bookingId:string, newStatus:string){
    const doc = this.af.collection('bookings').doc(bookingId);
    return doc.ref.update({'bookingStatus': newStatus});
  }
}
