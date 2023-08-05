import { AuthGuardService } from './guards/auth.guard';
import { AngularFireModule } from '@angular/fire/compat';
import { BookingsComponent } from './booking/bookings/bookings.component';
import { BookingModule } from './booking/booking.module';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MenuComponent } from './navigation/menu/menu.component';
import { CommonModule } from '@angular/common';


import {MatButtonModule} from '@angular/material/button';
import { AdminBoardModule } from './admin-board/admin-board.module';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatDialogModule} from '@angular/material/dialog';
import { RoomsModule } from './rooms/rooms.module';
import { HeaderComponent } from './navigation/header/header.component';
import { MessageComponent } from './utils/message/message.component';
import { SelectChangeDirective } from './select-change.directive';





@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    MenuComponent,
    HeaderComponent,
    MessageComponent,
    SelectChangeDirective,
  ],
  imports: [
    FormsModule,
   BrowserModule,
   CommonModule,
   BrowserAnimationsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    AdminBoardModule,
    BookingModule,
    RoomsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatDialogModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatButtonModule,
    FullCalendarModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }


