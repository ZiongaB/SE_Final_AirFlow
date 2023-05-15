import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { AuthService } from '../components/services/auth.service';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import { Output} from '@angular/core';
import { EventEmitter } from '@angular/core';



/**
 * Before using BreakpointObserver we need
 * import { LayoutModule } from '@angular/cdk/layout';
 *  imports: [
    BrowserModule,
    LayoutModule
  ],
  *
  *from npm install @angular/cdk
 */

// import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent{
  isAuthenticated = false;

  constructor(private authService: AuthService, private router:Router, ){}

    //Sebastian start
    isMenuOpen = false;

    // toggleMenu
    toogleMenu():void{
      this.isMenuOpen = !this.isMenuOpen;
    }
    // Sebastian end

  // Andrews work
  ngOnInit(){
    this.authService.isUserLoggedIn$.subscribe((isLoggedIn)=>{
      this.isAuthenticated = isLoggedIn;
    })
  }
  logout(){
    localStorage.removeItem("token");
    this.authService.isUserLoggedIn$.next(false);
    this.router.navigate([""])
  }
}
 // Andrews work ends here
