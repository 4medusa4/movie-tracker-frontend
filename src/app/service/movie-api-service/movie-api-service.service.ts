import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieApiServiceService {

  TMDB_BASE_URL = environment.TMDB_BASE_URL
  BASE_URL = environment.BASE_URL
  API_KEY = environment.TMDB_API_KEY

  private selectedLanguage: string = 'en'; // Default language

  private axiosInstance = axios.create({
    baseURL: this.BASE_URL
  });

  constructor(private http: HttpClient) {
    this.axiosInstance.interceptors.request.use((config) => {
      const token = localStorage.getItem('access_token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    }, (error) => {
      return Promise.reject(error);
    });
  }

  updateLanguage(language: string) {
    console.log('Updating language to:', language);
    this.selectedLanguage = language;
    console.log('Selected language updated to:', this.selectedLanguage);

  }

  getSelectedLanguage(): string {
    return this.selectedLanguage;
  }

  bannerApiData(): Observable<any> {  //most popular movies watch in sri lanka

    const payload = {
      "includeAdult": false,
      "includeVideo": false,
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
    return this.http.post(`${this.BASE_URL}/tmdb/movies`, payload);
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
          "includeAdult": false,
          "includeVideo": false,
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
          "includeAdult": false,
          "includeVideo": false,
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
          "withRuntimeLte": 400
        };
        break;
      case 'comingsoon':
        payload = {
          "includeAdult": false,
          "includeVideo": false,
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
          "withRuntimeLte": 400
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
    return this.http.post(`${this.BASE_URL}/tmdb/movies`, payload);
  }

  // API method to get upcoming movies
  upcomingMovieApiData(): Observable<any> {
    const payload = this.getPayloadWithLanguage('upcoming');
    return this.http.post(`${this.BASE_URL}/tmdb/movies`, payload);
  }

  // API method to get coming soon movies
  comingsoonMovieApiData(): Observable<any> {
    const payload = this.getPayloadWithLanguage('comingsoon');
    return this.http.post(`${this.BASE_URL}/tmdb/movies`, payload);
  }

  getSearchMovie(data: any): Observable<any> {
    // console.log(data,'movie#');
    return this.http.get(`${this.TMDB_BASE_URL}/search/movie?api_key=${this.API_KEY}&query=${data.movieName}`);
  }

  getMovieDetails(data: any): Observable<any> {
    // console.log(data,'movie#');
    return this.http.get(`${this.BASE_URL}/tmdb/movie/${data}`);
  }

  getMovieTrailer(data: any, successCallback: Function, errorCallback: Function): Observable<any> {
    return new Observable(observer => {
      axios.get(`${this.BASE_URL}/tmdb/movie/${data}/videos`)
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
      axios.get(`${this.BASE_URL}/tmdb/movie/${data}/credits`)
        .then(res => {
          successCallback(res)
          observer.next(res.data);
          observer.complete();
        }).catch(e => {
          errorCallback(e)
        })
    })
  }

  userBooking(_data: any, successCallbac: any, errorCallback: any): Observable<any> {
    return new Observable(observe => {
      const url = `/tenant/upcomming/booking`
      this.axiosInstance.post(url, _data)
        .then(res => {
          successCallbac(res)
          observe.next(res.data);
          observe.complete();
        }).catch(e => errorCallback(e))
    })
  }

  addToTrackList(_data: any, successCallback: Function, errorCallback: Function): Observable<any> {
    return new Observable((observer) => {
      axios.post(`${this.BASE_URL}/track-list`, _data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      })
        .then(res => {
          successCallback(res)
          observer.next(res.data);
          observer.complete();
        }).catch(e => errorCallback(e))
    })
  }
}
