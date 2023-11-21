import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieApiServiceService } from 'src/app/service/movie-api-service.service';



@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
  
})
export class MovieDetailsComponent implements OnInit {
  getMovieResult:any;
  getMovieTrailerResult:any
  getMovieCastResult: any;
  getMovieCrewResult: any;


  constructor(private service:MovieApiServiceService, private router:ActivatedRoute){}


  ngOnInit(): void {
    let getParamId = this.router.snapshot.paramMap.get('id');
    console.log(getParamId,'getparamid#');
    this.getMovie(getParamId);
    this.getMovieTrailer(getParamId);
    this.getMovieCast(getParamId);
    this.getMovieCrew(getParamId);

  }

  getMovie(id:any){
    this.service.getMovieDetails(id).subscribe((result)=>{
      console.log(result, 'getmoviedetails#')
      this.getMovieResult = result;
    });
  }

  getMovieTrailer(id:any){
    this.service.getMovieTrailer(id).subscribe((result)=>{
      console.log(result, 'getmovietrailer#')
      result.results.forEach((element:any) => {
        if(element.type=="Trailer"){
          this.getMovieTrailerResult=element.key
        }
      });
    });
  }

  getMovieCast(id:any){
    this.service.getMovieCast(id).subscribe((result)=>{
      console.log(result, 'getmoviecast#')
      this.getMovieCastResult = result.cast;
    });
  }

  getMovieCrew(id:any){
    this.service.getMovieCrew(id).subscribe((result)=>{
      console.log(result, 'getmoviecrew#')
      this.getMovieCrewResult = result.crew;
    });
  }
}
