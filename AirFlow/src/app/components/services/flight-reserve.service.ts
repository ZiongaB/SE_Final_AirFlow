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
import { Holder } from '../models/Holder';

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

  createPackingList(formData: Holder,userId: User["id"]): Observable<Flight>{
    console.log(formData)
    return this.http.post<Flight>(
      this.url,{
        tripname: formData.tripname, 
        userId: userId,
        flight1: formData.flight1,
        cost1: formData.cost1,
        time1: formData.time1.getFullYear()+"-"+(formData.time1.getUTCMonth()+1) +"-"+formData.time1.getDate() +" "+formData.time12+":00",
        flight2: formData.flight2,
        cost2: formData.cost2,
        time2: formData.time2.getFullYear()+"-"+(formData.time2.getUTCMonth()+1) +"-"+formData.time2.getDate() +" "+formData.time22+":00"
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
