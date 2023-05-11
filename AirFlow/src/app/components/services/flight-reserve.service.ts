/**
 * This is the services file that controlls updating
 * and displaying the flight reservation data
 * @author Zach East
 */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, first } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';
import { Flight } from '../models/Flight';
import { User } from '../models/User';
import { Holder } from '../models/Holder';
import { AuthService } from './auth.service';
import { TripService } from './trip.service';

@Injectable({
  providedIn: 'root'
})
export class FlightReserveService {

  private url = "https://softengbackair-production.up.railway.app/flights";

  public flightData!: [];
  public filteredFlights!: [];
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


  createFlight(formData: Holder,userId: Number,tripid:Number,tripname:String): Observable<Flight>{
    console.log("check")
    return this.http.post<Flight>(
      this.url,{
        tripname: tripname,
        userId: userId,
        flight: formData.flight,
        cost: formData.cost,
        time: formData.time.getFullYear()+"-"+(formData.time.getUTCMonth()+1) +"-"+formData.time.getDate() +" "+formData.time2+":00",
        tripid:tripid
      },this.httpOptions
        ).pipe(
      catchError(this.errorhandler.handleError<Flight>("createFlight")),
    );
  }

  fetchAll(): Observable<Flight[]> {
    return this.http.get<Flight[]>(`${this.url}/${this.authService.userId}`,{responseType:"json"}).pipe(
      catchError(this.errorhandler.handleError<Flight[]>("fetchAll",[])),
    );
  }

  deleteFlight(postId: Number): Observable<{}>{
    return this.http.delete<Flight>(`${this.url}/${postId}`,this.httpOptions).pipe(first(),
    catchError(this.errorhandler.handleError<Flight>("deletePost"))
    );
  }
}
