/**
 * This is the budget service component that retrieves and updates the budget information of a user.
 * @author Zach East
 */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';
import { User } from '../models/User';
import { Budget } from '../models/Budget';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class BudgetService {

    //Backend API to connect to
    private url = "https://softengbackair-production.up.railway.app/auth";

    isUserLoggedIn$ = new BehaviorSubject<boolean>(false);
    userId: User["id"];

    //Set format of data
    httpOptions: {headers:HttpHeaders}={
        headers: new HttpHeaders({"Content-Type" : "application/json"})
    }

    errorHandlerService: any;
    //Set up constructor
    constructor(private http:HttpClient, private errorhandler:ErrorHandlerService, private authService: AuthService) { }

    //Function for retrieving the current user's budget
    fetchBudget(): Observable<Budget[]> {
        return this.http.get<Budget[]>(`${this.url}/${this.authService.userId}`,{responseType:"json"}).pipe(
            catchError(this.errorhandler.handleError<Budget[]>("fetchBudget",)),
        );
    }

    //Function for updating the current user's budget
    updateBudget(formData: Pick<User,"budget">,userId: User["id"]):Observable<User>{
        return this.http.post<User>(`${this.url}/budget`,{
            id: userId,
            budget:formData.budget,
            },this.httpOptions).pipe(
            catchError(this.errorhandler.handleError<User>("updateBudget")),
        );
    }
}
