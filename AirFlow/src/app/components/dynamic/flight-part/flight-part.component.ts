import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { Holder } from '../../models/Holder';
import { AuthService } from '../../services/auth.service';
import { FlightReserveService } from '../../services/flight-reserve.service';
import { TripService } from '../../services/trip.service';
import { Flight } from '../../models/Flight';

@Component({
  selector: 'app-flight-part',
  templateUrl: './flight-part.component.html',
  styleUrls: ['./flight-part.component.scss']
})
export class FlightPartComponent {
 
  flightForm: FormGroup
  @Input() tripid: Number;
  @Input() tripname:String;

  createFlight:Boolean = false;
  flightVisible: boolean = false;
  allFlight!:Flight[];


  ngOnInit(){
    this.flightForm = this.createFormGroup();
    this.createFlightPost();
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

  //Get list of all flights
  createFlightPost():void{
    this.flightService.fetchAll().subscribe(posts =>{
      this.allFlight = posts;
    })
  }

  toDate(thing:any):Date{
    const dt = new Date(thing);
    return dt;
  }

  deleteFlight(id:Number):void{
    this.flightService.deleteFlight(id).subscribe()
    this.createFlightPost();
  }

  submit(formData: Holder):void{
    console.log(formData)
      this.flightService.createFlight(formData,this.authService.userId,this.tripid,this.tripname).pipe(first()).subscribe(()=>{
      });
    this.flightForm.reset();
  }
}
