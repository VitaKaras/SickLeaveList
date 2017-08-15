import { Component, OnInit } from '@angular/core';
import {List} from "../../list/list";
import {ListService} from "../list.service";
import {User} from "../../user/user";
import {Router} from "@angular/router";
import {SharedService} from "../../shared.service";

@Component({
  selector: 'app-add-list-element',
  templateUrl: './add-list-element.component.html',
  styleUrls: ['./add-list-element.component.css']
})
export class AddListElementComponent implements OnInit {

  constructor(private listService: ListService,
              private router: Router,
              private sharedService: SharedService) {}

  model = new List(null, null, '' ); // в input приходит object
  dateFrom: Date;
  dateTo: Date;
  types = ['vacation', 'sick-list'];
  user: User;

  minDate = new Date('2016-05-18T16:00:00Z');

  submitted = false;

  onSubmit(): void {
    // this.dateFrom = new Date(this.model.dateFrom);
    // this.dateTo = new Date(this.model.dateTo);
    console.log(this.model.dateFrom);
    let type = this.model.type;
    const user = this.sharedService.sharedUser;
    // console.log(user);
    const list = new List(this.model.dateFrom,this.model.dateTo, type);
    console.log(list);
    this.listService.addNewListElement(this.sharedService.sharedUser['_id'], list).then((result) => {
      console.log('success add list');
      //this.router.navigateByUrl('/start');
    }, (err) => {
      console.log(err);
    });
  }

  ngOnInit(): void {
  }


}
