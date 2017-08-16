import { Component, OnInit } from '@angular/core';
import {List} from "../../list/list";
import {ListService} from "../list.service";
import {SharedService} from "../../shared.service";
import {Router} from "@angular/router";
import {PagerService} from "../pager.service";

@Component({
  selector: 'app-sick-leave-list',
  templateUrl: './sick-leave-list.component.html',
  styleUrls: ['./sick-leave-list.component.css']
})
export class SickLeaveListComponent implements OnInit {

  list: any;


  constructor(private listService: ListService,
              private sharedService: SharedService,
              private router: Router,
              private pagerService: PagerService) { }

  ngOnInit() {
    this.getAllList();
  }

  settings = {
    columns: {
      dateFrom: {
        title: "Date from"
      },
      dateTo: {
        title: "Date to"
      },
      type: {
        title: "Type"
      }
    }
  }

  getAllList(){
    this.listService.getAllList(this.sharedService.sharedUser['_id']).then((res) => {
      const result = JSON.stringify(res);
      console.log('success get list');
      console.log(res);
      this.list = res;
      console.log(this.list[0]);
      this.setPage(1);
      // Object.keys(res).forEach(function (key) {
      //   console.log(key, res[key]);
      // });
      //
      // for(const i in res){
      //   this.list.push([i, res[i].toArray]);
      // }
      // console.log('list '+ this.list );
      //console.log(result);
    }, (err) => {
      console.log(err);
    });
  }

  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.list.length, page);

    // get current page of items
    this.pagedItems = this.list.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
}
