import { Component } from '@angular/core';

export class Message{
  type!: 'Error' | 'Success' | 'Warning';
  text!: string;
}

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {

  constructor(){}

  
  

}
