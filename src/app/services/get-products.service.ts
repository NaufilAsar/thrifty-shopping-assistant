import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GetProductsService {
  // apiUrl = 'http://localhost:8080';
  apiUrl = 'https://tender-grass-55002.pktriot.net';
  constructor(private http: HttpClient) {}
  getProducts(path: string) {
    return this.http.get(this.apiUrl + path);
  }

  getSearchResults(product: string) {
    return this.http.get(this.apiUrl + '/results?product=' + product);
  }

  getSpecfications(link: string) {
    let url = this.apiUrl + '/specs?link=' + link;
    return this.http.get(url);
  }

  getSuggestedProduct(product: string) {
    return this.http.get(this.apiUrl + '/suggestion?product=' + product);
  }

  deleteFromCart(email: string, link: string, title: string) {
    return this.http.get(
      this.apiUrl +
        '/wishlist?act=d&id=' +
        email +
        '&title=' +
        title +
        '&link=' +
        link
    );
  }
  addToCart(email: string, link: string, title: string, price: string) {
    return this.http.get(
      this.apiUrl +
        '/wishlist?act=i&id=' +
        email +
        '&title=' +
        title +
        '&link=' +
        link +
        '&price=' +
        price +
        '&search=' +
        localStorage.getItem('search')
    );
  }
  readFromCart(email: string) {
    return this.http.get(this.apiUrl + '/wishlist?act=r&id=' + email);
  }
}
