import axios from 'axios';
import { BehaviorSubject, Observable } from 'rxjs';


export default class AuthService {

  private BASE_URL: string = "http://localhost:8080/api/v1";

  private isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isAuthenticatedSubject$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  private axiosInstance = axios.create({
    baseURL: this.BASE_URL
  });

  constructor() {
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

  newUserSignUp(_data: any, successCallback: Function, errorCallback: Function): Observable<any> {
    const url = `${this.BASE_URL}/auth/register`
    return new Observable((observer) => {
      axios.post(url, _data)
        .then(res => {
          successCallback(res)
          observer.next(res.data);
          observer.complete();
        }).catch(e => {
          errorCallback(e)
        });
    })
  }

  newUserLogin(_data: any, successCallback: Function, errorCallback: Function): Observable<any> {
    const url = `${this.BASE_URL}/auth/authenticate`
    return new Observable((observer) => {
      axios.post(url, _data)
        .then(res => {
          const accessToken = res.data.access_token;
          localStorage.setItem('access_token', accessToken);
          successCallback(res);
          this.isAuthenticatedSubject.next(true); // Set login status to true
          observer.next(res.data);
          observer.complete();
        }).catch(e => {
          this.isAuthenticatedSubject.next(false); // Set login status to false in case of an error
          errorCallback(e)
        });
    })
  }

  logout(): Observable<any> {
    const url = `/user/logout`;
    return new Observable((observer) => {
      this.axiosInstance.post(url).
        then(res => {
          localStorage.removeItem('access_token');
          this.isAuthenticatedSubject.next(false); // Set login status to false
          observer.next(res.data);
          observer.complete();
        }).catch(e => {
          observer.error(e);
        });
    });
  }
}
