import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { Holder } from '../../models/Holder';
import { AuthService } from '../../services/auth.service';
import { FlightReserveService } from '../../services/flight-reserve.service';
import { TripService } from '../../services/trip.service';

@Component({
  selector: 'app-flight-part',
  templateUrl: './flight-part.component.html',
  styleUrls: ['./flight-part.component.scss']
})
export class FlightPartComponent {
 
  flightForm: FormGroup
  @Output() create: EventEmitter<any> = new EventEmitter();
  @Input() tripid: Number;
  @Input() tripname:String;
  ngOnInit(){
    this.flightForm = this.createFormGroup();
  }

  constructor(private authService:AuthService,private flightService:FlightReserveService){}

  createFormGroup():FormGroup{
    return new FormGroup({
      flight: new FormControl("", [Validators.required, Validators.minLength(1)]),
      cost:new FormControl("",[Validators.required, Validators.pattern(/^[0-9]+$/)]),
      time: new FormControl("",[Validators.required]),
      time2: new FormControl("",[Validators.required]),
    })
  }
  
  giveID(msg:any):Number{
    return msg.message;
  }
  submit(formData: Holder):void{
    console.log(formData)
      this.flightService.createFlight(formData,this.authService.userId,this.tripid,this.tripname).pipe(first()).subscribe(()=>{
        this.create.emit(null);
      });
    this.flightForm.reset();
  }
}
