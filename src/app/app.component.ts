import { Component } from '@angular/core';
import AuthService from './service/auth-service/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private authService: AuthService) { }
  title = 'movie-tracker-frontend';
}
