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
import { Budget } from '../../models/Budget';

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

  allFlight!:Flight[];
  allCar!: Car[];
  allHotel!: Hotel[];
  user!: any;
  budget!: Budget[];

  displayBud: boolean = false;
  displayFBud: boolean = false;
  positive: boolean = false;
  negative: boolean = false;

  carCost: number; 
  fliCost: number;
  hotCost: number;
  totalCosts: number;
  usedBudget: number;

  ngOnInit(){

    this.carCost = 0;
    this.fliCost = 0;
    this.hotCost = 0;
    this.totalCosts = 0;

    this.updateForm = this.createFormGroup();
    //this.fetchBudget();

    this.filterAndFetch()
  }

  

  updateVisual()
  {
    this.fetchBudget();
  }

  fetchBudget()
  {
    this.budgetService.fetchBudget().subscribe(posts =>{
      this.budget = posts;
      this.displayBud = true;
      console.log(this.budget[0].Total_budget);
      //this.usedBudget = <number>this.budget[0].Total_budget -this.totalCosts;
      //console.log("Currently used budget: "+this.usedBudget);
    })
  }

  fetchCars()
  {
    this.carService.fetchAll().subscribe(posts =>{
      this.allCar = posts;
      this.getCarCost();
    })
  }

  fetchFlights()
  {
    this.flightService.fetchAll().subscribe(posts =>{
      this.allFlight= posts;
      this.getFliCost();
    })
  }

  fetchHotels()
  {
    this.hotelService.fetchAll().subscribe(posts =>{
      this.allHotel= posts;
      this.getHotCost();
      this.getFinal();
    })
  }

  filterAndFetch()
  {
    console.log("Fetching Budget")
    this.fetchBudget();

    console.log("Fetching Cars")
    this.fetchCars();
    console.log("Fetching Flights")
    this.fetchFlights();
    console.log("Fetching Hotels")
    this.fetchHotels();

    console.log("TotalCost after all fetches:"+this.totalCosts)

  }

  
  getCarCost(){

    console.log("Totalcosts before cars: "+this.totalCosts);

    for (const product of this.allCar) {
      console.log(product.description + " costs:" + product.cost);
      this.carCost = this.carCost + <number>product.cost;
    }

    this.totalCosts = this.totalCosts - this.carCost;
    console.log("Totalcosts after cars: "+this.totalCosts);
  }

  getFliCost(){

    console.log("Totalcosts before flights: "+this.totalCosts);

    for (const product of this.allFlight) {
      console.log(product.flight + " costs:" + product.cost);
      this.fliCost = this.fliCost + <number>product.cost;
    }

    this.totalCosts = this.totalCosts - this.fliCost;
    console.log("Totalcosts after flights: "+this.totalCosts);
  }
  
  getHotCost(){

    console.log("Totalcosts before hotels: "+this.totalCosts);

    for (const product of this.allHotel) {
      console.log(product.hotel + " costs:" + product.cost);
      this.hotCost = this.hotCost + <number>product.cost;
    }

    this.totalCosts = this.totalCosts - this.hotCost;
    console.log("Totalcosts after hotels: "+this.totalCosts);
  }

  getFinal()
  {
    console.log("Calculating final budget used");
    this.usedBudget = <number>this.budget[0].Total_budget + this.totalCosts;
    console.log("Final Budget: "+ this.usedBudget);
    this.displayFBud = true;
    if(this.usedBudget>0)
    {
      this.positive = true;
    }
    else
    {
      this.negative = true;
    }

  }
  

  createFormGroup():FormGroup{
    return new FormGroup({
      budget: new FormControl("", [Validators.required, Validators.minLength(1)]),
    })
  }

  
  submit(formData: User):void{
    console.log(formData)
    this.budgetService.updateBudget(formData,this.authService.userId).pipe(first()).subscribe(()=>{
      this.create.emit(null);
      this.updateVisual();
    });
    this.updateForm.reset();
  }
}
