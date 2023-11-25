import axios from 'axios';
import { Observable } from 'rxjs';


export default class AuthService {

  constructor() { }

  private BASE_URL: string = "http://localhost:8080/api/v1";

  newUserSignUp(_data: any): Observable<any> {
    const url = `${this.BASE_URL}/auth/register`
    return new Observable((observer) => {
      axios.post(url, _data)
        .then(res => {
          observer.next(res.data);
          observer.complete();
        }).catch(e => console.error(e))
    })
  }

  newUserLogin(_data: any): Observable<any> {
    const url = `${this.BASE_URL}/auth/authenticate`
    return new Observable((observer) => {
      axios.post(url, _data)
        .then(res => {
          observer.next(res.data);
          observer.complete();
        }).catch(e => console.error(e))
    })
  }

}
