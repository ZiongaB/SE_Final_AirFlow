import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Trip } from '../../models/Trip';
import { TripService } from '../../services/trip.service';
import { Observable } from 'rxjs';
import { Flight } from '../../models/Flight';
import { FlightReserveService } from '../../services/flight-reserve.service';

import { Car } from '../../models/Car';
import { CarReserveService } from '../../services/car-reserve.service';
import { Hotel } from '../../models/Hotel';
import { HotelReserveService } from '../../services/hotel-reserve.service';


@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss']
})
export class TripsComponent {


  //Lists for trips
  allTrip!: Trip[];


  //Lists for cars and hotels

  //Booleans for visibility of specific sections
  createTrip: Boolean = false;
  //Constructor to define services
  constructor(
    private TripService:TripService,
    private authService:AuthService,
    private hotelService: HotelReserveService
    ){}

  //On initialization of the page load all relevant information
  ngOnInit(){
    this.createPost();

  }
  //Get list of all trips
  createPost() :void{
    this.TripService.fetchAll().subscribe(posts =>{
      this.allTrip = posts;
    })
  }
  toDate(thing:any):Date{
    const dt = new Date(thing);
    return dt;
  } 
  //Delete a specific Trip by trip id number
  deleteTrip(id:Number): void{
    this.TripService.deleteTrip(id).subscribe();
    this.createPost();
  }
  //Variables for if specific elements are visible
  tripVisible: boolean = false;
}
