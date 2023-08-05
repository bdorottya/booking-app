import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomsComponent } from './rooms.component';
import { AllRoomsComponent } from './all-rooms/all-rooms.component';
import { OneRoomComponent } from './one-room/one-room.component';
import { MatButtonModule } from '@angular/material/button';
import { RoomDashboardComponent } from './room-dashboard/room-dashboard.component';
import { RoomDetailComponent } from './room-detail/room-detail.component';
import {MatTabsModule} from '@angular/material/tabs';
import { BookingModule } from '../booking/booking.module';



@NgModule({
  declarations: [
    RoomsComponent,
    AllRoomsComponent,
    OneRoomComponent,
    RoomDashboardComponent,
    RoomDetailComponent,

  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatTabsModule,
    BookingModule
  ]
})
export class RoomsModule { }
