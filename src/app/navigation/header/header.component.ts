import { Component, Input, OnInit, Output } from '@angular/core';
import { Auth, User, onAuthStateChanged } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() isAuth:boolean = false;


  searchForm = new FormGroup({
    search: new FormControl('')
  })

  currentUser!:User;

  constructor(private af: AngularFirestore, private auth: Auth, private router: Router, private appService:
    AppService){}

  ngOnInit(): void {
      onAuthStateChanged(this.auth, (user => {
        if(user){
          this.isAuth = true;
          this.getUser();
        }
      }))
      this.appService.user$.subscribe(user =>{
        if(user) this.currentUser = user;
        console.log(this.currentUser);
      })
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
    const db = this.af.collection('users');
    if(uid){
      let userRef = db.doc(uid);
      userRef.get().subscribe((doc) => {
        if(doc.exists){
          this.currentUser = doc.data() as User;
        }
      })
    }
  }

}
