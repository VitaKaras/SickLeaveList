import { Injectable } from '@angular/core';
import {Http} from '@angular/http';


@Injectable()
export class AuthorizationService {
  constructor(private http: Http){}

  getAccess(user) {
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

  checkPassword(password) {
    return new Promise((resolve, reject) => {
      this.http.get('/api/password/' +  password )
        .map(res => res.json())
        .subscribe( res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getList(userId){
    return new Promise((resolve, reject) => {
      this.http.get('/list/' +  userId )
        .map(res => res.json())
        .subscribe( res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
}
