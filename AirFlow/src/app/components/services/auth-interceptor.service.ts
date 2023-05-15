import { Injectable } from '@angular/core';
import {HttpEvent,HttpInterceptor,HttpHandler,HttpRequest} from '@angular/common/http';
import{ Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
//This service intercepts all Http requests that this website sends and adds the identity token in the Authorization header to show that
//you are logged in.

export class AuthInterceptorService implements HttpInterceptor{
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const token = localStorage.getItem("token");
      if(token){
        const clonedRequest = req.clone({
          headers: req.headers.set("Authorization", "Bearer "+token)
        })
        return next.handle(clonedRequest);
      }else{
        return next.handle(req);
      }
  }
  constructor() { }
}
