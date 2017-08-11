import { Component, OnInit } from '@angular/core';
import {List} from "../../list/list";

@Component({
  selector: 'app-sick-leave-list',
  templateUrl: './sick-leave-list.component.html',
  styleUrls: ['./sick-leave-list.component.css']
})
export class SickLeaveListComponent implements OnInit {

  list = [];


  constructor() { }

  ngOnInit() {
  }

}
