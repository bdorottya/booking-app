import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { DateRange } from '@angular/material/datepicker';
import { BookingService } from '../booking.service';
import { RoomsService } from 'src/app/rooms/rooms.service';
import { Room } from 'src/app/rooms/room.model';
import * as moment from 'moment';
import * as range from 'moment-range';
import { Booking } from '../booking.model';
import { Timestamp } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { CalendarConfirmComponent } from '../calendar-confirm/calendar-confirm.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { config } from 'process';



@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  constructor(private bookService: BookingService, private rService: RoomsService, private dialog: MatDialog,
    private snackBar: MatSnackBar) {}

  isLoading:boolean = false;
  selectedRangeValue: DateRange<Date> = new DateRange<Date>(new Date(), new Date());

  @Input() bookedRangeValues!: DateRange<Date>[];
  @Input() pendingRangeValues!: DateRange<Date>[];
  @Output() selectedRangeValueChange = new EventEmitter<DateRange<Date>>();

  @Input() room!:Room;
  @Input() mode:'View' | 'Booking' = 'Booking';
  @Input() background!:string;

  rooms: Room[] = [];

  date = new Date();
  today = new Date();

  weeksToShow: any[] = [];
  bookedDays: Date[] = [];
  bookedRanges: DateRange<Date>[] = [];

  pednginDays: Date[] = [];
  pendingRanges: DateRange<Date>[] = [];

  isDisabled: boolean = true;

  ngOnInit(): void {
    this.isLoading = true;
    this.weeksToShow = this.seperateIntoWeeks(this.get42Days(this.date.getFullYear(), this.date.getMonth()));
    this.countBookedDays(this.bookedRangeValues);
    console.log(this.bookedRangeValues, this.bookedDays);
    this.isLoading = false;
    this.rService.room$.subscribe(data =>{
      this.rooms.push(data);
    })
  }

  isToday(day:Date){
    return (day.getTime() === this.today.getTime());
  }

  countBookedDays(dates:DateRange<Date>[], pending:boolean=false){
    let bookedDays: Date[] = [];
    if(dates){
      dates.forEach(date => {
        if(date.end && date.start){
          let counter = date.end?.getDate() - date.start?.getDate()
          let dateToAdd = new Date(date.start);
          for(let i = 0; i < counter; i++){
            const newDate = new Date(dateToAdd);
            bookedDays.push(newDate);
            newDate.setDate(dateToAdd.getDate()+1);
            dateToAdd = newDate;
          }
        }
      })
      if(pending){
        this.pednginDays = bookedDays;
      }else{
        this.bookedDays = bookedDays;
      }
    }

  }

  isPending(date:Date):boolean{
    let found = this.pednginDays.filter(a => a.valueOf() == date.valueOf())[0];
    if(found){
      return true;
    }else{
      return false;
    }
  }

  isBooked(date:Date):boolean{
    let found = this.bookedDays.find(a => a.getTime() == date.getTime());
    if(found){
      return true;
    }
    else{
      return false;
    }
  }

  getDaysInMonth(year:number, month:number){
    let date = new Date(year,month+1,0);
    return date.getDate();
  }

  countDaysOfMonth(year:number, month:number){
    const days = this.getDaysInMonth(year,month);
    let daysOfMonth = [];
    for(let i = 1; i <= days; i++){
      let dateToAdd = new Date(year,month, i);
      daysOfMonth.push(dateToAdd);
    }
    return daysOfMonth;
  }

  findLastMonday(year:number,month:number){
    let mondays = [];
    const days = this.getDaysInMonth(year,month);
    for(let i = 1; i <= days; i++){
      let dateToAdd = new Date(year,month-1,i);
      if(dateToAdd.getDay() == 1){
        mondays.push(dateToAdd);
      }
    }
    return mondays[mondays.length-1];
  }

  get42Days(year:number,month:number){
    let days:Date[] = []
    let i = 0;
    let dateToAdd = this.findLastMonday(year,month)
    days.push(dateToAdd);
    for(let i = 0; i < 41; i++){
      const newDate = new Date(dateToAdd);
      newDate.setDate(dateToAdd.getDate()+1);
      days.push(newDate);
      dateToAdd = newDate;
    }
    return days;
  }

  seperateIntoWeeks(days:Date[]){
    let week: Date[] = [];
    let weeks: Date[][] = [];
    days.forEach(day => {
      week.push(day);
      if(day.getDay() == 0){
        weeks.push(week);
        week = [];
      }
    })
    return weeks;
  }

  nextMonth(){
    let nextMonth = new Date(this.date.getFullYear(), this.date.getMonth()+1,1);
    this.date = nextMonth;
    this.weeksToShow = this.seperateIntoWeeks(this.get42Days(nextMonth.getFullYear(),nextMonth.getMonth()));
  }
  prevMonth(){
    let nextMonth = new Date(this.date.getFullYear(), this.date.getMonth()-1,1);
    this.date = nextMonth;
    this.weeksToShow = this.seperateIntoWeeks(this.get42Days(nextMonth.getFullYear(),nextMonth.getMonth()));
  }


  selectedChange(m: any) {
    console.log('change');
    if (!this.selectedRangeValue?.start || this.selectedRangeValue?.end) {
        this.selectedRangeValue = new DateRange<Date>(m, null);
        this.isDisabled = true;
    } else {
        const start = this.selectedRangeValue.start;
        const end = m;
        if (end < start) {
            this.selectedRangeValue = new DateRange<Date>(end, start);
        } else {
            this.selectedRangeValue = new DateRange<Date>(start, end);
        }
        this.isDisabled = false;
        this.selectedRangeValueChange.emit(this.selectedRangeValue);
    }
    console.log(this.selectedRangeValue);
}

isSelected(day:Date){
  if(this.selectedRangeValue.start && this.selectedRangeValue.end){
    return (day >= this.selectedRangeValue.start  && day <= this.selectedRangeValue.end);
  }
  if(this.selectedRangeValue.start){
    return day.getTime() == this.selectedRangeValue.start.getTime();
  }
  return false;

}

continueToBooking(){
  const dialogRef = this.dialog.open(CalendarConfirmComponent, {
    width: '80%',
    height: '80%',
    data: {
      selectedRange: this.selectedRangeValue,
      rooms: this.rooms
    }
  });
  dialogRef.afterClosed().subscribe(mesg =>{
    this.selectedRangeValue = new DateRange<Date>(new Date(), new Date())
    this.snackBar.open(mesg,'OK', {horizontalPosition: 'center', verticalPosition: 'top'});
  })

}





}
