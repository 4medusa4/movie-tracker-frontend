import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, debounceTime, distinctUntilChanged } from 'rxjs';
import AuthService from 'src/app/service/auth-service/auth-service.service';
import { MovieApiServiceService } from 'src/app/service/movie-api-service/movie-api-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  searchControl = new FormControl();

  constructor(private router: Router,
    private authService: AuthService,
    private movieService: MovieApiServiceService) {
    this.isLoggedIn$ = this.authService.isAuthenticatedSubject$;
  }
  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(newValue => {
      // this.sendSearchRequest(newValue);
      console.log(newValue, 'newvalue#');
    });
  }


  sendSearchRequestAsync(value: string) {
    this.movieService.getSearchMovieAsync(value).subscribe(result => {
      console.log(result, 'searchmovieresult#')
      this.movieService.setSearchResults(result);
    });
  }


  handleSignOut() {
    console.log('logout');
    console.log(sessionStorage.getItem('access_token'));
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
