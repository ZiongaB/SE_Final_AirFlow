import { Component } from '@angular/core';

@Component({
  selector: 'app-location1-page',
  templateUrl: './location1-page.component.html',
  styleUrls: ['./location1-page.component.scss']
})
export class Location1PageComponent {
  restaurants: boolean = false;
  food: boolean =false;
  hotel: boolean =false;
  recreation: boolean =false;
  weather: boolean =false;

  westin: boolean = false;
  ritz: boolean = false;
  hotel3: boolean = false;
  hotel4: boolean = false;

}
