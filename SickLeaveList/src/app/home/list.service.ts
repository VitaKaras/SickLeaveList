import { Injectable } from '@angular/core';
import {Http} from "@angular/http";

@Injectable()
export class ListService {
  private listUrl = 'http://localhost:1337';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  addNewListElement(userId, list){
    return new Promise((resolve, reject) => {
      this.http.post('/list/'+ userId, list)
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          console.log("error add list element");
          reject(err);
        });
    });
  }

  getAllList(userId) {
    return new Promise((resolve, reject) => {
      this.http.get('/list/' + userId)
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          console.log('error get all list');
          reject(err);
        });
    });
  }

  // getVacationInd(): Observable<number> {
  //   const url = this.listUrl+'/vac_count';
  //   return this.http.get(url, {headers: this.headers})
  //     .map( response => response.json() as number)
  //     .catch(this.handleError);
  // }
  //
  // getSickInd(): Observable<number> {
  //   const url = this.listUrl+'/sick_count';
  //   return this.http.get(url, {headers: this.headers})
  //     .map( response => response.json() as number)
  //     .catch(this.handleError);
  // }


}
