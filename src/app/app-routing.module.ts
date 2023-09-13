import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './booking/calendar/calendar.component';
import { AdminBoardComponent } from './admin-board/admin-board.component';
import { LoginComponent } from './admin-board/login/login.component';
import { AuthGuardService } from './guards/auth.guard';
import { BookingsComponent } from './booking/bookings/bookings.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AllRoomsComponent } from './rooms/all-rooms/all-rooms.component';
import { RoomDashboardComponent } from './rooms/room-dashboard/room-dashboard.component';
import { CheckInComponent } from './booking/check-in/check-in.component';

const routes: Routes = [
  {path: 'calendar', component: CalendarComponent},
  {path: 'admin', component: AdminBoardComponent, canActivate: [AuthGuardService]},
  {path: 'login', component: LoginComponent},
  {
    path: 'bookings',
    loadChildren: () => import('./booking/booking.module').then(m => m.BookingModule)
  },
  {path: 'home', component: HomePageComponent},
  {path: 'rooms', component: AllRoomsComponent},
  {path: 'admin/rooms', component: RoomDashboardComponent, canActivate: [AuthGuardService]},
  {path: 'checkin', component: CheckInComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
