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
  private url = "https://softengbackair-production.up.railway.app/packinglists";

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

  createPackingList(formData: Pick<Packinglist,"tripname">,userId: User["id"]): Observable<Packinglist>{

    return this.http.post<Packinglist>(
      this.url,{
        tripname: formData.tripname,
        userId: userId,
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


// tripid:tripid, surprise tool for later , generatedList:string[],tripid:Number
// item1: generatedList[0],
// item2: generatedList[1],
// item3: generatedList[2],
// item4: generatedList[3],
// item5: generatedList[4],

// item6: generatedList[5],
// item7: generatedList[6],
// item8: generatedList[7],
// item9: generatedList[8],
// item10: generatedList[9],
