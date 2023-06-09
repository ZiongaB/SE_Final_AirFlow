/**
 * This is the component that controls the logic of the car form/display component.
 * It retrieves the current car rental information for the user and allows them to update it
 * @author Zachary East
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Car } from '../../models/Car';
import { CarReserveService } from '../../services/car-reserve.service';
import { AuthService } from '../../services/auth.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-car-part',
  templateUrl: './car-part.component.html',
  styleUrls: ['./car-part.component.scss']
})
export class CarPartComponent {
  carForm: FormGroup
  @Output() create: EventEmitter<any> = new EventEmitter();
  @Input() tripid: Number;
  @Input() tripname:String;

  //Booleans for displaying specific page elemtns
  carVisible: boolean = false;
  createCar: Boolean = false;
  //List of cars
  allCar!: Car[];

  //On initialization create form and get information
  ngOnInit(){
    this.carForm = this.createFormGroup();
    this.createCarPost();
  }

  constructor(private CarService: CarReserveService,private authService:AuthService){}

  //Function to create the form
  createFormGroup():FormGroup{
    return new FormGroup({
      tripname: new FormControl("", [Validators.required, Validators.minLength(5)]),
      description: new FormControl("", [Validators.required, Validators.minLength(1)]),
      rentalinfo: new FormControl("", [Validators.required, Validators.minLength(1)]),
      pickup: new FormControl("",[Validators.required]),
      pickup2: new FormControl("",[Validators.required]),
      returntime: new FormControl("",[Validators.required]),
      returntime2: new FormControl("",[Validators.required]),
      cost:new FormControl("",[Validators.required, Validators.pattern(/^[0-9]+$/)]),
    })
  }

  //Function for deleting car using delete button
  deleteCar(id:Number): void{
    this.CarService.deleteCar(id).subscribe();
    this.createCarPost();
  }

   //Get list of all cars
   createCarPost(): void{
    this.CarService.fetchAll().subscribe(posts =>{
      this.allCar= posts;
    })
  }

  //Submit function for form information
  submit(formData: Car):void{
    this.CarService.createCar(formData,this.authService.userId).pipe(first()).subscribe(()=>{
      this.createCarPost();
    });
   this.carForm.reset();
   this.createCarPost();
 }
}
