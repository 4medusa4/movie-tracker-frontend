import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms'
import { MovieApiServiceService } from 'src/app/service/movie-api-service/movie-api-service.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-movie-upcoming',
  templateUrl: './comingsoon-movies.component.html',
  styleUrls: ['./comingsoon-movies.component.scss']
})
export class comingsoonMoviesComponent implements OnInit {

  constructor(private service: MovieApiServiceService, private router: Router) { }

  comingsoonMovieResult: any = []

  ngOnInit(): void {
    this.comingsoonMovieData();
  }

  comingsoonMovieData() {
    this.service.comingsoonMovieApiData().subscribe((result) => {
      console.log(result, 'comingsoonmovieresult#')
      this.comingsoonMovieResult = result.results;
    });
  }
}
