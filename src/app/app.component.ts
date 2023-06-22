import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { User } from './user/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AppService } from './app.service';
import { Observable, Subscription } from 'rxjs';
import { Auth } from '@angular/fire/auth';
import { AdminService } from './admin-board/admin.service';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { LoginComponent } from './admin-board/login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'booking-client';

  searchForm = new UntypedFormGroup({
    search: new UntypedFormControl('')
  })

  currentUser:User = new User();
  isAuth:boolean = false;


  constructor(private af: AngularFirestore, private auth: Auth, private router: Router,
    private adminService: AdminService, ){

  }

  ngOnInit(): void {
    this.getUser();
    if(this.adminService.isAuthenticated()){
      this.isAuth = true;
    }
  }



  logOut(){
    localStorage.removeItem("uid");
    localStorage.removeItem("email");
    this.auth.signOut().then(() => {
      this.isAuth = false;
      this.router.navigate(['/home']);
    })
  }


  search(){}

  async getUser(){
    const uid = localStorage.getItem("uid") as string;
    console.log(uid);
    const db = this.af.collection('users');
    if(uid){
      console.log(uid);
      let userRef = db.doc(uid);
      userRef.get().subscribe((doc) => {
        if(doc.exists){
          console.log(doc.data());
          this.currentUser.email = doc.get('email');
          this.currentUser.name = doc.get('name');
        }
      })
    }
  }
}
