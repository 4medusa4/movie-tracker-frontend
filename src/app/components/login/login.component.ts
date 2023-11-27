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

  emailError: string = '';
  passwordError: string = '';
  serverError: string = '';

  constructor(private authService: AuthService, private router: Router) { }
  onLoginHandler = () => {
        // Reset error messages
        this.emailError = '';
        this.passwordError = '';
        this.serverError = '';

            // Validation checks
    if (!this.loginEmail) {
      this.emailError = 'Email is required';
    }

    if (!this.loginPassword) {
      this.passwordError = 'Password is required';
    }

    // If any validation error exists, stop further processing
    if (this.emailError || this.passwordError) {
      return;
    }

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
    this.serverError = 'Incorrect email or password';
  }
}
