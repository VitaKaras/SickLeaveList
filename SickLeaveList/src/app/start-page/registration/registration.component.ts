import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { RegistrationService } from './registration.service';
import {Router} from "@angular/router";
import {User} from "../../user/user";
import {LogOutService} from "../../logout.service";


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  user = new User('', '', '', null , '', '', '', []);

  registrationForm: FormGroup;

  formErrors = {
    'firstName': '',
    'lastName': '',
    'email': '',
    'telephone': '',
    'username': '',
    'password': '',
    "confPassword": ''
  };

  validationMessages = {
    'firstName': {
      'required': 'firstName is required.',
      'pattern': 'Only english letters allowed'
    },
    'lastName': {
      'required': 'LastName is required.',
      'pattern': 'Only english letters allowed'
    },
    'email': {
      'required': 'Email is required.',
      'pattern': 'Email format must be xxxxx@yyyy.zzz'
    },
    'telephone': {
      'pattern': 'Only numbers allowed'
    },
    'username': {
      'required': 'Username is required',
      'pattern': 'Only english characters or numbers',
      'minlength': 'Must be at least 5 characters long.',
      'maxlength': 'Cannot be more than 10 characters long.'
    },
    'password': {
      'required': 'Password is required',
      'pattern': 'Only english characters or numbers'
    },
    'confPassword': {
      'required': 'Please, confirm the password',
      'pattern': 'Only english characters or numbers'
    }
  };



  onSubmit(): void {
    // // check unique email
    this.registrationService.checkEmail(this.user['email']).then((result) => {
        if (result != null) {
        let email = this.registrationForm.controls['email'];
        email.setErrors({notUnique: true});
        this.formErrors['email'] = "email is not unique";
      } else {
          // check unique username
        this.registrationService.checkUserName(this.user['login']).then((result) => {
          if (result != null) {
            let username = this.registrationForm.controls['username'];
            username.setErrors({notUnique: true});
            this.formErrors['username'] = "username is not unique";
          } else {
            // save user
            this.registrationService.saveUser(this.user).then((result) => {
              console.log("user saved");
              this.router.navigateByUrl('/start/sign_in');
            }, (err) => {
              console.log(err);
            })
          }
        }, (err) => {
          console.log(err);
        });
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
              private router: Router,
              private logOutService: LogOutService) { }

  buildForm(): void {
    this.registrationForm = this.fb.group({

        "firstName": ["", [Validators.required,
          Validators.pattern('[A-Za-z]+')]],

        "lastName": ["", [Validators.required,
          Validators.pattern('[A-Za-z]+')]],

        "email": ["", [Validators.required,
          Validators.pattern('^[0-9A-Za-z]{1,10}@[0-9a-zA-Z_]+?\.[a-zA-Z]{2,5}$')]],

        "telephone": ["", Validators.pattern('[0-9]+')],

        "username": ["", [Validators.required,
          Validators.pattern('[A-Za-z0-9]+'),
          Validators.maxLength(10),
          Validators.minLength(5)]],

        "password": ["", [Validators.required,
          Validators.pattern('[a-zA-Z0-9]+')]],

        "confPassword": ["", [Validators.required,
          Validators.pattern('[a-zA-Z0-9]+')]]
      },
      {validator: this.checkIfMatchingPasswords('password', 'confPassword'),
      },

    );

    this.registrationForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();

  }

  checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey],
        passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({notEquivalent: true})
      }
      else {
        return passwordConfirmationInput.setErrors(null);
      }
    }
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
