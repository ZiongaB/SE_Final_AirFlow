import { Component } from '@angular/core';

@Component({
  selector: 'app-airport2-page',
  templateUrl: './airport2-page.component.html',
  styleUrls: ['./airport2-page.component.scss']
})
export class Airport2PageComponent {

  mainTerminal: boolean = false;
  aTerminal: boolean = false;
  cTerminal: boolean = false;
  eTerminal: boolean = false;
  fTerminal: boolean = false;


  short: boolean = false;
  long: boolean = false;
  economy: boolean = false;
  cell: boolean = false;
  valet: boolean = false;

  

}
