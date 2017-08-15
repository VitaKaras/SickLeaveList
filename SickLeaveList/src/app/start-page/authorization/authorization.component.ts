import { Component, OnInit } from '@angular/core';
import { User } from '../../user/user';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RegistrationService} from "../registration/registration.service";
import {Router} from "@angular/router";
import {AuthorizationService} from "./authorization.service";
import {SharedService} from "../../shared.service";
import {LogOutService} from "../../logout.service";

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent implements OnInit {
  registrationForm: FormGroup;
  user = {
   login: '',
    password: ''
  };


  formErrors = {
    'username': '',
    'password': ''
  };

  validationMessages = {
    'username': {
      'required': 'Username is required',
      'pattern': 'Only english characters or numbers',
      'minlength': 'Must be at least 5 characters long.',
      'maxlength': 'Cannot be more than 10 characters long.'
    },
    'password': {
      'required': 'Password is required',
      'pattern': 'Only english characters or numbers'
    }
  };


  onSubmit(): void {
    // check unique username
    this.registrationService.checkUserName(this.user['login']).then((result) => {
      if (result != null) {
        // authorize user
        this.authorizationService.getAccess(this.user).then((result) => {
          if(result != null) {
            console.log(result);
            this.sharedService.sharedUser = result;
            console.log(this.sharedService.sharedUser);
            console.log("user authorized");
            // this.sharedService.sharedUser = new User(result['firstName'], result['lastName'], result['email'], result['telephone'], result['login'], result['password'], result['passwordConf']);

            this.router.navigate(['/home']);
          } else {
            let password = this.registrationForm.controls['password'];
            password.setErrors({doNotMatch: true});
            this.formErrors['password'] = "password is do not match";
          }
        }, (err) => {
          console.log(err);
        })
      } else {
        let username = this.registrationForm.controls['username'];
        username.setErrors({notRegistered: true});
        this.formErrors['username'] = "username with this login is not registered";
      }
    }, (err) => {
      console.log(err);
    });

  }

  ngOnInit(): void {
    this.buildForm();
  }

  constructor(private fb: FormBuilder,
              private registrationService: RegistrationService,
              private authorizationService: AuthorizationService,
              private sharedService: SharedService,
              private router: Router,
              private logOutService: LogOutService) { }




  buildForm(): void {
    this.registrationForm = this.fb.group({
        "username": ["", [Validators.required,
          Validators.pattern('[A-Za-z0-9]+'),
          Validators.maxLength(10),
          Validators.minLength(5)]],

        "password": ["", [Validators.required,
          Validators.pattern('[a-zA-Z0-9]+')]]
      }
    );

    this.registrationForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();

  }

  onValueChanged(data?: any) {
    if (!this.registrationForm) { return; }
    const form = this.registrationForm;

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field); // get input from form

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

}
