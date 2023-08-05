import { Injectable } from '@angular/core';
import { AngularFirestore, QuerySnapshot } from '@angular/fire/compat/firestore';
import { Room } from './room.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  constructor(private af: AngularFirestore) {
    this.getRooms();
   }

  room$: Subject<Room> = new Subject<Room>();

  roomArray:Room[] = [];

  getRooms(){
    this.roomArray = [];
    const db = this.af.collection('rooms');
    db.ref.get().then(data => {
      data.forEach(room =>{
        let roomData = room.data() as Room;
        this.room$.next(roomData);
      })
    })

  }

  async getOneRoom(roomId:string){
    const db = this.af.collection('rooms');
    return await db.ref.where('roomNo', '==', roomId).get();
  }




}
