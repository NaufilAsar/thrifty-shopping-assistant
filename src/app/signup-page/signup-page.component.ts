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
  displayStyle = 'none';

  constructor(
    private title: Title,
    private authService: AuthService,
    private router: Router,
    private afAuth: AngularFireAuth
  ) {
    title.setTitle('Signup - Thrifty');
    this.signupForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.showPopUp = false;
    this.displayStyle = 'block';
  }

  signinUser() {
    if (this.signupForm.invalid) {
      this.signupMessage = 'Invalid Input';
      this.showPopUp = true;
      this.displayStyle = 'block';
      return;
    }

    this.authService
      .signupUser(this.signupForm.value)
      .then((result) => {
        if (result == null) {
          // null is success, false means there was an error
          console.log('signing up...');
          this.signupMessage = 'User logged in successfully.';
          console.log('user created.');
        } else if (result.isValid == false) {
          console.log('user not created.');
          this.firebaseErrorMessage = result.message;
          if (
            this.firebaseErrorMessage ==
            'Firebase: The email address is already in use by another account. (auth/email-already-in-use).'
          )
            this.signupMessage = 'User already exists.. Sign up failed.';
          if (
            this.firebaseErrorMessage ==
            'Firebase: Password should be at least 6 characters (auth/weak-password).'
          )
            this.signupMessage =
              'Password must be minimum 8 characters.. Sign up failed.';
          else this.signupMessage = 'Sign up failed due to an error';
        }
        this.showPopUp = true;
      })
      .catch(() => {});
  }
}
