import { Injectable } from '@angular/core';
import { User } from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }

  user$ = new BehaviorSubject<User | undefined>(undefined);

  activeRoute = new BehaviorSubject('');
}
