import { Component, HostListener, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms'
import { MovieApiServiceService } from 'src/app/service/movie-api-service.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-movie',
  templateUrl: './new-release-movies.component.html',
  styleUrls: ['./new-release-movies.component.scss']
})
export class NewReleaseMoviesComponent implements OnInit {

  constructor(private service:MovieApiServiceService,  private router:Router){}

  trendingMovieResult:any=[]

  ngOnInit(): void {
    this.trendingMovieData();
  }

  trendingMovieData(){
  this.service.trendingMovieApiData().subscribe((result)=>{
    console.log(result, 'trendingmovieresult#')
    this.trendingMovieResult = result.results;
    });
  }
}
