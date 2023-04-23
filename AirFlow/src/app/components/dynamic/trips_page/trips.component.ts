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

  allTrip!: Trip[];
  filteredTrip: Trip[];

  constructor(private TripService:TripService,private authService:AuthService){}

  ngOnInit(){
    this.tripForm = this.createFormGroup();
    this.TripService.fetchAll().subscribe(posts =>{
      this.allTrip = posts;
      this.TripService.tripData = posts;
    })
 


  }

  createPost() :void{
    this.posts$ = this.fetchAll();
  }

  fetchAll(): Observable<Trip[]>{
    return this.TripService.fetchAll();
  }

  createFormGroup():FormGroup{
    return new FormGroup({
      tripname: new FormControl("", [Validators.required, Validators.minLength(5)]),
      parking: new FormControl("", [Validators.required, Validators.minLength(10)]),

    })
  }

    submit(formData: Pick<Trip,"tripname" | "parking">):void{
      this.TripService.createTrip(formData,this.authService.userId).subscribe();
      this.tripForm.reset();
    }


}
