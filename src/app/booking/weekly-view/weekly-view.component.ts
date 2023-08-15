import { Component, Input, OnInit } from '@angular/core';
import { Room } from 'src/app/rooms/room.model';

@Component({
  selector: 'app-weekly-view',
  templateUrl: './weekly-view.component.html',
  styleUrls: ['./weekly-view.component.scss']
})
export class WeeklyViewComponent implements OnInit{

  constructor(){}

  @Input() rooms!: Room[];

  ngOnInit(): void {

  }


}
