import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';
import { Trip } from '../models/Trip';
import { User } from '../models/User';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  private url = "http://localhost:3000/trip";

  public tripData!: Trip[];
  isUserLoggedIn$ = new BehaviorSubject<boolean>(false);

  httpOptions: {headers:HttpHeaders}={
    headers: new HttpHeaders({"Content-Type" : "application/json"})
  }

  errorHandlerService: any;
  constructor(private http:HttpClient, private errorhandler:ErrorHandlerService, private authService: AuthService) { }

  createTrip(formData: Pick<Trip,"tripname" | "parking">,userId: User["id"]): Observable<Trip>{
    return this.http.post<Trip>(this.url,{tripname:formData.tripname, parking:formData.parking, userId: userId},this.httpOptions).pipe(
      catchError(this.errorhandler.handleError<Trip>("createTrip")),
    );
  }

  fetchAll(): Observable<Trip[]> {
    return this.http.get<Trip[]>(`${this.url}/${this.authService.userId}`,{responseType:"json"}).pipe(
      catchError(this.errorhandler.handleError<Trip[]>("fetchAll",[])),
    );
  } 
}
