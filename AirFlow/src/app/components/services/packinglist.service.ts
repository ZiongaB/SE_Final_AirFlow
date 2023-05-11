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
import { AuthService } from './auth.service';
import { Packing } from '../models/Packing';

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
  constructor(private http:HttpClient, private errorhandler:ErrorHandlerService,private authService:AuthService) { }

  //add function to generate packing list
  //generatePacking()

  //add function to update packing list
  //updatePacking()


  editPackingList(list:Packing[],tripid:Number):Observable<Packinglist>{
    return this.http.post<Packinglist>(
      `${this.url}/edit`,{
        tripid:tripid,
        checked1:list[0].checked,
        checked2:list[1].checked,
        checked3:list[2].checked,
        checked4:list[3].checked,
        checked5:list[4].checked,
        checked6:list[5].checked,
        checked7:list[6].checked,
        checked8:list[7].checked,
        checked9:list[8].checked,
        checked10:list[9].checked,
      },this.httpOptions
      ).pipe(
    catchError(this.errorhandler.handleError<Packinglist>("editPackinglist")),
  );
    
  }

  createPackingList(formData: Pick<Packinglist,"tripname">,userId: User["id"],listofItems:String[],tripid:Number): Observable<Packinglist>{

    return this.http.post<Packinglist>(
      `${this.url}/create`,{
        tripname: formData.tripname,
        userId: userId,
        tripid:tripid,
        item1:listofItems[0],
        item2:listofItems[1],
        item3:listofItems[2],
        item4:listofItems[3],
        item5:listofItems[4],
        item6:listofItems[5],
        item7:listofItems[6],
        item8:listofItems[7],
        item9:listofItems[8],
        item10:listofItems[9],

      },this.httpOptions
        ).pipe(
      catchError(this.errorhandler.handleError<Packinglist>("createPackinglist")),
    );
  }

  fetchAll(): Observable<Packinglist[]> {
    return this.http.get<Packinglist[]>(`${this.url}/${this.authService.userId}`,{responseType:"json"}).pipe(
      catchError(this.errorhandler.handleError<Packinglist[]>("fetchAll",[])),
    );
  }
}

