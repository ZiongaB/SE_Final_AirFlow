import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate,Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
/*
This service checks to see if you are logged in or not, if not it will route you to the home page.
*/
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService,private router: Router) { }

  canActivate(): Observable<boolean> {
      if(!this.authService.isUserLoggedIn$.value){
        this.router.navigate([""])
      }
      return this.authService.isUserLoggedIn$;
  }
}
