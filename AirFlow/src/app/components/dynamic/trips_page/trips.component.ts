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
  

  allTrip!: Trip[];
  filteredTrip: Trip[];

  createTrip: Boolean = false;

  constructor(private TripService:TripService,private authService:AuthService){}

  ngOnInit(){
    this.TripService.fetchAll().subscribe(posts =>{
      this.allTrip = posts;
      this.TripService.tripData = posts;
    })
  }

  tripIf(){
    this.createTrip = !this.createTrip;
  }

  createPost() :void{
    this.TripService.fetchAll().subscribe(posts =>{
      this.allTrip = posts;
      this.TripService.tripData = posts;
    })
  }

  fetchAll(): Observable<Trip[]>{
    return this.TripService.fetchAll();
  }

  
  deleteTrip(id:Number): void{
    this.TripService.deleteTrip(id).subscribe();
    this.createPost();
  }
    


}
