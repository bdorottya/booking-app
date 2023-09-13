import { Injectable } from '@angular/core';
import { AngularFirestore, QuerySnapshot } from '@angular/fire/compat/firestore';
import { Room } from './room.model';
import { Observable, Subject } from 'rxjs';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  constructor(private af: AngularFirestore, private db: Firestore) {
    this.getRooms();
   }

  room$: Subject<Room[]> = new Subject<Room[]>();

  roomArray:Room[] = [];

  getRooms(): Observable<Room[]>{
    this.roomArray = [];
    const ref = collection(this.db, 'rooms');
    const data = collectionData(ref, {
      idField: 'id',
    })
    return data as Observable<Room[]>;

  }

  async getOneRoom(roomId:string){
    const db = this.af.collection('rooms');
    return await db.ref.where('roomNo', '==', roomId).get();
  }




}
