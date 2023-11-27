import axios from 'axios';
import { Observable } from 'rxjs';


export default class AuthService {

  constructor() { }

  private BASE_URL: string = "http://localhost:8080/api/v1";

  newUserSignUp(_data: any, successCallback: Function, errorCallback: Function): Observable<any> {
    const url = `${this.BASE_URL}/auth/register`
    return new Observable((observer) => {
      axios.post(url, _data)
        .then(res => {
          successCallback(res)
          observer.next(res.data);
          observer.complete();
        }).catch(e => errorCallback(e))
    })
  }

  newUserLogin(_data: any, successCallback: Function, errorCallback: Function): Observable<any> {
    const url = `${this.BASE_URL}/auth/authenticate`
    return new Observable((observer) => {
      axios.post(url, _data)
        .then(res => {
          const accessToken = res.data.access_token;
          localStorage.setItem('access_token', accessToken);
          successCallback(res)
          observer.next(res.data);
          observer.complete();
        }).catch(e => errorCallback(e))
    })
  }

}
