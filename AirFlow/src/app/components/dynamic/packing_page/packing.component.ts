import { Component } from '@angular/core';

@Component({
  selector: 'app-packing',
  templateUrl: './packing.component.html',
  styleUrls: ['./packing.component.scss']
})
export class PackingComponent {

  typesOfShoes: string[] = ['Boarding pass', 'Wallet', 'Clothes', 'Moccasins', 'Sneakers', 'Jacket', 'Laptop','Cellphone', 'Optional: Passport'];

}
