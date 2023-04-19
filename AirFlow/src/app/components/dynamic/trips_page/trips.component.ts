import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Trip } from '../../models/Trip';
import { TripService } from '../../services/trip.service';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss']
})
export class TripsComponent {
  tripForm: FormGroup

  constructor(private TripService:TripService,private authService:AuthService){}

  ngOnInit(){
    this.tripForm = this.createFormGroup();
  }

  createFormGroup():FormGroup{
    return new FormGroup({
      Name: new FormControl("", [Validators.required, Validators.minLength(5)]),
      Spot: new FormControl("", [Validators.required, Validators.minLength(10)]),

    })
  }

    submit(formData: Pick<Trip,"Name" | "Spot">):void{
      console.log(formData);
      console.log(this.authService.userId);
      this.TripService.createTrip(formData,this.authService.userId,this.authService.token).subscribe();
      this.tripForm.reset();
    }
}
