import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import AuthService from 'src/app/service/auth-service/auth-service.service';
import { MovieApiServiceService } from 'src/app/service/movie-api-service/movie-api-service.service';


@Component({
  selector: 'app-navbar-user',
  templateUrl: './navbar-user.component.html',
  styleUrls: ['./navbar-user.component.scss']
})
export class NavbarUserComponent implements OnInit{
onLogoutHandler() {
throw new Error('Method not implemented.');
}

  searchResult: any;
  searchMovieResult: any;
  isLoggedIn: boolean = false;

  constructor(private service: MovieApiServiceService, private router: Router, private authService: AuthService) { }
  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
    });  }
  title = 'movie-tracker-frontend';

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


  // navbg: { [klass: string]: any; } | null | undefined;

  // navbg = any;
  // @HostListener('document:scroll') scrollover() {
  //   console.log(document.body.scrollTop, 'scrolllength#');

  //   if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
  //     this.navbg = {
  //       'background-color': '#ffffff'
  //     };
  //   } else {
  //     this.navbg = {};
  //   }
  // }

}
