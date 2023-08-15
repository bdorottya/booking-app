import { Component, Input, OnChanges, OnInit, SimpleChanges, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateRange } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
import { RoomsService } from 'src/app/rooms/rooms.service';
import { Room } from 'src/app/rooms/room.model';
import { Booking } from '../booking.model';
import { BookingService } from '../booking.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-calendar-confirm',
  templateUrl: './calendar-confirm.component.html',
  styleUrls: ['./calendar-confirm.component.scss']
})
export class CalendarConfirmComponent implements OnInit, OnChanges{

  constructor(private date: DatePipe, private bookingService: BookingService,
    @Inject(MAT_DIALOG_DATA) public data: {selectedRange: DateRange<Date>, rooms: Room[]},
    private dialogRef: MatDialogRef<CalendarConfirmComponent>){
      this.selectableRooms = this.data.rooms;
      this.selectedRange = this.data.selectedRange;
    }

  @Input() selectedRange?:DateRange<Date>;
  @Input() selectableRooms?:Room[];
  @Input() roomId?:string;

  isDisabled:boolean = true;

  bookingForm:FormGroup = new FormGroup({
    guestName: new FormControl('', Validators.required),
    guestEmail: new FormControl('', Validators.required),
    guestPhone: new FormControl(''),
    numberOfGuests: new FormControl('', Validators.required),
    roomNo: new FormControl('', Validators.required),
    arrivalDate: new FormControl('', Validators.required),
    departureDate: new FormControl('', Validators.required),
    bookingDate: new FormControl(''),
  })

  ngOnInit(): void {
    if(this.roomId){
      this.bookingForm.get('roomNo')?.setValue(this.roomId);
    }
    this.bookingForm.get('arrivalDate')?.setValue(this.date.transform(this.selectedRange?.start, 'yyyy.MM.dd'));
    this.bookingForm.get('departureDate')?.setValue(this.date.transform(this.selectedRange?.end, 'yyyy.MM.dd'));

  }

  ngOnChanges(changes: SimpleChanges): void {
      if(changes['selectedRange'].currentValue){
        if(changes['selectedRange'].currentValue.start){
          this.bookingForm.get('arrivalDate')?.setValue(this.date.transform(this.selectedRange?.start, 'yyyy.MM.dd'));
        }
        if(changes['selectedRange'].currentValue.end){
          this.bookingForm.get('departureDate')?.setValue(this.date.transform(this.selectedRange?.end, 'yyyy.MM.dd'));
        }
      }
  }

  startBooking(){
    if(this.bookingForm.valid){
      let booking = new Booking();
      booking.arrivalDate = new Date(this.bookingForm.get('arrivalDate')?.value);
      booking.departureDate = new Date(this.bookingForm.get('departureDate')?.value);
      booking.guestEmail = this.bookingForm.get('guestEmail')?.value;
      booking.guestName = this.bookingForm.get('guestName')?.value;
      booking.guestPhone = this.bookingForm.get('guestPhone')?.value ? this.bookingForm.get('guestPhone')?.value : '';
      booking.numberOfGuests = this.bookingForm.get('numberOfGuests')?.value;
      booking.roomNo = this.bookingForm.get('roomNo')?.value;
      booking.bookingStatus = 'Pending';
      booking.bookingDate = new Date();

      let bookingToSend = Object.assign({}, booking);

      this.bookingService.newBooking(bookingToSend).then(data => {
        this.dialogRef.close('Booking added successfully!');
        this.bookingForm.reset();
      }).catch(err => {
        console.log(err);
      })
    }
  }

  goBack(){
    this.dialogRef.close();
  }

}
