import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import AuthService from 'src/app/service/auth-service/auth-service.service';
import { MovieApiServiceService } from 'src/app/service/movie-api-service/movie-api-service.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})


export class NavbarComponent implements OnInit{

  searchResult: any;
  searchMovieResult: any;
  showSearchData: boolean = false;  // Add a boolean flag
  isLoggedIn$: Observable<boolean>;

  constructor(private service: MovieApiServiceService, private router: Router, private authService: AuthService, private route: ActivatedRoute) {
    this.isLoggedIn$ = this.authService.isAuthenticatedSubject$;
  }
  
    ngOnInit(): void {
      // Subscribe to route parameter changes
      this.route.params.subscribe(params => {
        // Check if the route parameter 'id' is present
        this.showSearchData = !params['id'];
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

  // submitForm() {
  //   console.log(this.searchForm.value, 'searchForm#')
  //   this.service.getSearchMovie(this.searchForm.value).subscribe((result) => {
  //     console.log(result, 'searchmovie#');
  //     this.searchResult = result.results
  //   });
  // }

  // searchMovieData() {
  //   this.service.trendingMovieApiData().subscribe((result) => {
  //     console.log(result, 'searchmovieresult#')
  //     this.searchMovieResult = result.results;
  //   });
  // }

  searchForm = new FormGroup({
    'movieName': new FormControl(null)
  });

  submitForm() {
    console.log(this.searchForm.value, 'searchForm#')
    this.service.getSearchMovie(this.searchForm.value).subscribe((result) => {
      console.log(result, 'searchmovie#');
      this.searchResult = result.results
    });
  }

  searchMovieData() {
    this.service.trendingMovieApiData().subscribe((result) => {
      console.log(result, 'searchmovieresult#')
      this.searchMovieResult = result.results;
    });
  }

}
