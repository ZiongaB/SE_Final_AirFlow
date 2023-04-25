import { ErrorHandler, Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { User } from '../models/User';
import { Observable,BehaviorSubject } from 'rxjs';
import { first,tap,catchError } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = "https://softengbackair-production.up.railway.app/auth";

  isUserLoggedIn$ = new BehaviorSubject<boolean>(false);
  userId: User["id"];
  token:String;

  httpOptions: {headers:HttpHeaders}={
    headers: new HttpHeaders({"Content-Type" : "application/json"})
  }
  length: any;
  constructor(private http:HttpClient,
    private errorHandlerService:ErrorHandlerService,
    private router: Router) { }

  signup(user:Omit<User,"id">):Observable<User>{
    return this.http.post<User>(`${this.url}/signup`,user,this.httpOptions).pipe(
      first(),
      catchError(this.errorHandlerService.handleError<User>("signup")),
    );
  }

  login(email : Pick<User,"email">,password : Pick<User,"password">) :Observable<{
    token:string; userId: User["id"]}> {
    return this.http.post( `${this.url}/login`,{email, password}, this.httpOptions)
    .pipe(
      first(Object),
       tap((tokenObject : {token: string; userId:User["id"]}) =>  {
        this.userId = tokenObject.userId;
        this.token = tokenObject.token;
        localStorage.setItem("token",tokenObject.token);
        this.isUserLoggedIn$.next(true);
        this.router.navigate(["home"]);
      }),
      catchError(this.errorHandlerService.handleError<{token:string; userId: User["id"]}>("login")),
    );
  }

}
