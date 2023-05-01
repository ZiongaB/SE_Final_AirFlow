import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {FormControl, Validators } from '@angular/forms';
import { Flight } from '../../models/Flight';
import { Packinglist } from '../../models/PackingList';
import { Trip } from '../../models/Trip';
import { FlightReserveService } from '../../services/flight-reserve.service';
import { TripService } from '../../services/trip.service';

@Component({
  selector: 'app-packing',
  templateUrl: './packing.component.html',
  styleUrls: ['./packing.component.scss']
})
export class PackingComponent {
  toDisplay = false;
  packingForm: FormGroup
  thisTrip!: Trip;
  thisFlight: Flight;
  isDisplay = false;


constructor(private tripService:TripService, private flightService: FlightReserveService){


}

  ngOnInit(){
    this.packingForm = this.creatFormGroup();
  }

  toggleData() {
    this.toDisplay = !this.toDisplay;
  }

  creatFormGroup():FormGroup{
    return new FormGroup({
      tripname: new FormControl("", [Validators.required, Validators.minLength(1)]),
      destination: new FormControl("", [Validators.required, Validators.minLength(1)]),
    });
  }

  submit(formData:Pick<Packinglist, "tripname" | "destination">): void {
   this.tripService.fetchAll().subscribe(posts =>{
    for(const x of posts){
      if(x.tripname == formData.tripname){
        this.thisTrip = x;
      }
    }
    this.flightService.fetchAll().subscribe(post => {
      for(const y of post){
        if(y.tripid == this.thisTrip.id){
          this.thisFlight = y;
        }
      }
      this.isDisplay = true;
    })


  });

    this.packingForm.reset();

  }

  typesOfShoes: string[] = ['Boarding pass', 'Wallet', 'Drivers License', 'Cellphone', 'Laptop', 'Optional: Passport'];

}
