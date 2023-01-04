import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.css'],
})
export class AboutPageComponent implements OnInit {
  faHeart = faHeart;

  constructor(title: Title) {
    title.setTitle('About - Thrifty');
  }

  ngOnInit(): void {}
}
