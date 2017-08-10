import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {StartPageComponent} from './start-page.component';
import {RegistrationComponent} from './registration/registration.component';
import {AuthorizationComponent} from './authorization/authorization.component';

const startRoutes: Routes = [
  {
    path: 'start',
    component: StartPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'sign_in',
        pathMatch: 'full'
      },
      {
        path: 'registration',
        component: RegistrationComponent
      },
      {
        path: 'sign_in',
        component: AuthorizationComponent
      },
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(startRoutes) ],
  exports: [ RouterModule ]
})
export class StartPageRoutingModule {}
