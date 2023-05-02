/**
 * This is the services file that controlls updating
 * and displaying the packing list data
 * @author Zach East
 */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';
import { Packinglist } from '../models/PackingList';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class PackinglistService {
  private url = "https://localhost:3000//packinglists";

  public packinglistData!: [];
  public filteredPackinglist!: [];
  public generatedPacking: [];

  isUserLoggedIn$ = new BehaviorSubject<boolean>(false);

  httpOptions: {headers:HttpHeaders}={
    headers: new HttpHeaders({"Content-Type" : "application/json"})
  }

  errorHandlerService: any;
  constructor(private http:HttpClient, private errorhandler:ErrorHandlerService) { }

  //add function to generate packing list
  //generatePacking()

  //add function to update packing list
  //updatePacking()

  createPackingList(formData: Pick<Packinglist,"tripname">,userId: User["id"], generatedList:string[]): Observable<Packinglist>{
    return this.http.post<Packinglist>(
      this.url,{
        tripname: formData.tripname,
        userId: userId,

        item1: generatedList[0],
        item2: generatedList[0],
        item3: generatedList[0],
        item4: generatedList[0],
        item5: generatedList[0],

        item6: generatedList[0],
        item7: generatedList[0],
        item8: generatedList[0],
        item9: generatedList[0],
        item10: generatedList[0],
      },this.httpOptions
        ).pipe(
      catchError(this.errorhandler.handleError<Packinglist>("createPackinglist")),
    );
  }

  fetchAll(): Observable<Packinglist[]> {
    return this.http.get<Packinglist[]>(this.url,{responseType:"json"}).pipe(
      catchError(this.errorhandler.handleError<Packinglist[]>("fetchAll",[])),
    );
  }
}
