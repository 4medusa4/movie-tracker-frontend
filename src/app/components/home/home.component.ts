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
  selectedLanguage: string = ''

  constructor(private service: MovieApiServiceService, private router: Router) { }

  bannerResult: any = []
  trendingMovieResult: any = []
  upcomingMovieResult: any = []
  comingSoonMovieResult: any = []

  ngOnInit(): void {
    this.bannerData();
    this.trendingMovieData();
    this.upcomingMovieData();
    this.comingSoonMovieData();
  }

  bannerData() {
    this.service.bannerApiData().subscribe((result) => {
      console.log(result, 'bannerresult#')
      this.bannerResult = result.results;
    });
  }

  onLanguageChange(event: any) {
    const selectedLanguage = event.target.value;
    this.service.updateLanguage(selectedLanguage);
    this.trendingMovieData();
    this.upcomingMovieData();
    this.comingSoonMovieData();
    // this.router.navigate(['/new-release-movies', { language: selectedLanguage }]);
    
}

onViewNewRelease(){
      this.router.navigate(['/new-release-movies', { language: this.selectedLanguage }]);
}

onViewComingSoon(){
  this.router.navigate(['/coming-soon-movies', { language: this.selectedLanguage }]);
}

onViewUpcoming(){
  this.router.navigate(['/upcoming-movies', { language: this.selectedLanguage }]);
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

  comingSoonMovieData() {
    this.service.comingsoonMovieApiData().subscribe((result) => {
      console.log(result, 'comingsoonmovieresult#')
      this.comingSoonMovieResult = result.results;
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

