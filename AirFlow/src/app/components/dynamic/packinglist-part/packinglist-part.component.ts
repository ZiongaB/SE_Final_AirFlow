import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-packinglist-part',
  templateUrl: './packinglist-part.component.html',
  styleUrls: ['./packinglist-part.component.scss']
})
export class PackinglistPartComponent {
  typesOfItems: string[] = ['Boarding pass', 'Wallet', 'Drivers License','Cellphone','Laptop/Tablet', 'Optional: Passport', "Electronic Chargers", 'Outlet Adapter'];
  @Input() tripid: Number;
  @Input() tripname:String;

  showPacking= false;



}
