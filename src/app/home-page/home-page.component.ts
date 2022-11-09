import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  constructor() {}

  search_product = new FormControl(''); // search bar
  search_icon = faMagnifyingGlass; // search icon
  apiUrl = '';
  displayLoadingAnimation = false;
  resultsLoaded = false; // change to true when results loaded from API
  hideSectionAnimations = this.resultsLoaded;
  gotError = false; // if error when loading results

  ngOnInit(): void {}

  onClickSearch() {}
}
