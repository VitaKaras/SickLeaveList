import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartPageComponent } from './start-page.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import { StartPageRoutingModule } from './start-page-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    StartPageRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    StartPageComponent,
    RegistrationComponent,
    AuthorizationComponent]
})
export class StartPageModule { }
