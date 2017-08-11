import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import {HomeComponent} from './home.component';
import { SickLeaveListComponent } from './sick-leave-list/sick-leave-list.component';
import { AddListElementComponent } from './add-list-element/add-list-element.component';
import {FormsModule} from "@angular/forms";
import {DatePickerModule} from "ng2-datepicker";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    DatePickerModule,
    NgbModule
  ],
  declarations: [
    HomeComponent,
    SickLeaveListComponent,
    AddListElementComponent,
  ]
})
export class HomeModule { }
