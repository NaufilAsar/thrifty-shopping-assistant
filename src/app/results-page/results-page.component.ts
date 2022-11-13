import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GetProductsService } from '../services/get-products.service';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { SharingService } from '../services/sharing.service';

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
    private api: GetProductsService,
    public sharingService: SharingService
  ) {}

  gotError = false;
  productName: string | null = '';
  errorMessage = 'Looks like something went wrong on our side...';
  // apiUrl = 'https://thrifty-api.herokuapp.com/results?product=';
  apiUrl = 'http://localhost:8080/results?product=';
  // apiUrl = 'https://tender-grass-55002.pktriot.net/results?product=';
  results: any = [];
  // Start loading animations
  hideLoadingAnimation = false;
  hideResults = true;
  pageNumber: number = 1;
  search_bar = new FormControl(''); // search bar
  search_icon = faMagnifyingGlass;
  message = '';
  showPopUp = false;
  showFilters = false;

  ngOnInit(): void {
    this.resolveQueryParams();
  }

  onClickSearch() {
    if (this.search_bar.value!.length > 2) {
      // display loading indicator
      this.hideLoadingAnimation = false;
      this.router.navigateByUrl('/results?search=' + this.search_bar.value);
    } else {
      // error Popup
      this.showPopUp = true;
      this.message = 'Please enter minimum 3 letters';
      this.showFilters = false;
    }
  }

  resolveQueryParams() {
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
          // now fetch all products for the category.
          this.fetchProductsForCategory(params['category']);
        } else if (
          params['search'] !== undefined &&
          params['category'] === undefined
        ) {
          // Normal search for products
          this.fetchProducts(params['search']);
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

  onProductClick(data: any) {
    localStorage.setItem('product', JSON.stringify(data));
  }

  fetchProducts(productName: string) {
    this.productName = "'" + productName + "'";
    let url = this.apiUrl + productName;
    this.api.getProducts(url).subscribe({
      next: (products) => {
        this.results = products;
        this.results = this.shuffleArray(this.results.flat());
        this.sharingService.setproductArray(this.results);
        console.log(this.results);
        this.results = this.results.filter((x: any) => {
          return (
            x.href != undefined &&
            x.title != undefined &&
            x.site != undefined &&
            x.price != undefined &&
            x.link != undefined
          );
        });
        // display the results
        this.hideResults = false;
      },
      error: (error) => {
        console.log('oops: ', error);
        this.gotError = true;
      },
    });
    // turn loading off
    this.hideLoadingAnimation = true;
    this.showFilters = true;
  }

  // fetchProductsForCategory
  fetchProductsForCategory(categoryName: string) {
    this.hideLoadingAnimation = false;
    this.hideResults = true;
    // an array of products to fetch for a particular category.
    var categoryArray: any = [];
    var categoryMap = {
      Computer: [
        'Computer',
        'Mobile',
        'Keyboard',
        'Powerbank',
        'Charger',
        'Smartwatches',
      ],
      Fashion: ['Mens Wear', 'Womens Wear', 'Footwear', 'Watches'],
      Sports: [
        'Cricket Bat',
        'Cricket Ball',
        'Football',
        'Tennis Racket',
        'Cycles',
      ],
      Home_Appliances: ['Washing Machine', 'AC', 'Chimney', 'Television'],
      Health: ['Protein Powder', 'Dumbells', 'Medicine', 'Yoga'],
    };
    // identify the type of category
    Object.entries(categoryMap).forEach(([key, value]) => {
      if (categoryName == key) categoryArray = value;
    });
    if (categoryName == 'Home_Appliances')
      this.productName = 'Category: Home Appliances';
    else this.productName = 'Category: ' + categoryName;
    // loop for every product of a category and store the results.
    this.results = [];
    for (let i = 0; i < categoryArray.length; i++) {
      let url = this.apiUrl + categoryArray[i];
      this.api.getProducts(url).subscribe({
        next: (products: any) => {
          // let temp: any = [];
          // temp = products as Array<any>;
          // temp = temp.flat();
          // this.results.push(temp.flat(5));
          // this.results.push(products.flat() as Array<any>);

          Object.entries(products).forEach(([k, v]) => {
            this.results.push(v);
            this.results = this.results.flat();
          });

          // this.results.push(products);
          // this.results = this.results.flat();
          // this.results = this.results.filter((x: any) => {
          //   return (
          //     x.href != undefined &&
          //     x.title != undefined &&
          //     x.site != undefined &&
          //     x.price != undefined &&
          //     x.link != undefined &&
          //     x.href != null &&
          //     x.title != null &&
          //     x.site != null &&
          //     x.price != null &&
          //     x.link != null
          //   );
          // });
          this.results = this.shuffleArray(this.results);
        },
        error: (error) => {
          console.log('oops: ', error);
          this.gotError = true;
          return;
        },
      });
    }
    console.log('Results:   ' + this.results);
    this.hideResults = false; // display the results
    this.sharingService.setproductArray(this.results);
    this.showFilters = true;
  }

  // filter products
  filterResults(filter: string) {
    const checkbox = <HTMLInputElement>document.getElementById('amazon_filter');
    checkbox.checked = !checkbox.checked;
    if (filter === 'Amazon') {
      let temp: Array<any> = [];
      this.results = this.results.flat();
      temp = this.results;
      temp.filter((p) => {
        return p.site === 'Amazon';
      });
      this.results = temp;
    }
  }
}

interface Product {}
