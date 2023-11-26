import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class MovieApiServiceService {

  constructor(private http:HttpClient) { }

  base_url = "https://api.themoviedb.org/3";
  // apikey = "d3084da6f3cd42ca9f3a122b1d6d146a";

  baseurl = "http://localhost:8080/api/v1";
  apikey = "d3084da6f3cd42ca9f3a122b1d6d146a";

  bannerApiData():Observable<any>{  //most popular movies watch in sri lanka

    const payload = {
        "airDateGte": null,
        "airDateLte": null,
        "certification": null,
        "certificationCountry": "",
        "debug": false,
        "firstAirDateGte": null,
        "firstAirDateLte": null,
        "page": 1,
        "primaryReleaseDateGte": null,
        "primaryReleaseDateLte": null,
        "region": "US",
        "releaseDateGte": "",
        "releaseDateLte": "",
        "showMe": 0,
        "sortBy": "popularity",
        "voteAverageGte": 0.0,
        "voteAverageLte": 10.0,
        "voteCountGte": 0,
        "watchRegion": "LK",
        "withGenres": "",
        "withKeywords": null,
        "withNetworks": null,
        "withOriginCountry": null,
        "withOriginalLanguage": "en",
        "withWatchMonetizationTypes": null,
        "withWatchProviders": null,
        "withReleaseType": "",
        "withRuntimeGte": 0,
        "withRuntimeLte": 400
    };
    return this.http.post(`${this.baseurl}/tmdb/movies`,payload);
  }

  trendingMovieApiData():Observable<any>{ //new release movies watch in sri lanka

    const payload = {
      "airDateGte": null,
      "airDateLte": null,
      "certification": null,
      "certificationCountry": "",
      "debug": false,
      "firstAirDateGte": null,
      "firstAirDateLte": null,
      "page": 1,
      "primaryReleaseDateGte": null,
      "primaryReleaseDateLte": null,
      "region": "US",
      "releaseDateGte": "",
      "releaseDateLte": "",
      "showMe": 0,
      "sortBy": "popularity",
      "voteAverageGte": 0.0,
      "voteAverageLte": 10.0,
      "voteCountGte": 0,
      "watchRegion": "LK",
      "withGenres": "",
      "withKeywords": null,
      "withNetworks": null,
      "withOriginCountry": null,
      "withOriginalLanguage": "en",
      "withWatchMonetizationTypes": null,
      "withWatchProviders": null,
      "withReleaseType": "",
      "withRuntimeGte": 0,
      "withRuntimeLte": 400
  };
  
    return this.http.post(`${this.baseurl}/tmdb/movies`,payload);
  }

  upcomingMovieApiData():Observable<any>{ //new release movies watch in sri lanka

  //   const payload = {
  //     "airDateGte": null,
  //     "airDateLte": null,
  //     "certification": null,
  //     "certificationCountry": "",
  //     "debug": false,
  //     "firstAirDateGte": null,
  //     "firstAirDateLte": null,
  //     "page": 1,
  //     "primaryReleaseDateGte": null,
  //     "primaryReleaseDateLte": null,
  //     "region": "US",
  //     "releaseDateGte": "",
  //     "releaseDateLte": "",
  //     "showMe": 0,
  //     "sortBy": "popularity",
  //     "voteAverageGte": 0.0,
  //     "voteAverageLte": 10.0,
  //     "voteCountGte": 0,
  //     "watchRegion": "LK",
  //     "withGenres": "",
  //     "withKeywords": null,
  //     "withNetworks": null,
  //     "withOriginCountry": null,
  //     "withOriginalLanguage": "en",
  //     "withWatchMonetizationTypes": null,
  //     "withWatchProviders": null,
  //     "withReleaseType": "",
  //     "withRuntimeGte": 0,
  //     "withRuntimeLte": 400
  // };

      // return this.http.post(`${this.baseurl}/tmdb/movies`,payload);

  return this.http.get(`${this.base_url}/trending/movie/week?api_key=${this.apikey}`);

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
