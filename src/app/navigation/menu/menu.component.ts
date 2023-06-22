import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private appService: AppService) { }
  activeRoute = "";
  ngOnInit(): void {
    setTimeout(() => {this.appService.activeRoute.subscribe(change => {
      this.activeRoute = change;
      console.log(change);
    })
  })
  }

}
