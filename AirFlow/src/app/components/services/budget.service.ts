import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';
import { User } from '../models/User';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class BudgetService {

    private url = "http://localhost:3000/auth";

    isUserLoggedIn$ = new BehaviorSubject<boolean>(false);
    userId: User["id"];

    httpOptions: {headers:HttpHeaders}={
        headers: new HttpHeaders({"Content-Type" : "application/json"})
    }
    
    errorHandlerService: any;
    constructor(private http:HttpClient, private errorhandler:ErrorHandlerService, private authService: AuthService) { }

    fetchBudget(): Observable<User> {
        return this.http.get<User>(`${this.url}/${this.authService.userId}`,{responseType:"json"}).pipe(
            catchError(this.errorhandler.handleError<User>("fetchAll",)),
        );
    }

    updateBudget(formData: Pick<User,"budget">,userId: User["id"]):Observable<User>{
        return this.http.patch<User>(this.url,{
            id: userId,
            budget:formData.budget,
            },this.httpOptions).pipe(
            catchError(this.errorhandler.handleError<User>("updateBudget")),
        );
    }
}