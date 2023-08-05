import { Component, OnInit } from '@angular/core';
import { Booking } from '../booking.model';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.scss']
})
export class CheckInComponent implements OnInit{

  constructor(private router: Router){
    console.log(this.router.getCurrentNavigation()?.extras.state);
  }

  booking:Booking = new Booking();

  checkInForm: FormGroup = new FormGroup({
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
      this.booking = history.state as unknown as Booking;
      this.checkInForm.get('guestName')?.setValue(this.booking.guestName);
      this.checkInForm.get('guestEmail')?.setValue(this.booking.guestEmail);
      this.checkInForm.get('guestPhone')?.setValue(this.booking.guestPhone);
      this.checkInForm.get('guestCity')?.setValue(this.booking.address?.city);
      this.checkInForm.get('guestZip')?.setValue(this.booking.address?.zip);
      this.checkInForm.get('guestStreet')?.setValue(this.booking.address?.street);
      this.checkInForm.get('guestIdCard')?.setValue(this.booking.personalInfo?.idCardType);
      this.checkInForm.get('guestIdNumber')?.setValue(this.booking.personalInfo?.idCardNo);
      this.checkInForm.get('numberOfGuests')?.setValue(this.booking.numberOfGuests);
      this.checkInForm.get('arrivalDate')?.setValue(this.booking.arrivalDate.toDateString());
      this.checkInForm.get('departureDate')?.setValue(this.booking.departureDate.toDateString());
      this.checkInForm.get('roomNo')?.setValue(this.booking.roomNo);

  }


  openQRDialog(){

  }

}
