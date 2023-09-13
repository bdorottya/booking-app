import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookingsComponent } from './bookings/bookings.component';
import { WeeklyViewComponent } from './weekly-view/weekly-view.component';


const routes: Routes = [
  {
    path: '',
    component: BookingsComponent
  },
  {path: 'weekly-view', component: WeeklyViewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRoutingModule { }
