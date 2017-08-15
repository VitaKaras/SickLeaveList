import { Injectable } from '@angular/core';
import {User} from "./user/user";
import {Http} from "@angular/http";

@Injectable()
export class SharedService {
  constructor(private http: Http){}

  sharedUser: {};

  getUser(_id){
    return new Promise((resolve, reject) => {
      this.http.get('/api/'+ _id)
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          console.log("error logout");
          reject(err);
        });
    })
  };

}
