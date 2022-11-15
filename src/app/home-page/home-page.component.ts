import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  constructor(private router: Router) {}
  search_bar = new FormControl(''); // search bar
  search_icon = faMagnifyingGlass; // search icon
  apiUrl = '';
  resultsLoaded = false; // change to true when results loaded from API
  hideSectionAnimations = this.resultsLoaded;
  gotError = false; // if error when loading results

  ngOnInit(): void {}

  onClickSearch() {
    if (this.search_bar.value!.length > 2) {
      this.router.navigateByUrl(
        '/results?search=' + this.search_bar.value?.replace(' ', '_')
      );
    } else {
      // error Popup
    }
  }

  // on Search Button Click we will:
  //    redirect To results page.
  //    set the search query in the results page address bar
  //    fetch the results from the API in results page
}
