import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieApiServiceService } from 'src/app/service/movie-api-service/movie-api-service.service';
@Component({
  selector: 'app-movie-upcoming',
  templateUrl: './upcoming-movies.component.html',
  styleUrls: ['./upcoming-movies.component.scss']
})
export class UpcomingMoviesComponent implements OnInit {

  constructor(private service: MovieApiServiceService, private router: Router) { }

  upcomingMovieResult: any = []

  ngOnInit(): void {
    this.upcomingMovieData();
  }

  upcomingMovieData() {
    this.service.upcomingMovieApiData().subscribe((result) => {
      console.log(result, 'upcomingmovieresult#')
      this.upcomingMovieResult = result.results;
    });
  }
}
