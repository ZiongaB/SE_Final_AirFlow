import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Trip } from '../../models/Trip';
import { TripService } from '../../services/trip.service';
import { AuthService } from '../../services/auth.service';
import { first } from 'rxjs';

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

  constructor(private TripService: TripService,private authService:AuthService){}

  createFormGroup():FormGroup{
    return new FormGroup({
      tripname: new FormControl("", [Validators.required, Validators.minLength(5)]),
      parking: new FormControl("", [Validators.required, Validators.minLength(10)]),

    })
  }
  submit(formData: Pick<Trip,"tripname" | "parking">):void{
    this.TripService.createTrip(formData,this.authService.userId).pipe(first()).subscribe(()=>{
      this.create.emit(null);
    })
    ;
    this.tripForm.reset();
  }
}
