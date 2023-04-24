/**
 * This is the services file that controlls updating 
 * and displaying the flight reservation data
 * @author Zach East
 */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';
import { Flight } from '../models/Flight';
import { User } from '../models/User';

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
  constructor(private http:HttpClient, private errorhandler:ErrorHandlerService) { }

  createPackingList(formData: Pick<Flight,
    "tripname"|"flight1"|"cost1"|"time1"|
    "flight2"|"cost2"|"time2"
    >,userId: User["id"]): Observable<Flight>{
    return this.http.post<Flight>(
      this.url,{
        tripname: formData.tripname, 
        userId: userId,

        flight1: formData.flight1,
        cost1: formData.cost1,
        time1: formData.time1,
        flight2: formData.flight2,
        cost2: formData.cost2,
        time2: formData.time2
      },this.httpOptions
        ).pipe(
      catchError(this.errorhandler.handleError<Flight>("createFlight")),
    );
  }

  fetchAll(): Observable<Flight[]> {
    return this.http.get<Flight[]>(this.url,{responseType:"json"}).pipe(
      catchError(this.errorhandler.handleError<Flight[]>("fetchAll",[])),
    );
  } 
}
