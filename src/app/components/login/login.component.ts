// login.component.ts

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

  constructor(private authService: AuthService, private router: Router) {}

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

    // Continue with login logic
    const _data = {
      'email': this.loginEmail.trim().toLowerCase(),
      'password': this.loginPassword.trim()
    };

    // Provide success and error callbacks
    this.authService.newUserLogin(
      _data,
      this.onSuccessHandler,
      this.onErrorHandler
    ).subscribe();
  };

  onSuccessHandler = (response: any) => {
    this.router.navigate(['/home'], { queryParams: { success: true } });
  };

  onErrorHandler = (error: any) => {
    // Handle server error or specific error messages
    this.serverError = 'Incorrect email or password';
  };
}
