import { Component } from '@angular/core';

@Component({
  selector: 'app-location2-page',
  templateUrl: './location2-page.component.html',
  styleUrls: ['./location2-page.component.scss']
})
export class Location2PageComponent {

  food: boolean =false;
  hotel: boolean =false;
  recreation: boolean =false;
  weather: boolean =false;


  short: boolean = false;
  long: boolean = false;
  economy: boolean = false;
  cell: boolean = false;
  valet: boolean = false;


}
