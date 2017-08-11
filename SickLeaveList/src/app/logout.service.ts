import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {map} from "rxjs/operator/map";


@Injectable()
export class LogOutService {
  constructor(private http: Http){}

  logOut() {
    return new Promise((resolve, reject) => {
      this.http.get('/user/logout')
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          console.log("error logout");
          reject(err);
        });
    })
  }

  getAccess(user) {
    return new Promise((resolve, reject) => {
      this.http.post('/user', user)
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
      this.http.get('/user/password/' +  password )
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
      this.http.get('/user/username/' +  username)
        .map(res => res.json())
        .subscribe( res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

}
