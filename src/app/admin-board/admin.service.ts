import { Injectable } from '@angular/core';
import { Auth, UserInfo, getAuth, onAuthStateChanged, signInWithEmailAndPassword } from '@angular/fire/auth';
import { User } from '../user/user.model';
import { AppService } from '../app.service';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private auth: Auth, private appService: AppService ) {
    onAuthStateChanged(this.auth, (user => {
      if(user){
        console.log(user.uid);
        console.log(user.email);
        if(user.email){
          this.currentUserEmail = user.email;
        }
        this.appService.user$.next(user);
      }
    }))
  }

  currentUserEmail!:string;


  isAuthenticated(){
    const email = localStorage.getItem('uid');
    if(email) return true;
    return false;
  }

  getUser(){
    return this.currentUserEmail;
  }


  adminLogin(email:string, password: string){
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password).then((userCreds) => {
      const user = userCreds.user;
      this.appService.user$.next(user);
      if(user.email){
        localStorage.setItem('email', user.email);
        localStorage.setItem('uid', user.uid);
      }
    }).catch(err => {
      alert('user not found');
    })
  }
}
