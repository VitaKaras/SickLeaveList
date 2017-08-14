import { Component, OnInit } from '@angular/core';
import {LogOutService} from "../logout.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent implements OnInit {

  constructor(private logOutService: LogOutService,
              private router: Router) { }

  ngOnInit() {
  }
}
