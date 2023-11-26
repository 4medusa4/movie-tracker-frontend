import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class MovieApiServiceService {

  constructor(private http: HttpClient) { }

  tmdb_base_url = "https://api.themoviedb.org/3";
  // apikey = "d3084da6f3cd42ca9f3a122b1d6d146a";

  baseurl = "http://localhost:8080/api/v1";
  apikey = "d3084da6f3cd42ca9f3a122b1d6d146a";

  private selectedLanguage: string = 'en'; // Default language

    // Method to update the selected language
  updateLanguage(language: string) {
  console.log('Updating language to:', language);
  this.selectedLanguage = language;
  console.log('Selected language updated to:', this.selectedLanguage);
  }

    // Method to get the currently selected language
    getSelectedLanguage(): string {
      return this.selectedLanguage;
    }

  bannerApiData(): Observable<any> {  //most popular movies watch in sri lanka

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
      "withRuntimeLte": 400
    };
    return this.http.post(`${this.baseurl}/tmdb/movies`, payload);
  }


  // Method to construct the payload with the selected language
  private getPayloadWithLanguage(apiType: string): any {
    const today = new Date();
    const oneWeekLater = new Date();
    oneWeekLater.setDate(today.getDate() + 7);

    const threeMonthsLater = new Date();
    threeMonthsLater.setMonth(today.getMonth() + 3);

    let payload: any;

    // Customize the payload based on the API type
    switch (apiType) {
      case 'trending':
        payload = {
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
      "withOriginalLanguage": this.selectedLanguage,
      "withWatchMonetizationTypes": null,
      "withWatchProviders": null,
      "withReleaseType": "",
      "withRuntimeGte": 0,
      "withRuntimeLte": 400
        };
        break;
      case 'upcoming':
        payload = {
        "airDateLte": null,
        "certification": null,
        "certificationCountry": "",
        "debug": false,
        "firstAirDateGte": null,
        "firstAirDateLte": null,
        "page": 2,
        "primaryReleaseDateGte": oneWeekLater.toISOString().split('T')[0],
        "primaryReleaseDateLte": threeMonthsLater.toISOString().split('T')[0],
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
        "withOriginalLanguage": this.selectedLanguage,
        "withWatchMonetizationTypes": null,
        "withWatchProviders": null,
        "withReleaseType": "",
        "withRuntimeGte": 0,
        "withRuntimeLte": 400
        };
        break;
      case 'comingsoon':
        payload = {
        "airDateLte": null,
        "certification": null,
        "certificationCountry": "",
        "debug": false,
        "firstAirDateGte": null,
        "firstAirDateLte": null,
        "page": 2,
        "primaryReleaseDateGte": today.toISOString().split('T')[0],
        "primaryReleaseDateLte": oneWeekLater.toISOString().split('T')[0],
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
        "withOriginalLanguage": this.selectedLanguage,
        "withWatchMonetizationTypes": null,
        "withWatchProviders": null,
        "withReleaseType": "",
        "withRuntimeGte": 0,
        "withRuntimeLte": 400
        };
        break;
      default:
        // Default payload if no matching type is found
        payload = {};
    }

    // Common properties for all payloads
    payload = {
      ...payload,
      "withOriginalLanguage": this.selectedLanguage,
      // ...other common properties
    };

    return payload;
  }

  // API method to get trending movies
  trendingMovieApiData(): Observable<any> {
    const payload = this.getPayloadWithLanguage('trending');
    return this.http.post(`${this.baseurl}/tmdb/movies`, payload);
  }

  // API method to get upcoming movies
  upcomingMovieApiData(): Observable<any> {
    const payload = this.getPayloadWithLanguage('upcoming');
    return this.http.post(`${this.baseurl}/tmdb/movies`, payload);
  }

  // API method to get coming soon movies
  comingsoonMovieApiData(): Observable<any> {
    const payload = this.getPayloadWithLanguage('comingsoon');
    return this.http.post(`${this.baseurl}/tmdb/movies`, payload);
  }







  // trendingMovieApiData(): Observable<any> { //new release movies watch in sri lanka

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
  //     "withRuntimeLte": 400
  //   };

  //   return this.http.post(`${this.baseurl}/tmdb/movies`, payload);
  // }

  // upcomingMovieApiData(): Observable<any> { //new release movies watch in sri lanka
  //   const today = new Date();
  //   const oneWeekLater = new Date();
  //   oneWeekLater.setDate(today.getDate() + 8)
  //   const threeMonthsLater = new Date();
  //   threeMonthsLater.setMonth(today.getMonth() + 3);

  //     const payload = {
  //       "airDateGte": null,
  //       "airDateLte": null,
  //       "certification": null,
  //       "certificationCountry": "",
  //       "debug": false,
  //       "firstAirDateGte": null,
  //       "firstAirDateLte": null,
  //       "page": 2,
  //       "primaryReleaseDateGte": oneWeekLater.toISOString().split('T')[0],
  //       "primaryReleaseDateLte": threeMonthsLater.toISOString().split('T')[0],
  //       "region": "US",
  //       "releaseDateGte": "",
  //       "releaseDateLte": "",
  //       "showMe": 0,
  //       "sortBy": "popularity",
  //       "voteAverageGte": 0.0,
  //       "voteAverageLte": 10.0,
  //       "voteCountGte": 0,
  //       "watchRegion": "LK",
  //       "withGenres": "",
  //       "withKeywords": null,
  //       "withNetworks": null,
  //       "withOriginCountry": null,
  //       "withOriginalLanguage": "en",
  //       "withWatchMonetizationTypes": null,
  //       "withWatchProviders": null,
  //       "withReleaseType": "",
  //       "withRuntimeGte": 0,
  //       "withRuntimeLte": 400
  //   };

  //   return this.http.post(`${this.baseurl}/tmdb/movies`,payload);
  // }

  // comingsoonMovieApiData(): Observable<any> { //new release movies watch in sri lanka
  //   const today = new Date();
  //   const oneWeekLater = new Date();
  //   oneWeekLater.setDate(today.getDate() + 7);

  //     const payload = {
  //       "airDateGte": null,
  //       "airDateLte": null,
  //       "certification": null,
  //       "certificationCountry": "",
  //       "debug": false,
  //       "firstAirDateGte": null,
  //       "firstAirDateLte": null,
  //       "page": 2,
  //       "primaryReleaseDateGte": today.toISOString().split('T')[0],
  //       "primaryReleaseDateLte": oneWeekLater.toISOString().split('T')[0],
  //       "region": "US",
  //       "releaseDateGte": "",
  //       "releaseDateLte": "",
  //       "showMe": 0,
  //       "sortBy": "popularity",
  //       "voteAverageGte": 0.0,
  //       "voteAverageLte": 10.0,
  //       "voteCountGte": 0,
  //       "watchRegion": "LK",
  //       "withGenres": "",
  //       "withKeywords": null,
  //       "withNetworks": null,
  //       "withOriginCountry": null,
  //       "withOriginalLanguage": "en",
  //       "withWatchMonetizationTypes": null,
  //       "withWatchProviders": null,
  //       "withReleaseType": "",
  //       "withRuntimeGte": 0,
  //       "withRuntimeLte": 400
  //   };

  //   return this.http.post(`${this.baseurl}/tmdb/movies`,payload);
  // }

  getSearchMovie(data: any): Observable<any> {
    // console.log(data,'movie#');
    return this.http.get(`${this.baseurl}/search/movie?api_key=${this.apikey}&query=${data.movieName}`);
  }

  getMovieDetails(data: any): Observable<any> {
    // console.log(data,'movie#');
    return this.http.get(`${this.baseurl}/tmdb/movie/${data}`);
  }

  getMovieTrailer(data: any, successCallback: Function, errorCallback: Function): Observable<any> {
    return new Observable(observer => {
      axios.get(`${this.baseurl}/tmdb/movie/${data}/videos`)
        .then(res => {
          successCallback(res)
          observer.next(res.data);
          observer.complete();
        }).catch(e => {
          errorCallback(e)
        })
    })

  }

  getMovieCredits(data: any, successCallback: Function, errorCallback: Function): Observable<any> {
    return new Observable(observer => {
      axios.get(`${this.baseurl}/tmdb/movie/${data}/credits`)
        .then(res => {
          successCallback(res)
          observer.next(res.data);
          observer.complete();
        }).catch(e => {
          errorCallback(e)
        })
    })
  }
}
