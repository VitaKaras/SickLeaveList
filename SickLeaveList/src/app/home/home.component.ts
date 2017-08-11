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

  logOut(): void{
    this.logOutService.logOut().then((result) => {
      console.log('success logout');
      this.router.navigateByUrl('/start');
    }, (err) => {
      console.log(err);
    });
  }
}
