import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Trip } from '../../models/Trip';
import { TripService } from '../../services/trip.service';
import { Observable } from 'rxjs';
import { Flight } from '../../models/Flight';
import { FlightReserveService } from '../../services/flight-reserve.service';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss']
})
export class TripsComponent {
 
  allFlight!:Flight[];
  allTrip!: Trip[];
  filteredTrip: Trip[];
  flightMap: Map<Number,Flight>;

  createTrip: Boolean = false;
  createHotel: Boolean = false;
  createCar: Boolean = false;

  constructor(private TripService:TripService,private authService:AuthService, private flightService:FlightReserveService){}

  ngOnInit(){
    this.createPost();
  }

  tripIf(){
    this.createTrip = !this.createTrip;
  }

  hotelIf(){
    this.createHotel = !this.createHotel;
  }

  carIf(){
    this.createCar = !this.createCar;
  }

  createPost() :void{
    this.flightMap = new Map();
    this.TripService.fetchAll().subscribe(posts =>{
      this.allTrip = posts;
    })
    this.flightService.fetchAll().subscribe(posts =>{
      this.allFlight= posts;
      for(const y of this.allFlight){
        this.flightMap!.set(y.tripid,y);
      }
      
    })
  }



  deleteFlight(id:Number):void{
    this.flightService.deleteFlight(id).subscribe()
    this.createPost();
  }
  deleteTrip(id:Number): void{
    this.TripService.deleteTrip(id).subscribe();
    this.deleteFlight(id);
    this.createPost();
  }
    


    //Zach

    tripVisible: boolean = false;
    flightVisible: boolean = false;
    hotelVisible: boolean = false;
    carVisible: boolean = false;
    
    

    //Make trip visible or invisible
    toggleTrip() {
      this.tripVisible = ! this.tripVisible;
    }
    //Make flights visible or invisible
    toggleFlight() {
      this.flightVisible = ! this.flightVisible;
    }
    //Make hotels visible or invisible
    toggleHotel() {
      this.hotelVisible = ! this.hotelVisible;
    }
    //Make cars visible or invisible
    toggleCar() {
      this.carVisible = ! this.carVisible;
    }

}
