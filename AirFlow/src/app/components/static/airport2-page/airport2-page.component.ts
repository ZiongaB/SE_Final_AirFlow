import { Component } from '@angular/core';

@Component({
  selector: 'app-airport2-page',
  templateUrl: './airport2-page.component.html',
  styleUrls: ['./airport2-page.component.scss']
})
export class Airport2PageComponent {

  //Booleans for deciding which  terminal information is visible
  mainTerminal: boolean = false;
  aTerminal: boolean = false;
  cTerminal: boolean = false;
  eTerminal: boolean = false;
  fTerminal: boolean = false;

  //Booleans for deciding which parking information is visible
  short: boolean = false;
  long: boolean = false;
  economy: boolean = false;
  cell: boolean = false;
  valet: boolean = false;
}