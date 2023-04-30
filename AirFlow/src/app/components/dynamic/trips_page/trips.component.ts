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

  //Lists for trips and flights
  allFlight!:Flight[];
  allTrip!: Trip[];
  filteredTrip: Trip[];
  flightMap: Map<Number,Flight>;

  //Lists for cars and hotels
  allCar!: Car[];
  allHotel!: Hotel[];

  //Booleans for visibility of specific sections
  createTrip: Boolean = false;
  createHotel: Boolean = false;
  createCar: Boolean = false;

  //Constructor to define services
  constructor(
    private TripService:TripService,
    private authService:AuthService,
    private flightService:FlightReserveService,
    private carService:CarReserveService,
    private hotelService: HotelReserveService
    ){}

  //On initialization of the page load all relevant information
  ngOnInit(){
    this.createPost();
    this.createCarPost();
    this.createHotelPost();
  }

  //Switch if car section is visible
  tripIf(){
    this.createTrip = !this.createTrip;
  }

  //Switch if car section is visible
  hotelIf(){
    this.createHotel = !this.createHotel;
  }

  //Switch if car section is visible
  carIf(){
    this.createCar = !this.createCar;
  }

  //Get list of all trips/flights
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

  //Get list of all cars
  createCarPost(): void{
    this.carService.fetchAll().subscribe(posts =>{
      this.allCar= posts;
    })
  }

  //Get list of all hotels
  createHotelPost(): void{
    this.hotelService.fetchAll().subscribe(posts =>{
      this.allHotel= posts;
    })
  }

  //Delete a specific Flight by trip id number
  deleteFlight(id:Number):void{
    this.flightService.deleteFlight(id).subscribe()
    this.createPost();
  }
  //Delete a specific Trip by trip id number
  deleteTrip(id:Number): void{
    this.TripService.deleteTrip(id).subscribe();
    this.deleteFlight(id);
    this.createPost();
  }

  //Delete a specific Car by id number
  deleteCar(id:Number): void{
    this.carService.deleteCar(id);
    this.createCarPost();
  }

  //Delete a specific Hotel by trip id
  deleteHotel(id:Number): void{
    this.hotelService.deleteHotel(id);
    this.createHotelPost();
  }

  //Variables for if specific elements are visible
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
