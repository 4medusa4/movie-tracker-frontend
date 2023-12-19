import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import AuthService from 'src/app/service/auth-service/auth-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isLoggedIn$: Observable<boolean>;
  constructor(private router: Router, private authService: AuthService) {
    this.isLoggedIn$ = this.authService.isAuthenticatedSubject$;
  }


  handleSignOut() {
    this.authService.logout().subscribe((res: any) => {
      this.router.navigate(['/login']);
    });
  }

  gotoSignUp() {
    this.router.navigate(['/signup']);
  }

  gotoSignIn() {
    this.router.navigate(['/login']);
  }
}
