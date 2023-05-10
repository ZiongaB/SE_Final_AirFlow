/**
 * This is the services file that controlls updating
 * and displaying the Car reservation data
 * @author Zach East
 */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, first } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';
import { Car } from '../models/Car';
import { User } from '../models/User';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CarReserveService {
  private url = "hhttps://softengbackair-production.up.railway.app/cars";

  public carData!: [];
  public filteredCar!: [];

  isUserLoggedIn$ = new BehaviorSubject<boolean>(false);

  httpOptions: {headers:HttpHeaders}={
    headers: new HttpHeaders({"Content-Type" : "application/json"})
  }

  errorHandlerService: any;

  constructor(
    private http:HttpClient,
    private errorhandler:ErrorHandlerService,
    private authService:AuthService
  ) { }

  createCar(formData: Pick<Car,"tripname"|"description"|"rentalinfo"|"pickup"|"pickup2"|"returntime"|"returntime2"|"cost">,userId: User["id"]): Observable<Car>{
    return this.http.post<Car>(
      this.url,{
        tripname: formData.tripname,
        description: formData.description,
        rentalinfo: formData.rentalinfo,
        pickup: formData.pickup.getFullYear()+"-"+(formData.pickup.getUTCMonth()+1) +"-"+formData.pickup.getDate() +" "+formData.pickup2+":00",
        returntime: formData.returntime.getFullYear()+"-"+(formData.returntime.getUTCMonth()+1) +"-"+formData.returntime.getDate() +" "+formData.returntime2+":00",
        cost: formData.cost,
        userId: userId
      },this.httpOptions
        ).pipe(
      catchError(this.errorhandler.handleError<Car>("createCar")),
    );
  }

  fetchAll(): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.url}/${this.authService.userId}`,{responseType:"json"}).pipe(
      catchError(this.errorhandler.handleError<Car[]>("fetchAll",[])),
    );
  }

  deleteCar(postId: Number): Observable<{}>{
    return this.http.delete<Car>(`${this.url}/${postId}`,this.httpOptions).pipe(first(),
    catchError(this.errorhandler.handleError<Car>("deleteCar"))
    );
  }

}
