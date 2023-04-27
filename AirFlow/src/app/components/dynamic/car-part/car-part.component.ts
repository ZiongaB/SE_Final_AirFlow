import { Component, EventEmitter, Output } from '@angular/core';
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
  ngOnInit(){
    this.carForm = this.createFormGroup();
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

  submit(formData: Car):void{
    this.CarService.createCar(formData,this.authService.userId).pipe(first()).subscribe(()=>{
      this.create.emit(null);
    });
   
   //console.log(formData.time1.getFullYear()+"-"+(formData.time1.getUTCMonth()+1) +"-"+formData.time1.getDate() +" "+formData.time12+":00");

   this.carForm.reset();
 }


}
