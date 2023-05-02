import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, first } from 'rxjs';

import { User } from '../../models/User';
import { BudgetService } from '../../services/budget.service';
import { Flight } from '../../models/Flight';
import { FlightReserveService } from '../../services/flight-reserve.service';
import { Car } from '../../models/Car';
import { CarReserveService } from '../../services/car-reserve.service';
import { Hotel } from '../../models/Hotel';
import { HotelReserveService } from '../../services/hotel-reserve.service';



@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent {

  updateForm: FormGroup;
  @Output() create: EventEmitter<any> = new EventEmitter();

  constructor(
    private authService:AuthService,
    private budgetService:BudgetService,
    private flightService:FlightReserveService,
    private carService:CarReserveService,
    private hotelService: HotelReserveService
    ){}

  ngOnInit(){

    this.updateForm = this.createFormGroup();

    this.fetchBudget();
    this.fetchCars();
    this.fetchFlights();
    this.fetchHotels();
    this.filterCosts();
    

  }

  allFlight!:Flight[];
  allCar!: Car[];
  allHotel!: Hotel[];
  user!: User;

  updateVisual()
  {
    this.fetchBudget;
    this.fetchCars
  }

  fetchBudget()
  {
    this.budgetService.fetchBudget().subscribe(posts =>{
      this.user= posts;
    })
  }

  fetchCars()
  {
    this.carService.fetchAll().subscribe(posts =>{
      this.allCar= posts;
    })
  }

  fetchFlights()
  {
    this.flightService.fetchAll().subscribe(posts =>{
      this.allFlight= posts;
    })
  }

  fetchHotels()
  {
    this.hotelService.fetchAll().subscribe(posts =>{
      this.allHotel= posts;
    })
  }

  filterCosts()
  {
    console.log("Test For filtering ")
  }

  createFormGroup():FormGroup{
    return new FormGroup({
      budget: new FormControl("", [Validators.required, Validators.minLength(1)]),
    })
  }

  
  submit(formData: User):void{
    this.budgetService.updateBudget(formData,this.authService.userId).pipe(first()).subscribe(()=>{
      this.create.emit(null);
    });

    this.updateVisual();
    this.updateForm.reset();
  }

}