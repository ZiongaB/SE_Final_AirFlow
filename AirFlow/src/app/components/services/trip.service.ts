import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, first } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';
import { Trip } from '../models/Trip';
import { User } from '../models/User';
import { AuthService } from './auth.service';
import { Holder } from '../models/Holder';
import { FlightReserveService } from './flight-reserve.service';

@Injectable({
  providedIn: 'root'
})

/**
 * This service is for all things regarding the trip page, including creating a new trip, deleting a trip, and getting all the trips
 * for a certain user
 */
export class TripService {
  private url = "https://softengbackair-production.up.railway.app/trip";

  public tripData!: Trip[];
  isUserLoggedIn$ = new BehaviorSubject<boolean>(false);

  httpOptions: {headers:HttpHeaders}={
    headers: new HttpHeaders({"Content-Type" : "application/json"})
  }

  errorHandlerService: any;
  constructor(private http:HttpClient, private errorhandler:ErrorHandlerService, private authService: AuthService) { }

  createTrip(formData: Trip,userId: User["id"]): Observable<Trip>{
    return this.http.post<Trip>(this.url,{
      tripname:formData.tripname,
      userId: userId
      },this.httpOptions).pipe(
      catchError(this.errorhandler.handleError<Trip>("createTrip")),
    );
  }

  fetchAll(): Observable<Trip[]> {
    return this.http.get<Trip[]>(`${this.url}/${this.authService.userId}`,{responseType:"json"}).pipe(
      catchError(this.errorhandler.handleError<Trip[]>("fetchAll",[])),
    );
  }

  deleteTrip(postId: Number): Observable<{}>{
    return this.http.delete<Trip>(`${this.url}/${postId}`,this.httpOptions).pipe(first(),
    catchError(this.errorhandler.handleError<Trip>("deletePost"))
    );

  }
}
