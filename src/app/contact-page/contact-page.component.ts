import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css'],
})
export class ContactPageComponent implements OnInit {
  showPopUp = false;
  message = '';
  contactForm = new FormGroup('');
  email = new FormControl('', [Validators.required, Validators.email]);
  body = new FormControl('', Validators.required);
  constructor() {}

  ngOnInit(): void {}

  public sendEmail(e: Event) {
    e.preventDefault();
    emailjs
      .sendForm(
        'service_tunohqr',
        'template_5mqiplc',
        e.target as HTMLFormElement,
        'ZTRDqv6HWKvOzvwAG'
      )
      .then(
        (result: EmailJSResponseStatus) => {
          if (result.text === 'OK') {
            this.showPopUp = true;
            this.message = 'Message sent successfully';
          }
        },
        (error) => {
          console.log(error.text);
          this.showPopUp = true;
          this.message = error.text.toString();
        }
      );
  }
}
