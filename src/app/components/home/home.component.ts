import { Component,OnInit } from '@angular/core';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { MovieApiServiceService } from 'src/app/service/movie-api-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  constructor(private service:MovieApiServiceService){}

  bannerResult:any=[]
  trendingMovieResult:any=[]

  ngOnInit(): void {
    this.bannerData();
    this.trendingMovieData();
  }

  bannerData(){
    this.service.bannerApiData().subscribe((result)=>{
      console.log(result, 'bannerresult#')
      this.bannerResult = result.results;
    });
  }

  trendingMovieData(){
    this.service.trendingMovieApiData().subscribe((result)=>{
      console.log(result, 'trendingmovieresult#')
      this.trendingMovieResult = result.results;
    });
  }


  faPlayCircle = faPlayCircle;
  selectedTab: 'nowShowing' | 'upcomingSoon' = 'nowShowing';

  showNowShowing() {
    this.selectedTab = 'nowShowing';
  }

  showUpcomingSoon() {
    this.selectedTab = 'upcomingSoon';
}}

