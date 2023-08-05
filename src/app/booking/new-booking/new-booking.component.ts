import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Room } from 'src/app/rooms/room.model';
import { RoomsService } from 'src/app/rooms/rooms.service';
import { Booking } from '../booking.model';
import { BookingService } from '../booking.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-booking',
  templateUrl: './new-booking.component.html',
  styleUrls: ['./new-booking.component.scss']
})
export class NewBookingComponent implements OnInit {

  constructor(private roomService: RoomsService, private bookingService: BookingService,
    private matDialogRef: MatDialogRef<NewBookingComponent>, @Inject(MAT_DIALOG_DATA) public data: {rooms: Room[]}){}

  bookingForm:FormGroup = new FormGroup({
    guestName: new FormControl('', Validators.required),
    guestEmail: new FormControl('', Validators.required),
    guestPhone: new FormControl(''),
    numberOfGuests: new FormControl('', Validators.required),
    roomNo: new FormControl(''),
    arrivalDate: new FormControl('', Validators.required),
    departureDate: new FormControl('', Validators.required),
  })

  selectableRooms:Room[] = [];

  ngOnInit():void{
    this.selectableRooms = this.data.rooms;
  }

  submit(){
    if(this.bookingForm.valid){
      const newBooking = this.bookingForm.getRawValue() as Booking
      newBooking.bookingDate = new Date();
      newBooking.bookingStatus = 'Accepted';
      this.bookingService.newBooking(newBooking).then(val => {
        console.log("saved");
        this.matDialogRef.close(newBooking);
      })
      .catch(err => console.log(err));
      }
  }

  close(){
    this.matDialogRef.close();
  }

}
