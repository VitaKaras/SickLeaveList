import { Component, OnInit } from '@angular/core';
import {LogOutService} from "../logout.service";
import {Router} from "@angular/router";
import {ListService} from "./list.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  vacations = 5;
  sickLists = 3;

  constructor(private listService: ListService,
              private router: Router,
              private logOutService: LogOutService) { }

  ngOnInit() { }

  logOut(){
    this.logOutService.logOut().then((result) => {
      console.log("logout");
      console.log(result);
      if(result == 'success') {
        console.log('success logout');
        console.log(result);
      }
      //this.router.navigateByUrl('/start/sign_in');
    }, (err) => {
      console.log(err);
    });
  }

}
