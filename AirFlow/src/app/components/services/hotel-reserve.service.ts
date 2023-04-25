/**
 * This is the services file that controlls updating 
 * and displaying the hotel reservation data
 * @author Zach East
 */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';
import { Hotel } from '../models/Hotel';
import { User } from '../models/User';

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
  constructor(private http:HttpClient, private errorhandler:ErrorHandlerService) { }

  createHotel(formData: Pick<Hotel,
    "tripname"|"hotel"|"checkin"|"checkout"|"cost"
    >,userId: User["id"]): Observable<Hotel>{
    return this.http.post<Hotel>(
      this.url,{
        tripname: formData.tripname, 
        hotel: formData.hotel,
        checkin: formData.checkin,
        checkout: formData.checkout,
        cost: formData.cost,
        userId: userId,
      },this.httpOptions
        ).pipe(
      catchError(this.errorhandler.handleError<Hotel>("createHotel")),
    );
  }

  fetchAll(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(this.url,{responseType:"json"}).pipe(
      catchError(this.errorhandler.handleError<Hotel[]>("fetchAll",[])),
    );
  } 

}
