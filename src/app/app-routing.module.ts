import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './booking/calendar/calendar.component';
import { AdminBoardComponent } from './admin-board/admin-board.component';
import { LoginComponent } from './admin-board/login/login.component';
import { AuthGuardService } from './guards/auth.guard';
import { BookingsComponent } from './booking/bookings/bookings.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

const routes: Routes = [
  {path: 'calendar', component: CalendarComponent},
  {path: 'admin', component: AdminBoardComponent, canActivate: [AuthGuardService]},
  {path: 'login', component: LoginComponent},
  {path: 'bookings', component: BookingsComponent, canActivate: [AuthGuardService]},
  {path: 'home', component: HomePageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
