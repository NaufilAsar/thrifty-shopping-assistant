import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GetProductsService } from '../services/get-products.service';

@Component({
  selector: 'app-results-page',
  templateUrl: './results-page.component.html',
  styleUrls: ['./results-page.component.css'],
})
export class ResultsPageComponent implements OnInit {
  constructor(
    private router: Router,
    private title: Title,
    private activatedRoute: ActivatedRoute,
    private api: GetProductsService
  ) {}

  gotError = false;
  productName: string | null = '';
  errorMessage = 'Looks like something went wrong on our side...';
  apiUrl = 'http://localhost:8080/results?product=';
  results: any = [];
  displayLoadingStyle = 'block';
  displayResultsStyle = 'none';
  pageNumber: number = 1;

  ngOnInit(): void {
    this.resolveQueryParams();
  }

  resolveQueryParams() {
    // Start loading animations

    // Address bar query
    this.activatedRoute.queryParams.subscribe(async (params: Params) => {
      if (Object.keys(params).length === 0) {
        console.log('No search params found to show results');
        this.gotError = true; // only if cannot fetch results.
      } else {
        if (params['search'] == undefined && params['category'] === undefined) {
          console.log('Incorrect search params...');
        } else if (
          params['category'] !== undefined &&
          params['search'] == undefined
        ) {
          // category
          // params['category']
          var categoryArray: any = [];
          var categoryMap = {
            Computer: [
              'Computer',
              'Mobile',
              'Keyboard',
              'Powerbank',
              'Charger',
            ],
            Fashion: ['Mens Clothes', 'Womens Clothes'],
            Sports: [
              'Cricket Bat',
              'Cricket Ball',
              'Football',
              'Tennis Racket',
            ],
            Home_Appliances: ['Washing Machine', 'AC', 'Chimney', 'Television'],
            Health: ['Protein Powder', 'Dumbells', 'Sportswear'],
          };
          Object.entries(categoryMap).forEach(([key, value]) => {
            if (params['category'] == key) {
              categoryArray = value;
            }
          });
          console.log(categoryArray);
          // now fetch all products for the category.
        } else if (
          params['search'] !== undefined &&
          params['category'] === undefined
        ) {
          // Normal search for products
          this.fetchProducts(params['search']);
          this.displayResultsStyle = 'block';
        }
      }
    });
  }

  shuffleArray(arr: any[]) {
    const res = [];
    while (arr.length) {
      res.push(arr.splice(~~(Math.random() * arr.length), 1)[0]);
    }
    return res;
  }

  fetchProducts(productName: string) {
    let url = this.apiUrl + productName;
    this.api.getProducts(url).subscribe({
      next: (products) => {
        this.results = products;
        this.results = this.results.flat();
        this.results = this.shuffleArray(this.results);
        console.log(this.results);
        // this.results = this.results.filter((x: any) => {
        //   return (
        //     x.href != undefined &&
        //     x.title != undefined &&
        //     x.site != undefined &&
        //     x.price != undefined &&
        //     x.link != undefined
        //   );
        // });
      },
      error: (error) => {
        console.log('oops: ', error);
        this.gotError = true;
      },
    });
    // turn loading off
    setInterval(() => {
      this.displayLoadingStyle = 'none';
    }, 8000);
  }
}
