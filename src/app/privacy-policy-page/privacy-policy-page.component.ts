import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-privacy-policy-page',
  templateUrl: './privacy-policy-page.component.html',
  styleUrls: ['./privacy-policy-page.component.css'],
})
export class PrivacyPolicyPageComponent implements OnInit {
  constructor(title: Title) {
    title.setTitle('Privacy Policy - Thrifty');
  }

  ngOnInit(): void {}
}
