// signup.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import AuthService from 'src/app/service/auth-service/auth-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  userFirstName: string = '';
  userLastName: string = '';
  userEmail: string = '';
  userPhone: string = '';
  userPassword: string = '';
  confirmPassword: string = '';

  // Error messages for each field
  firstNameError: string = '';
  lastNameError: string = '';
  emailError: string = '';
  phoneError: string = '';
  passwordError: string = '';
  confirmPasswordError: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmitHandler() {
    // Reset error messages
    this.resetErrorMessages();

    // Basic validation
    if (this.isValidForm()) {
      const data = {
        'firstname': this.userFirstName.trim().toLowerCase(),
        'lastname': this.userLastName.trim().toLowerCase(),
        'phone': this.userPhone.trim().toLowerCase(),
        'email': this.userEmail.trim().toLowerCase(),
        'password': this.userPassword.trim(),
        'role': 'USER'
      }

      // Perform signup logic using AuthService
      this.authService.newUserSignUp(data, this.onSuccessHandler, this.onErrorHandler).subscribe();
      
      // Redirect to login page on successful submission
      this.router.navigate(['/login'], { queryParams: { success: true } });
    }
  }

  isValidForm(): boolean {
    let isValid = true;

    // Validate First Name
    if (!this.userFirstName) {
      this.firstNameError = 'First Name is required.';
      isValid = false;
    }

    // Validate Last Name
    if (!this.userLastName) {
      this.lastNameError = 'Last Name is required.';
      isValid = false;
    }

    // Validate Email
    if (!this.userEmail) {
      this.emailError = 'Email is required.';
      isValid = false;
    }

    // Validate Phone
    if (!this.userPhone) {
      this.phoneError = 'Phone is required.';
      isValid = false;
    }

    // Validate Password
    if (!this.userPassword) {
      this.passwordError = 'Password is required.';
      isValid = false;
    }

    // Validate Confirm Password
    if (this.userPassword !== this.confirmPassword) {
      this.confirmPasswordError = 'Passwords do not match.';
      isValid = false;
    }

    return isValid;
  }

  resetErrorMessages() {
    this.firstNameError = '';
    this.lastNameError = '';
    this.emailError = '';
    this.phoneError = '';
    this.passwordError = '';
    this.confirmPasswordError = '';
  }

  onSuccessHandler(response: any) {
    // Handle success if needed
  }

  onErrorHandler(error: any) {
    console.error(error);
  }
}
