/**
 * This is the services file that controlls updating 
 * and displaying the Car reservation data
 * @author Zach East
 */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';
import { Car } from '../models/Car';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class CarReserveService {
  private url = "https://softengbackair-production.up.railway.app/cars";

  public carData!: [];
  public filteredCar!: [];

  isUserLoggedIn$ = new BehaviorSubject<boolean>(false);

  httpOptions: {headers:HttpHeaders}={
    headers: new HttpHeaders({"Content-Type" : "application/json"})
  }

  errorHandlerService: any;
  constructor(private http:HttpClient, private errorhandler:ErrorHandlerService) { }

  createCar(formData: Pick<Car,"tripname"|"description"|"rentalinfo"|"pickup"|"returntime"|"cost">,userId: User["id"]): Observable<Car>{
    return this.http.post<Car>(
      this.url,{
        tripname: formData.tripname, 
        description: formData.description, 
        rentalinfo: formData.rentalinfo,
        pickup: formData.pickup,
        returntime: formData.returntime,
        cost: formData.cost,
        userId: userId
      },this.httpOptions
        ).pipe(
      catchError(this.errorhandler.handleError<Car>("createCar")),
    );
  }

  fetchAll(): Observable<Car[]> {
    return this.http.get<Car[]>(this.url,{responseType:"json"}).pipe(
      catchError(this.errorhandler.handleError<Car[]>("fetchAll",[])),
    );
  } 
}
