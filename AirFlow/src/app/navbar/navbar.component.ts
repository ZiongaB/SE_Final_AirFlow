import { Component } from '@angular/core';
import { AuthService } from '../components/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isAuthenticated = false;

  constructor(private authService: AuthService, private router:Router){

  }

  ngOnInit(){
    this.authService.isUserLoggedIn$.subscribe((isLoggedIn)=>{
      this.isAuthenticated = isLoggedIn;
    })
  }

  logout(){
    localStorage.removeItem("token");
    this.authService.isUserLoggedIn$.next(false);
    this.router.navigate(["home"])
  }
}
