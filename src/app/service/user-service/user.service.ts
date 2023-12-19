import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import AuthService from '../auth-service/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private BASE_URL = environment.BASE_URL;

  constructor(private service: UserService, private authService: AuthService) {
  }

}
