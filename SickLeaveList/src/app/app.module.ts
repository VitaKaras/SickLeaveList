import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { StartPageModule } from './start-page/start-page.module';
import {AppRoutingModule} from './app-routing.module';
import {RegistrationService} from "./start-page/registration/registration.service";
import {HttpModule} from "@angular/http";
import {AuthorizationService} from "./start-page/authorization/authorization.service";
import {HomeModule} from "./home/home.module";
import {LogOutService} from "./logout.service";
import {ListService} from "./home/list.service";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {SharedService} from "./shared.service";
import {PagerService} from "./home/pager.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    StartPageModule,
    AppRoutingModule,
    HttpModule,
    HomeModule,
    NgbModule.forRoot(),
  ],
  providers: [RegistrationService, AuthorizationService, LogOutService, ListService, SharedService, PagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
