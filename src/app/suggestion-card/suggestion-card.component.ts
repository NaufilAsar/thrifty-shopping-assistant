import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { GetProductsService } from '../services/get-products.service';

@Component({
  selector: 'app-suggestion-card',
  templateUrl: './suggestion-card.component.html',
  styleUrls: ['./suggestion-card.component.css'],
})
export class SuggestionCardComponent implements OnInit {
  specs = {};
  search_query: string | null = null;
  product: any = {};
  constructor(
    private api: GetProductsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.fetchSuggestions();
  }
  onProductClick(data: any) {
    localStorage.setItem('product', JSON.stringify(data));
  }
  fetchSuggestions() {
    this.activatedRoute.queryParams.subscribe(async (params: Params) => {
      if (params['search'] !== undefined && params['category'] === undefined) {
        // Normal search for products
        this.search_query = params['search'];
      }
    });
    let s = this.search_query?.replace(' ', '_');
    this.api.getSuggestedProduct(s!).subscribe({
      next: (data: any) => {
        this.product = data;
        console.log(this.search_query);
        console.log(data);
        this.api.getSpecfications(this.product.link).subscribe({
          next: (specs: any) => {
            console.log(specs);
            this.specs = specs;
          },
          error: (error) => {
            console.log(error);
          },
        });
      },
      error: (err: any) => console.log(err),
    });
  }
}
