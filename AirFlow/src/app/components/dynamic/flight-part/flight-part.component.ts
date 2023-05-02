import { Component, EventEmitter, Output } from '@angular/core';
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
 
  tripForm: FormGroup
  @Output() create: EventEmitter<any> = new EventEmitter();
  ngOnInit(){
    this.tripForm = this.createFormGroup();
  }

  constructor(private TripService: TripService,private authService:AuthService,private flightService:FlightReserveService){}

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
    var tripid:Number;
    this.TripService.createTrip(formData,this.authService.userId).subscribe(message =>{
      tripid = this.giveID(message);
      this.flightService.createFlight(formData,this.authService.userId,tripid).pipe(first()).subscribe(()=>{
        this.create.emit(null);
      });
    });
    this.tripForm.reset();
  }
}
