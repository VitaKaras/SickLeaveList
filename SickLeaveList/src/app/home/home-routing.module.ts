import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home.component";
import {SickLeaveListComponent} from "./sick-leave-list/sick-leave-list.component";
import {AddListElementComponent} from "./add-list-element/add-list-element.component";

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: 'list',
        component: SickLeaveListComponent
      },
      {
        path: 'addList',
        component: AddListElementComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
