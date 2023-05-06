/**
 * This is the services file that controlls updating
 * and displaying the hotel reservation data
 * @author Zach East
 */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, first } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';
import { Hotel } from '../models/Hotel';
import { User } from '../models/User';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HotelReserveService {
  private url = "http://localhost:3000/hotels";

  public packinglistData!: [];
  public filteredPackinglist!: [];

  isUserLoggedIn$ = new BehaviorSubject<boolean>(false);

  httpOptions: {headers:HttpHeaders}={
    headers: new HttpHeaders({"Content-Type" : "application/json"})
  }

  errorHandlerService: any;
  constructor(
    private http:HttpClient,
    private errorhandler:ErrorHandlerService,
    private authService:AuthService,
  ) { }

  createHotel(formData: Pick<Hotel,|"hotel"|"checkin"|"checkin2"|"checkout"|"checkout2"|"cost">
  ,userId: User["id"],tripid:Number,tripname:String): Observable<Hotel>{
    return this.http.post<Hotel>(
      this.url,{
        tripname: tripname,
        hotel: formData.hotel,
        checkin: formData.checkin.getFullYear()+"-"+(formData.checkin.getUTCMonth()+1) +"-"+formData.checkin.getDate() +" "+formData.checkin2+":00",
        checkout: formData.checkout.getFullYear()+"-"+(formData.checkout.getUTCMonth()+1) +"-"+formData.checkout.getDate() +" "+formData.checkout2+":00",
        cost: formData.cost,
        userId: userId,
        tripid:tripid,
      },this.httpOptions
        ).pipe(
      catchError(this.errorhandler.handleError<Hotel>("createHotel")),
    );
  }

  fetchAll(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(`${this.url}/${this.authService.userId}`,{responseType:"json"}).pipe(
      catchError(this.errorhandler.handleError<Hotel[]>("fetchAll",[])),
    );
  }

  deleteHotel(postId: Number): Observable<{}>{
    return this.http.delete<Hotel>(`${this.url}/${postId}`,this.httpOptions).pipe(first(),
    catchError(this.errorhandler.handleError<Hotel>("deleteHotel"))
    );
  }

}
