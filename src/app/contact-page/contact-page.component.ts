import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
}
