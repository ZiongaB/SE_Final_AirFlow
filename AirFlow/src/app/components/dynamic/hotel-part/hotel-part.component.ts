/**
 * This is the component that controls the logic of the hotel form/display component.
 * It retrieves the current hotel reservation information for the user and allows them to update it
 * @author Zachary East
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Hotel } from '../../models/Hotel';
import { HotelReserveService } from '../../services/hotel-reserve.service';
import { AuthService } from '../../services/auth.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-hotel-part',
  templateUrl: './hotel-part.component.html',
  styleUrls: ['./hotel-part.component.scss']
})
export class HotelPartComponent {

  hotelForm: FormGroup
  @Output() create: EventEmitter<any> = new EventEmitter();
  @Input() tripid: Number;
  @Input() tripname:String;

  //List of all hotels
  allHotel!: Hotel[];

  //Booleans for whether page elements are visible
  createHotel: Boolean = false;
  hotelVisible: boolean = false;

  //On initialization
  ngOnInit(){
    //Set up form anf get all hotels
    this.hotelForm = this.createFormGroup();
    this.createHotelPost();
  }

  constructor(private HotelService: HotelReserveService,private authService:AuthService){}

  //Function for creating hotel form
  createFormGroup():FormGroup{
    return new FormGroup({
      tripname: new FormControl("", [Validators.required, Validators.minLength(5)]),
      hotel: new FormControl("", [Validators.required, Validators.minLength(1)]),
      checkin: new FormControl("",[Validators.required]),
      checkin2: new FormControl("",[Validators.required]),
      checkout: new FormControl("",[Validators.required]),
      checkout2: new FormControl("",[Validators.required]),
      cost:new FormControl("",[Validators.required, Validators.pattern(/^[0-9]+$/)]),
    })
  }

  //Function to retrieve all hotel information
  createHotelPost(): void{
    this.HotelService.fetchAll().subscribe(posts =>{
      this.allHotel= posts;
    })
  }

  //Delete a specific Hotel by trip id
  deleteHotel(id:Number): void{
    this.HotelService.deleteHotel(id).subscribe();
    this.createHotelPost();
  }

  //function to submit form data
  submit(formData: Hotel):void{
    this.HotelService.createHotel(formData,this.authService.userId,this.tripid,this.tripname).pipe(first()).subscribe(()=>{
      this.createHotelPost();
    });
   this.hotelForm.reset();
   this.createHotelPost
 }
}
