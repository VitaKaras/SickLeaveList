import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class RegistrationService {
  constructor(private http: Http){}

  saveUser(user) {
    return new Promise((resolve, reject) => {
      this.http.post('/api', user)
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          console.log("error saveUser");
          reject(err);
        });
    });
  }

  checkEmail(email) {
    return new Promise((resolve, reject) => {
      this.http.get('/api/email/' +  email )
        .map(res => res.json())
        .subscribe( res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  checkUserName(username) {
    return new Promise((resolve, reject) => {
      this.http.get('/api/username/' +  username)
        .map(res => res.json())
        .subscribe( res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  private handleError(error: any): Observable<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Observable.throw(error.message || error);
  }
}
