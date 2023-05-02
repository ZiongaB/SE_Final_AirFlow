import { Component } from '@angular/core';
import { FormControl,FormGroup,Validator, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(private authService: AuthService){  }

  createFormGroup():FormGroup{
    return new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(7)])
    })
  }
   // this is our method name that is going to be triggered
  //  onAddPost(){
  //   alert('Logined in');
  //   // we want to get information about the posts
  // }
  ngOnInit():void {
    this.loginForm = this.createFormGroup();
  }
  login(): void{
    this.authService.login(this.loginForm.value.email,this.loginForm.value.password).subscribe( res => {
      alert('Logged in');
    });

  }

}
