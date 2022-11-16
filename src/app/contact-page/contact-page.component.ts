import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css'],
})
export class ContactPageComponent implements OnInit {
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
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  }
}
