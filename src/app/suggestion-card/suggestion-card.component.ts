import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { GetProductsService } from '../services/get-products.service';

@Component({
  selector: 'app-suggestion-card',
  templateUrl: './suggestion-card.component.html',
  styleUrls: ['./suggestion-card.component.css'],
})
export class SuggestionCardComponent implements OnInit {
  @Input() product: any = {}; // stores the suggested product
  @Input() specs: any = {}; // stores specfications for product to display
  constructor(private api: GetProductsService) {}

  ngOnInit(): void {}

  onProductClick(data: any) {
    localStorage.setItem('product', JSON.stringify(data));
  }
}
