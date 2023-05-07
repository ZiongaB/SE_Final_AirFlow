import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Trip } from '../../models/Trip';
import { TripService } from '../../services/trip.service';
import { AuthService } from '../../services/auth.service';
import { first } from 'rxjs';
import { Holder } from '../../models/Holder';
import { FlightReserveService } from '../../services/flight-reserve.service';
import { PackinglistService } from '../../services/packinglist.service';

@Component({
  selector: 'app-trips-part',
  templateUrl: './trips-part.component.html',
  styleUrls: ['./trips-part.component.scss']
})
export class TripsPartComponent {
  
  tripForm: FormGroup
  @Output() create: EventEmitter<any> = new EventEmitter();
  typesOfItems: string[] = ['Boarding pass', 'Wallet', 'Drivers License','Cellphone','Laptop/Tablet', 'Optional: Passport', "Electronic Chargers", 'Outlet Adapter','Suitcase','Carry-on'];
  
  ngOnInit(){
    this.tripForm = this.createFormGroup();
  }

  constructor(private TripService: TripService,private authService:AuthService,private flightService:FlightReserveService,
    private packingList:PackinglistService){}

  createFormGroup():FormGroup{
    return new FormGroup({
      tripname: new FormControl("", [Validators.required, Validators.minLength(1)]),
    })
  }
  getPost(post:any):any{
    return post.msg.id;
  }
  

  submit(formData: Trip):void{
    var tripid = 0
    this.TripService.createTrip(formData,this.authService.userId).subscribe(posts =>{
      tripid = this.getPost(posts)
      this.packingList.createPackingList(formData,this.authService.userId,this.typesOfItems,tripid).subscribe(posts =>{
        console.log(posts)  
        this.create.emit(null)
        });
    });
    
    
    this.tripForm.reset();
  }

  
}

