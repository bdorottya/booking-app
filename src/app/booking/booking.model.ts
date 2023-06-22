import { Room } from "../rooms/room.model";

export class Booking{
  roomNo!: string;
  arrivalDate!: Date;
  departureDate!: Date;
  guestName!: string;
  guestEmail!: string;
  numberOfGuests!: number;
  bookingStatus!: 'Pending' | 'Accepted' | 'Declined' | 'Archived';
  guestPhone?: number;
  price?: number;
}
