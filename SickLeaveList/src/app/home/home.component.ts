import { Component, OnInit } from '@angular/core';
import {LogOutService} from "../logout.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private logOutService: LogOutService,
              private router: Router) { }

  ngOnInit() {
  }

  logOut(): void{
    this.logOutService.logOut().then( (result) => {
      if(result == "success") {
        console.log("success logout");
        this.router.navigateByUrl('/start');
      }
    }, (error) => {
      console.log("fail logout");
    })
  }

}
