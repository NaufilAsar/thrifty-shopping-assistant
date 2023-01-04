import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../services/auth.service';
import { GetProductsService } from '../services/get-products.service';
import { SharingService } from '../services/sharing.service';

@Component({
  selector: 'app-price-alerts-page',
  templateUrl: './price-alerts-page.component.html',
  styleUrls: ['./price-alerts-page.component.css'],
})
export class PriceAlertsPageComponent implements OnInit {
  tempItem: any;
  showPopUp = false;
  // email = this.sharingService.getEmail();
  email = localStorage.getItem('email') as string;
  subscriptions: any = [];
  links: any = [];

  constructor(
    public authService: AuthService,
    private api: GetProductsService,
    public sharingService: SharingService,
    title: Title
  ) {
    title.setTitle('Price Alerts - Thrifty');
  }

  ngOnInit(): void {
    console.log(this.email, typeof this.email);
    this.api.readFromCart(this.email).subscribe({
      next: (result: any) => {
        this.subscriptions = result[0]['title'];
        this.links = result[0]['link'];
        console.log(result);
      },
      error: (err) => console.log(err),
    });
  }

  unsubscribe(index: number) {
    this.showPopUp = true;
    let temp: any = [];
    for (let i = 0; i < this.subscriptions.length; i++) {
      if (i != index) {
        temp.push(this.subscriptions[i]);
      } else {
        this.tempItem = this.subscriptions[i];
        console.log(this.tempItem);
        this.api
          .deleteFromCart(this.email, this.links[i], this.tempItem)
          .subscribe({
            next: (data) => {
              console.log(data);
            },
            error: (err) => {
              console.log(err);
            },
          });
      }
    }
    this.subscriptions = temp;
  }
}
