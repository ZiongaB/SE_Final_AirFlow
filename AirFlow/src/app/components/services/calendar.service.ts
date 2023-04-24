/**
 * This is the services file that controlls updating 
 * and displaying the Calendar data
 * @author Zach East
 */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';
import { CalendarItem } from '../models/CalendarItem';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  private url = "https://softengbackair-production.up.railway.app/calendar";
  isUserLoggedIn$ = new BehaviorSubject<boolean>(false);

  public calendarItems!: CalendarItem[];
  public filteredCalendar!: CalendarItem[];

  httpOptions: {headers:HttpHeaders}={
    headers: new HttpHeaders({"Content-Type" : "application/json"})
  }

  errorHandlerService: any;
  constructor(private http:HttpClient, private errorhandler:ErrorHandlerService) { }

  createCalItem(formData: Pick<CalendarItem,"event" | "start" | "end">,userId: User["id"]): Observable<CalendarItem>{
    return this.http.post<CalendarItem>(this.url,{event: formData.event, start: formData.start, userId: userId},this.httpOptions).pipe(
      catchError(this.errorhandler.handleError<CalendarItem>("createCalendarItem")),
    );
  }

  //Need to add a way to convert datetime to date?
  //convert2Date(){}
  //convert2DateTime(){}

  fetchAll(): Observable<CalendarItem[]> {
    return this.http.get<CalendarItem[]>(this.url,{responseType:"json"}).pipe(
      catchError(this.errorhandler.handleError<CalendarItem[]>("fetchAll",[])),
    );
  } 

}
