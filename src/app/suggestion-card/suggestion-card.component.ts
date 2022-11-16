import { query } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { GetProductsService } from '../services/get-products.service';

@Component({
  selector: 'app-suggestion-card',
  templateUrl: './suggestion-card.component.html',
  styleUrls: ['./suggestion-card.component.css'],
})
export class SuggestionCardComponent implements OnInit {
  @Input() query: string | null = null;
  apiUrl = 'http:localhost:8080/suggestion?for=';
  product: any = {
    href: '',
    title: '',
    price: '',
    mrp: '',
    link: '',
    site: '',
  };
  constructor(private api: GetProductsService) {}

  ngOnInit(): void {
    this.fetchSuggestions();
  }
  onProductClick(data: any) {
    localStorage.setItem('product', JSON.stringify(data));
  }
  fetchSuggestions() {
    // this.product =
    let url = this.apiUrl + query;
    this.api.getProducts(url).subscribe({
      next: (data: any) => {
        this.product = data;
      },
      error: (err: any) => console.log(err),
    });
  }
}
