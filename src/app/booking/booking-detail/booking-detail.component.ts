import { Component, Inject, OnInit } from '@angular/core';
import { Booking } from '../booking.model';
import { Room } from 'src/app/rooms/room.model';
import { RoomsService } from 'src/app/rooms/rooms.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventEmitter } from 'stream';
import { MatSelectChange } from '@angular/material/select';
import { BookingService } from '../booking.service';
import { Router } from '@angular/router';
import { Timestamp } from '@angular/fire/firestore';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-booking-detail',
  templateUrl: './booking-detail.component.html',
  styleUrls: ['./booking-detail.component.scss']
})
export class BookingDetailComponent implements OnInit {

  constructor(private roomService: RoomsService, private matDialogRef: MatDialogRef<BookingDetailComponent>,
    private bookingService: BookingService, private router: Router, @Inject(MAT_DIALOG_DATA)
    public data: {rooms: Room[], active: boolean}, private datePipe: DatePipe) {
      this.allRooms = this.data.rooms;
      this.isActive = this.data.active;
     }

  booking:Booking = new Booking();
  room:Room = new Room;

  allRooms:Room[];
  isActive:boolean;

  mode:string = '';

  editBookingForm:FormGroup = new FormGroup({
    guestName: new FormControl('', Validators.required),
    guestEmail: new FormControl('', Validators.required),
    guestPhone: new FormControl(''),
    guestCity: new FormControl(''),
    guestZip: new FormControl(''),
    guestStreet: new FormControl(''),
    guestIdCard: new FormControl(''),
    guestIdNumber: new FormControl(''),
    numberOfGuests: new FormControl('', Validators.required),
    roomNo: new FormControl('', Validators.required),
    arrivalDate: new FormControl('', Validators.required),
    departureDate: new FormControl('', Validators.required),
  })

  ngOnInit(): void {
    this.roomService.getOneRoom(this.booking.roomNo).then(data => {
      this.room = data.docs[0].data() as Room;
    })
  }

  changeRoomDetails(event: MatSelectChange){
    const selectedRoom = event.value;
    let room = this.allRooms.filter(room => room.roomNo == selectedRoom)[0];
    this.room = room;
  }

  acceptBooking(){
    this.bookingService.changeBookingStatus(this.booking.id, 'Accepted').then(data => {
      this.matDialogRef.close('Status Changed');
    })
  }

  declineBooking(){

  }

  dateConverter(date:Date){
    return (date as unknown as Timestamp).toDate()
  }

  edit(){
    this.mode = 'edit';
    this.editBookingForm.get('guestName')?.setValue(this.booking.guestName);
    this.editBookingForm.get('guestEmail')?.setValue(this.booking.guestEmail);
    this.editBookingForm.get('guestPhone')?.setValue(this.booking.guestPhone);
    this.editBookingForm.get('guestCity')?.setValue(this.booking.address?.city);
    this.editBookingForm.get('guestZip')?.setValue(this.booking.address?.zip);
    this.editBookingForm.get('guestStreet')?.setValue(this.booking.address?.street);
    this.editBookingForm.get('guestIdCard')?.setValue(this.booking.personalInfo?.idCardType);
    this.editBookingForm.get('guestIdNumber')?.setValue(this.booking.personalInfo?.idCardNo);
    this.editBookingForm.get('numberOfGuests')?.setValue(this.booking.numberOfGuests);
    this.editBookingForm.get('arrivalDate')?.setValue((this.booking.arrivalDate as unknown as Timestamp).toDate());
    this.editBookingForm.get('departureDate')?.setValue((this.booking.departureDate as unknown as Timestamp).toDate());
    this.editBookingForm.get('roomNo')?.setValue(this.booking.roomNo);
  }

  saveForm(){
    const updatedBooking:Booking = new Booking();
    const form = this.editBookingForm;
    updatedBooking.address = {city: '', zip: '', street: ''}
    updatedBooking.personalInfo = {idCardNo: '', idCardType: ''}
    updatedBooking.guestName = form.get('guestName')?.value;
    updatedBooking.guestEmail = form.get('guestEmail')?.value;
    updatedBooking.guestPhone = form.get('guestPhone')?.value ? form.get('guestPhone')?.value : '';
    updatedBooking.address.city = form.get("guestCity")?.value ? form.get('guestCity')?.value : '';
    updatedBooking.address.zip = form.get("guestZip")?.value ? form.get("guestZip")?.value : '';
    updatedBooking.address.street = form.get("guestStreet")?.value ? form.get("guestStreet")?.value : '';
    updatedBooking.personalInfo.idCardType = form.get('guestIdCard')?.value ? form.get('guestIdCard')?.value : '';
    updatedBooking.personalInfo.idCardNo = form.get('guestIdNumber')?.value ? form.get('guestIdNumber')?.value : '';

    updatedBooking.arrivalDate = new Date(form.get('arrivalDate')?.value);
    updatedBooking.departureDate = new Date(form.get('departureDate')?.value);


    console.log(updatedBooking);
    this.bookingService.updateBooking(this.booking.id, updatedBooking).then(data => {
      this.mode = '';
      this.matDialogRef.close('Status Changed');
    });


  }

  checkIn(){
    this.matDialogRef.close();
    this.router.navigateByUrl('/checkin', {state: this.booking});
  }

  back(){
    this.mode = '';
  }

  close(){
    this.matDialogRef.close();
  }

}
