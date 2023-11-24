import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class MovieApiServiceService {

  constructor(private http:HttpClient) { }

  // baseurl = "https://api.themoviedb.org/3";
  // apikey = "d3084da6f3cd42ca9f3a122b1d6d146a";

  baseurl = "https://api.themoviedb.org/3";
  apikey = "d3084da6f3cd42ca9f3a122b1d6d146a";

  bannerApiData():Observable<any>{
    return this.http.get(`${this.baseurl}/trending/all/week?api_key=${this.apikey}`);
  }

  trendingMovieApiData():Observable<any>{
    return this.http.get(`${this.baseurl}/trending/movie/day?api_key=${this.apikey}`);
  }

  getSearchMovie(data:any):Observable<any>{
    // console.log(data,'movie#');
    return this.http.get(`${this.baseurl}/search/movie?api_key=${this.apikey}&query=${data.movieName}`);
  }

  getMovieDetails(data:any):Observable<any>{
    // console.log(data,'movie#');
    return this.http.get(`${this.baseurl}/movie/${data}?api_key=${this.apikey}`);
  }

  getMovieTrailer(data:any):Observable<any>{
    // console.log(data,'movie#');s
    return this.http.get(`${this.baseurl}/movie/${data}/videos?api_key=${this.apikey}`);
  }

  getMovieCast(data:any):Observable<any>{
    // console.log(data,'movie#');
    return this.http.get(`${this.baseurl}/movie/${data}/credits?api_key=${this.apikey}`);
  }

  getMovieCrew(data:any):Observable<any>{
    // console.log(data,'movie#');
    return this.http.get(`${this.baseurl}/movie/${data}/credits?api_key=${this.apikey}`);
  }
}
