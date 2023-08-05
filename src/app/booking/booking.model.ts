import { Timestamp } from "@angular/fire/firestore";

export class Booking{
  id!:string;
  roomNo!: string;
  arrivalDate!: Date;
  departureDate!: Date;
  guestName!: string;
  guestEmail!: string;
  numberOfGuests!: number;
  bookingStatus!: 'Pending' | 'Accepted' | 'Declined' | 'Archived';
  guestPhone?: number;
  price?: number;
  bookingDate!:  Date;
  address!: {
    city:string;
    zip:string;
    street:string;
  }
  personalInfo!: {
    idCardType: string;
    idCardNo: string;
  }
  bookingUpdated?:boolean;


  constructor(){

  }


}
