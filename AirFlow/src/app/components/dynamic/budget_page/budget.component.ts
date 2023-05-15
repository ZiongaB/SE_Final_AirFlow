/**
 * This is the component that controls the logic for the budget page. 
 * It retrieves and updates budget data, calculates leftover budget,
 * calculates the most expensive/most common categories of costs, and 
 * it gives the user advice on how they should budget
 * @author Zachary East
 */
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

  //Arrays of all 
  allFlight!:Flight[];
  allCar!: Car[];
  allHotel!: Hotel[];
  //user!: any;
  budget!: Budget[];

  //Variables to decide if budget and final budget are visible yet (fixes console errors)
  displayBud: boolean = false;
  displayFBud: boolean = false;

  //Variables for determining if the final budget is positive or negative
  positive: boolean = false;
  negative: boolean = false;

  //Variables for the total costs of each type
  carCost: number; 
  fliCost: number;
  hotCost: number;

  //Variable for the total costs and the leftover budget 
  totalCosts: number;
  usedBudget: number;
  zeroBudget: number =0;

  //Values to define which type of cost is the most expensive
  topCostCategory: string;
  topCostValue: number;

  //Values to define which type of costs the user has the most of
  largestAmountCategory: string;
  largestAmountItems: number;

  //Number of costs of specific categories
  cItem: number;
  fItem: number;
  hItem: number;

  //Strings to be filled in based on financial data
  suggestion1: string = "";
  suggestion2: string = "";
  negativeSuggest: string = "";
  negativeSuggest2: string = "";
  positiveSuggest: string = "";
  positiveSuggest2: string = "";


  //On initializing page
  ngOnInit(){
    //Set up the form
    this.updateForm = this.createFormGroup();
    //Fetch relevant information and filter it
    this.filterAndFetch()
  }


  //This is called whenever the user needs to update the page values
  updateVisual()
  {
    this.filterAndFetch();
  }

  //Fetches the user budget and then calls the next set of information to be fetched
  fetchBudget()
  {
    this.budgetService.fetchBudget().subscribe(posts =>{
      //Budget is fetched
      this.budget = posts;
      this.displayBud = true;
      //Cars are fetched next
      this.fetchCars();
    })
  }

  //Fetches the user car costs and then calls the next functions to be initialized
  fetchCars()
  {
    this.carService.fetchAll().subscribe(posts =>{

      //Cars are fetched and their costs calculated
      this.allCar = posts;
      this.getCarCost();

      //Flights are fetched next
      this.fetchFlights();
    })
  }

  //Fetches the user flight costs and then calls the next functions to be initialized
  fetchFlights()
  {
    this.flightService.fetchAll().subscribe(posts =>{

      //Flights are fetched and their costs calculated
      this.allFlight= posts;
      this.getFliCost();

      //Hotels are fetched next
      this.fetchHotels();
    })
  }

  //Fetches the user hotel costs and then calls the next functions to be initialized
  fetchHotels()
  {
    this.hotelService.fetchAll().subscribe(posts =>{

      //Hotels are fetched and their costs calculated
      this.allHotel= posts;
      this.getHotCost();

      //Do the final calculations of leftover budget and set variables
      this.getFinal();
    })
  }

  //This starts the chain of fetching and filtering functions as well as resetting variables
  filterAndFetch()
  {
    //Set the total costs to zero
    this.carCost = 0;
    this.fliCost = 0;
    this.hotCost = 0;
    this.totalCosts = 0;

    //Reset topCosting variables
    this.topCostValue = 0;
    this.topCostCategory = "";

    //Reset largestAmount variables
    this.largestAmountItems = 0;
    this.largestAmountCategory = "";
    this.cItem = 0;
    this.fItem = 0;
    this.hItem =0;

    //Set html tags back to invisible until recalculated
    this.negative=false;
    this.positive=false;


    //Start the chain 
    this.fetchBudget();
  }

  //Calculates the total cost of all cars and adds it to the total cost
  getCarCost(){

    console.log("Totalcosts before cars: "+this.totalCosts);

    //Loop through all cars and add cost to total car costs
    for (const product of this.allCar) {
      console.log(product.description + " costs:" + product.cost);
      this.carCost = this.carCost + <number>product.cost;
      this.cItem++;
    }

    //Add car costs to total costs
    this.totalCosts = this.totalCosts - this.carCost;
    console.log("Totalcosts after cars: "+this.totalCosts);

    //If cars are the most expensive category
    if(this.topCostValue < this.carCost)
    {
      //Set the most expensive category to cars
      this.topCostValue = this.carCost;
      this.topCostCategory = "Cars";
    }

    //If cars is the most common category
    if (this.cItem >this.largestAmountItems)
    {
      //Set it to the most common category
      this.largestAmountCategory = "Cars";
      this.largestAmountItems =this.cItem;
    }
  }

  //Calculates the total cost of all flights and adds it to the total cost
  getFliCost(){

    console.log("Totalcosts before flights: "+this.totalCosts);

    //Loop through all the flights and add the costs
    for (const product of this.allFlight) {
      console.log(product.flight + " costs:" + product.cost);
      this.fliCost = this.fliCost + <number>product.cost;
      this.fItem++;
    }

    //Add cost of flights to total costs
    this.totalCosts = this.totalCosts - this.fliCost;
    console.log("Totalcosts after flights: "+this.totalCosts);

    //If flights are the most expensive category
    if(this.topCostValue < this.fliCost)
    {
      //Set the most expensive category to flights
      this.topCostValue = this.fliCost;
      this.topCostCategory = "Flights";
    }

    //If flights are the most common category
    if (this.fItem >this.largestAmountItems)
    {
      //Set the most common category to flights
      this.largestAmountCategory = "Flights";
      this.largestAmountItems =this.fItem;
    }
  }

  //Calculates the total cost of all hotels and adds it to the total cost
  getHotCost(){

    console.log("Totalcosts before hotels: "+this.totalCosts);

    //Loop through all hotels and add costs together
    for (const product of this.allHotel) {
      console.log(product.hotel + " costs:" + product.cost);
      this.hotCost = this.hotCost + <number>product.cost;
      this.hItem++;
    }

    //Add cost of hotels to total costs
    this.totalCosts = this.totalCosts - this.hotCost;
    console.log("Totalcosts after hotels: "+this.totalCosts);

    //If it's the most expensive category
    if(this.topCostValue < this.hotCost)
    {
      //Set most expensive category to hotels
      this.topCostValue = this.hotCost;
      this.topCostCategory = "Hotels";
    }

    //If it's the most common category
    if (this.hItem > this.largestAmountItems)
    {
      //Set most common category to hotels
      this.largestAmountCategory = "Hotels";
      this.largestAmountItems =this.hItem;
    }
  }

  //Calculates final budget and sets the html variables
  getFinal()
  {
    console.log("Calculating final budget used");
    this.usedBudget = <number>this.budget[0].Total_budget + this.totalCosts;
    console.log("Final Budget: "+ this.usedBudget);
    this.displayFBud = true;

    //If the user's leftover budget is over 0
    if(this.usedBudget>0)
    {
      //Show the positive messages
      this.positive = true;

      //If it's under the average cost of a flight from the airports
      if (this.usedBudget>342)
      {
        //Advertise the airports
        this.positiveSuggest = "Did you know that the average cost for a flight out of Tampa International was $342.28 in Q4 2022? For SRQ it was $330.09";
        this.positiveSuggest2 = "You learn more about Tampa International and SRQ here!"
      }

      //Otherwise suggest how to possible rebudget
      this.positiveSuggest = "You're a bit low on funds! You may want to avoid making any more trip plans for the year!"
      this.positiveSuggest2 = "If you need to free up cash perhaps you can free up some budget by removing some: "+this.topCostCategory +"!";
    }

    //If your leftover budget is negative
    else
    {
      //Set the value to zero and display messages suggesting to rebudget
      this.usedBudget = 0;
      this.negative = true;
      this.negativeSuggest = "You have run overbudget!!! It might be a good idea to rethink your budget this year or some of your expenses!!!"
      this.negativeSuggest2 = "If you want to save money you should think about modifying your existing trip expenses under this category: "+this.topCostCategory +".";
    }

    this.suggestion1 = "Most expensive category: "+ this.topCostCategory+ " with a cost of $"+ this.topCostValue;
    this.suggestion2 = "Most common category: "+ this.largestAmountCategory + " with a total of " + this.largestAmountItems + " items";

  }

  //Set up the form
  createFormGroup():FormGroup{
    return new FormGroup({
      budget: new FormControl("", [Validators.required, Validators.minLength(1)]),
    })
  }

  //Submits the data from the form and calls updates on the visuals
  submit(formData: User):void{
    this.budgetService.updateBudget(formData,this.authService.userId).pipe(first()).subscribe(()=>{
      this.create.emit(null);
      this.updateVisual();
    });
    this.updateForm.reset();
  }
}
