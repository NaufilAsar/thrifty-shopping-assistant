import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SharingService } from '../services/sharing.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  loginMessage = '';
  loginForm: FormGroup;
  firebaseErrorMessage: string = '';
  showPopUp = false;

  constructor(
    private title: Title,
    private authService: AuthService,
    private router: Router,
    private afAuth: AngularFireAuth,
    public sharingService: SharingService
  ) {
    title.setTitle('Login - Thrifty');
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    console.log('Login status = ' + this.authService.userLoggedIn);
  }

  loginUser() {
    if (this.loginForm.invalid) {
      this.loginMessage = 'Invalid Input';
      this.showPopUp = true;
      return;
    }

    this.authService
      .loginUser(this.loginForm.value.email, this.loginForm.value.password)
      .then((result) => {
        console.log('Login status = ' + this.authService.userLoggedIn);
        if (result == null) {
          // null is success, false means there was an error
          console.log('logging in...');
          // this.sharingService.setEmail(this.authService.authState.email);
          localStorage.setItem('email', this.authService.userEmail);
          // show a pop up
          this.loginMessage = 'User logged in successfuly.';
          this.showPopUp = true;
        } else if (result.isValid == false) {
          console.log('login error', result);
          this.firebaseErrorMessage = result.message;
        }
      });
  }
}
