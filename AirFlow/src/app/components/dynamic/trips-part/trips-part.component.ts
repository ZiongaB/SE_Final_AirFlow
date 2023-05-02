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
    })
  }
  submit(formData: Trip):void{

    this.TripService.createTrip(formData,this.authService.userId).subscribe();
    this.create.emit(null);
    this.tripForm.reset();
  }
}
