import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css'],
})
export class SignupPageComponent implements OnInit {
  signupMessage = '';
  signupForm: FormGroup;
  firebaseErrorMessage: string = '';
  showPopUp = false;

  constructor(
    private title: Title,
    private authService: AuthService,
    private router: Router,
    private afAuth: AngularFireAuth
  ) {
    title.setTitle('Login - Thrifty');
    this.signupForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}

  signinUser() {
    if (this.signupForm.invalid) {
      this.signupMessage = 'Invalid Input';
      this.showPopUp = true;
      return;
    }

    this.authService
      .signupUser(this.signupForm.value)
      .then((result) => {
        if (result == null) {
          // null is success, false means there was an error
          console.log('signing up...');
          this.signupMessage = 'User logged in successfuly.';
          this.showPopUp = true;
        } else if (result.isValid == false)
          this.firebaseErrorMessage = result.message;
        this.signupMessage = 'Sign up failed due to an error';
        this.showPopUp = true;
      })
      .catch(() => {});
  }
}
