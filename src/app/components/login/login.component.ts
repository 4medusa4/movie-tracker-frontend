import { Component } from '@angular/core';
import AuthService from 'src/app/service/auth-service/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {

  loginEmail: string = '';
  loginPassword: string = '';

  constructor(private authService: AuthService) { }
  onLoginHandler = () => {
    const _data = {
      'email': this.loginEmail.trim().toLowerCase(),
      'password': this.loginPassword.trim()
    }
    this.authService.newUserLogin(_data).subscribe()
  }
}
