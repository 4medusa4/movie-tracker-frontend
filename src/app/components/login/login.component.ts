import { Component } from '@angular/core';
import { Router } from '@angular/router';
import AuthService from 'src/app/service/auth-service/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {

  loginEmail: string = '';
  loginPassword: string = '';

  constructor(private authService: AuthService, private router: Router) { }
  onLoginHandler = () => {
    const _data = {
      'email': this.loginEmail.trim().toLowerCase(),
      'password': this.loginPassword.trim()
    }
    this.authService.newUserLogin(
      _data,
      this.onSuccessHandler,
      this.onErrorHandler
    ).subscribe()
  }

  onSuccessHandler = (response: any) => {
    this.router.navigate(['/home'], { queryParams: { success: true } })
  }

  onErrorHandler = (e: any) => {
    console.log(e)
  }
}
