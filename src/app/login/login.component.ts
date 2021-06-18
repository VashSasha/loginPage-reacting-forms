import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { SignInData } from '../model/signInData';
import { AuthenticationService } from '../service/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  login = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })
  isFormInvalid = false;
  isDataValid = false
  constructor(private authenticationService: AuthenticationService) {

  }

  onSubmit() {
    console.log(this.login.value);
    if (!this.login.valid) {
      this.isFormInvalid = true;
      this.isDataValid = false;
      return
    }
    this.checkData(this.login)

    // console.log(signInData)

  }

  private checkData(signInForm: any) {
    const signInData = new SignInData(this.login.value.email, this.login.value.password)
    if (!this.authenticationService.authenticate(signInData)) {
      this.isFormInvalid = false;
      this.isDataValid = true;

    }
  }
}
