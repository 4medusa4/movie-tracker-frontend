import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieApiServiceService } from 'src/app/service/movie-api-service/movie-api-service.service';



@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']

})
export class MovieDetailsComponent implements OnInit {
  getMovieResult: any;
  getMovieTrailerResult: any
  getMovieCastResult: any;
  getMovieCrewResult: any;


  constructor(private service: MovieApiServiceService, private router: ActivatedRoute) { }


  ngOnInit(): void {
    let getParamId = this.router.snapshot.paramMap.get('id');
    console.log(getParamId, 'getparamid#');
    this.getMovie(getParamId);
    this.getMovieTrailer(getParamId, (resp: any) => { console.log(resp) }, (e: any) => { console.log(e) });
    this.getMovieCast(getParamId, (resp: any) => { console.log(resp) }, (e: any) => { console.log(e) });
    this.getMovieCrew(getParamId, (resp: any) => { console.log(resp) }, (e: any) => { console.log(e) });

  }

  getMovie(id: any) {
    this.service.getMovieDetails(id).subscribe((result) => {
      console.log(result, 'getmoviedetails#')
      this.getMovieResult = result;
    });
  }

  getMovieTrailer(id: any, successCallback: Function, errorCallback: Function) {
    this.service.getMovieTrailer(id, successCallback, errorCallback).subscribe((result) => {
      result.results.forEach((element: any) => {
        if (element.type == "Trailer") {
          this.getMovieTrailerResult = element.key
        }
      });
    });
  }

  getMovieCast(id: any, successCallback: Function, errorCallback: Function) {
    this.service.getMovieCredits(id, successCallback, errorCallback).subscribe((result) => {
      this.getMovieCastResult = result.cast;
    });
  }

  getMovieCrew(id: any, successCallback: Function, errorCallback: Function) {
    this.service.getMovieCredits(id, successCallback, errorCallback).subscribe((result) => {
      this.getMovieCrewResult = result.crew;
    });
  }
}
