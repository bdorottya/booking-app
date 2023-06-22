import { Component, OnInit } from '@angular/core';
import { AdminService } from './admin.service';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { User } from '../user/user.model';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import { AppService } from '../app.service';

@Component({
  selector: 'app-admin-board',
  templateUrl: './admin-board.component.html',
  styleUrls: ['./admin-board.component.scss']
})
export class AdminBoardComponent implements OnInit {

  constructor(private adminService: AdminService, private af: AngularFirestore, private appService: AppService) { }

  searchForm = new UntypedFormGroup({
    search: new UntypedFormControl('')
  })

  currentUser:User = new User();

  ngOnInit(): void {
    this.appService.activeRoute.next('admin');
    this.getUser();
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
