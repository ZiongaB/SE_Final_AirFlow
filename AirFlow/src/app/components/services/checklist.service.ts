/**
 * This is the services file that controlls updating
 * and displaying the checklist data
 * @author Zach East
 */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';
import { Checklist } from '../models/Checklist';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class ChecklistService {
  private url = "https://softengbackair-production.up.railway.app/checklists";

  public checklistData!: [];
  public filteredChecklists!: [];

  isUserLoggedIn$ = new BehaviorSubject<boolean>(false);

  httpOptions: {headers:HttpHeaders}={
    headers: new HttpHeaders({"Content-Type" : "application/json"})
  }

  errorHandlerService: any;
  constructor(private http:HttpClient, private errorhandler:ErrorHandlerService) { }

  createChecklist(formData: Pick<Checklist,
    "tripname"
    >,userId: User["id"]): Observable<Checklist>{
    return this.http.post<Checklist>(
      this.url,{
        tripname: formData.tripname,
        userId: userId
      },this.httpOptions
        ).pipe(
      catchError(this.errorhandler.handleError<Checklist>("createChecklist")),
    );
  }

  //Need to add function for updating checklist
  //updateChecklist(){}

  fetchAll(): Observable<Checklist[]> {
    return this.http.get<Checklist[]>(this.url,{responseType:"json"}).pipe(
      catchError(this.errorhandler.handleError<Checklist[]>("fetchAll",[])),
    );
  }

}
