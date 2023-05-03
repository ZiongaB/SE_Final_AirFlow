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

  carVisible: boolean = false;
  createCar: Boolean = false;
  allCar!: Car[];
  ngOnInit(){
    this.carForm = this.createFormGroup();
    this.createCarPost();
  }

  constructor(private CarService: CarReserveService,private authService:AuthService){}

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

  submit(formData: Car):void{
    this.CarService.createCar(formData,this.authService.userId).pipe(first()).subscribe(()=>{
      this.create.emit(null);
    });
   this.carForm.reset();
 }
}
