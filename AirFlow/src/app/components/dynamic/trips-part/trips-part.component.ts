import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Trip } from '../../models/Trip';
import { TripService } from '../../services/trip.service';
import { AuthService } from '../../services/auth.service';
import { first } from 'rxjs';
import { Holder } from '../../models/Holder';
import { FlightReserveService } from '../../services/flight-reserve.service';

@Component({
  selector: 'app-trips-part',
  templateUrl: './trips-part.component.html',
  styleUrls: ['./trips-part.component.scss']
})
export class TripsPartComponent {
  tripForm: FormGroup
  @Output() create: EventEmitter<any> = new EventEmitter();
  ngOnInit(){
    this.tripForm = this.createFormGroup();
  }

  constructor(private TripService: TripService,private authService:AuthService,private flightService:FlightReserveService){}

  createFormGroup():FormGroup{
    return new FormGroup({
      tripname: new FormControl("", [Validators.required, Validators.minLength(1)]),
      flight1: new FormControl("", [Validators.required, Validators.minLength(1)]),
      cost1:new FormControl("",[Validators.required, Validators.pattern(/^[0-9]+$/)]),
      time1: new FormControl("",[Validators.required]),
      time12: new FormControl("",[Validators.required]),
      flight2: new FormControl("", [Validators.required, Validators.minLength(1)]),
      cost2:new FormControl("",[Validators.required, Validators.pattern(/^[0-9]+$/)]),
      time2: new FormControl("",[Validators.required]),
      time22:new FormControl("",[Validators.required]),
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
