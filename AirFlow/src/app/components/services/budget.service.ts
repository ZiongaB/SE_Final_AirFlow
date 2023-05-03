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

    private url = "http://localhost:3000/auth";

    isUserLoggedIn$ = new BehaviorSubject<boolean>(false);
    userId: User["id"];

    httpOptions: {headers:HttpHeaders}={
        headers: new HttpHeaders({"Content-Type" : "application/json"})
    }
    
    errorHandlerService: any;
    constructor(private http:HttpClient, private errorhandler:ErrorHandlerService, private authService: AuthService) { }

    fetchBudget(): Observable<Budget[]> {
        return this.http.get<Budget[]>(`${this.url}/${this.authService.userId}`,{responseType:"json"}).pipe(
            catchError(this.errorhandler.handleError<Budget[]>("fetchAll",)),
        );
    }

<<<<<<< Updated upstream
    updateBudget(formData: Pick<User,"email"|"budget">,userId: User["id"]):Observable<User>{
        return this.http.patch<User>(this.url,{
            email: formData.email,
=======
    updateBudget(formData: Pick<User,"budget">,userId: User["id"]):Observable<User>{
        return this.http.post<User>(`${this.url}/budget`,{
            id: userId,
>>>>>>> Stashed changes
            budget:formData.budget,
            userId: userId
            },this.httpOptions).pipe(
            catchError(this.errorhandler.handleError<User>("updateBudget")),
        );
    }
}