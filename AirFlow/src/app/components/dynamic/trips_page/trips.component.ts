import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Trip } from '../../models/Trip';
import { TripService } from '../../services/trip.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss']
})
export class TripsComponent {

  posts$:Observable<Trip[]>;
  tripForm: FormGroup
  
  filteredTrip!: Trip[];

  constructor(private TripService:TripService,private authService:AuthService){}

  ngOnInit(){
    this.tripForm = this.createFormGroup();
    this.posts$ = this.fetchAll();
  }

  createPost() :void{
    this.posts$ = this.fetchAll();
  }

  fetchAll(): Observable<Trip[]>{
    return this.TripService.fetchAll();
  }

  createFormGroup():FormGroup{
    return new FormGroup({
      Name: new FormControl("", [Validators.required, Validators.minLength(5)]),
      Spot: new FormControl("", [Validators.required, Validators.minLength(10)]),

    })
  }

    submit(formData: Pick<Trip,"Name" | "Spot">):void{
      this.TripService.createTrip(formData,this.authService.userId,this.authService.token).subscribe();
      this.tripForm.reset();
    }


}
