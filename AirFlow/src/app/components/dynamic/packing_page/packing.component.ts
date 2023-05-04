import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Packinglist } from '../../models/PackingList';
import { TripService } from '../../services/trip.service';
import { Trip } from '../../models/Trip';
import { FlightReserveService } from '../../services/flight-reserve.service';
import { Flight } from '../../models/Flight';



@Component({
  selector: 'app-packing',
  templateUrl: './packing.component.html',
  styleUrls: ['./packing.component.scss']
})
export class PackingComponent {
  toDisplay = false;
  packingForm: FormGroup
  thisTrip!: Trip;
  allflights!:Flight[]
  isDisplayed=false;

constructor(private tripService:TripService, private flightService: FlightReserveService){

}

  ngOnInit(){
    this.packingForm = this.createFormGroup();
  }

  toggleData() {
    this.toDisplay = !this.toDisplay;
  }


  createFormGroup():FormGroup{
    return new FormGroup({
      tripname: new FormControl("", [Validators.required, Validators.minLength(1)]),
    });
  }

  toDate(thing:any):Date{
    const dt = new Date(thing);
    return dt;
  }

  submit(formData:Pick<Packinglist,"tripname"|"destination">):void{
    this.tripService.fetchAll().subscribe(posts =>{
      for(const x of posts){
        if(x.tripname == formData.tripname){
          this.thisTrip=x;
        }
      }
      this.flightService.fetchAll().subscribe(posts=>{
        this.allflights = posts;
        this.isDisplayed=true;
      })

    });


    this.packingForm.reset();
  }

  typesOfItems: string[] = ['Boarding pass', 'Wallet', 'Drivers License','Cellphone','Laptop/Tablet', 'Optional: Passport', "Electronic Chargers", 'Outlet Adapter'];
  typesOfClothes: string[] = ['Shirt', 'Jacket', 'Dress','Jeans','Swim Shorts', 'Hats', 'Suits', 'Ties', 'Hiking Boots', 'Skirts'];


}
