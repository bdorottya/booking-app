import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { User } from './user/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AppService } from './app.service';
import { Observable, Subscription } from 'rxjs';
import { Auth } from '@angular/fire/auth';
import { AdminService } from './admin-board/admin.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './admin-board/login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'booking-client';


  isAuth:boolean = false;
  currentUser:User = new User();


  constructor(private af: AngularFirestore, private auth: Auth, private router: Router,
    private adminService: AdminService, ){

  }

  ngOnInit(): void {

  }



}
