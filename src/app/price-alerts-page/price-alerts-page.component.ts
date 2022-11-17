import { Component, OnInit } from '@angular/core';
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
  email: string = this.authService.authState?.email;
  subscriptions: any = [];

  constructor(
    public authService: AuthService,
    private api: GetProductsService,
    public sharingService: SharingService
  ) {}

  ngOnInit(): void {
    if (this.authService.userEmail === '') {
      let s = localStorage.getItem('email');
      let url = 'https://tender-grass-55002.pktriot.net/wishlist?act=r&id=' + s;
      console.log(s, typeof s);
      this.api.getProducts(url).subscribe({
        next: (result: any) => {
          this.subscriptions = result[0]['title'];
        },
        error: (err) => console.log(err),
      });
    } else {
      let url =
        'https://tender-grass-55002.pktriot.net/wishlist?act=r&id=' +
        this.authService.userEmail;

      this.api.getProducts(url).subscribe({
        next: (result: any) => {
          this.subscriptions = result[0]['title'];
        },
        error: (err) => console.log(err),
      });
    }
  }

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
