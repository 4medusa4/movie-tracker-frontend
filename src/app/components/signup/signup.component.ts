import { Component } from '@angular/core';
import { Router } from '@angular/router';
import AuthService from 'src/app/service/auth-service/auth-service.service'

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
  constructor(private authService: AuthService, private router: Router) { }

  onSubmitHandler = () => {
    const data = {
      'firstname': this.userFirstName.trim().toLowerCase(),
      'lastname': this.userLastName.trim().toLowerCase(),
      'phone': this.userPhone.trim().toLowerCase(),
      'email': this.userEmail.trim().toLowerCase(),
      'password': this.userPassword.trim(),
      'role': 'USER'
    }

    this.authService.newUserSignUp(
      data,
      this.onSuccessHandler,
      this.onErrorHandler)
      .subscribe()
  }

  onSuccessHandler = (response: any) => {
    this.router.navigate(['/login'], { queryParams: { success: true } })
  }

  onErrorHandler = (e: any) => {
    console.log(e)
  }
}
