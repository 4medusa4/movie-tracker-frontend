import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { MovieApiServiceService } from 'src/app/service/movie-api-service/movie-api-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private service: MovieApiServiceService, private router: Router) { }

  bannerResult: any = []
  trendingMovieResult: any = []
  upcomingMovieResult: any = []

  ngOnInit(): void {
    this.bannerData();
    this.trendingMovieData();
    this.upcomingMovieData();
  }

  bannerData() {
    this.service.bannerApiData().subscribe((result) => {
      console.log(result, 'bannerresult#')
      this.bannerResult = result.results;
    });
  }

  trendingMovieData() {
    this.service.trendingMovieApiData().subscribe((result) => {
      console.log(result, 'trendingmovieresult#')
      this.trendingMovieResult = result.results;
    });
  }

  upcomingMovieData() {
    this.service.upcomingMovieApiData().subscribe((result) => {
      console.log(result, 'upcomingmovieresult#')
      this.upcomingMovieResult = result.results;
    });
  }


  faPlayCircle = faPlayCircle;
  selectedTab: 'nowShowing' | 'upcomingSoon' = 'nowShowing';

  showNowShowing() {
    this.selectedTab = 'nowShowing';
  }

  showUpcomingSoon() {
    this.selectedTab = 'upcomingSoon';
  }
}

