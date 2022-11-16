import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-price-alerts-page',
  templateUrl: './price-alerts-page.component.html',
  styleUrls: ['./price-alerts-page.component.css'],
})
export class PriceAlertsPageComponent implements OnInit {
  tempItem: any;
  showPopUp = false;
  email: string = this.authService.authState?.email;
  subscriptions: any = [
    'Iphone 11',
    'Lenovo Laptop',
    'Apple TV',
    'Iphone 11',
    'Lenovo Laptop',
    'Apple TV',
    'Iphone 11',
    'Lenovo Laptop',
    'Apple TV',
    'Iphone 11',
    'Lenovo Laptop',
    'Apple TV',
    'Iphone 11',
    'Lenovo Laptop',
    'Apple TV',
    'Iphone 11',
    'Lenovo Laptop',
    'Apple TV',
  ];

  constructor(public authService: AuthService) {}

  ngOnInit(): void {}

  unsubscribe(index: number) {
    this.showPopUp = true;
    let temp: any = [];
    for (let i = 0; i < this.subscriptions.length; i++) {
      if (i != index) temp.push(this.subscriptions[i]);
      else this.tempItem = this.subscriptions[i];
    }
    this.subscriptions = temp;
  }
  undo() {
    this.subscriptions.push(this.tempItem);
    this.showPopUp = false;
  }
}
