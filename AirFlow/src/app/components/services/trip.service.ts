import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  private url = "http://localhost:3000/auth";

  isUserLoggedIn$ = new BehaviorSubject<boolean>(false);
 

  httpOptions: {headers:HttpHeaders}={
    headers: new HttpHeaders({"Content-Type" : "application/json"})
  }
  constructor(private http:HttpClient, private errorhandler:ErrorHandlerService) { }


}
