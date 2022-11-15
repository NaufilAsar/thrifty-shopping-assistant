import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
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
    private eRef: ElementRef,
    private router: Router,
    private title: Title,
    private activatedRoute: ActivatedRoute,
    private api: GetProductsService,
    public sharingService: SharingService
  ) {}

  isLoading = true;
  resetFilters = false;
  gotError = false;
  productName: string | null = '';
  errorMessage = 'Looks like something went wrong on our side...';
  // apiUrl = 'https://thrifty-api.herokuapp.com/results?product=';
  apiUrl = 'http://localhost:8080/results?product=';
  // apiUrl = 'https://tender-grass-55002.pktriot.net/results?product=';
  results: any = [];
  // Start loading animations
  pageNumber: number = 1;
  search_bar = new FormControl(''); // search bar
  search_icon = faMagnifyingGlass;
  message = '';
  showPopUp = false;
  showFilters = false;
  hideFilterDropdown = true;

  ngOnInit(): void {
    this.isLoading = true;
    this.resolveQueryParams();
  }

  filterBtnClick() {
    this.hideFilterDropdown = !this.hideFilterDropdown;
  }

  onClickSearch() {
    if (this.search_bar.value!.length > 2) {
      // display loading indicator
      this.router.navigateByUrl(
        '/results?search=' + this.search_bar.value?.replace(' ', '_')
      );
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

  shuffleArrayOfProducts(array: any) {
    var m = array.length,
      t,
      i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }

    return array;
  }

  onProductClick(data: any) {
    localStorage.setItem('product', JSON.stringify(data));
  }

  fetchProducts(productName: string | null) {
    this.isLoading = true;
    this.productName =
      "'" + productName?.replace("'", '').replace('_', ' ') + "'";
    let url = this.apiUrl + productName;
    this.api.getProducts(url).subscribe({
      next: (products) => {
        this.isLoading = false;
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
      },
      error: (error) => {
        console.log('oops: ', error);
        this.gotError = true;
      },
    });
    // turn on filters
    this.showFilters = true;
  }

  // fetchProductsForCategory
  fetchProductsForCategory(categoryName: string) {
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
      Fashion: ['Mens Clothes', 'Womens Clothes', 'Footwear', 'Watches'],
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
          this.isLoading = true;
          Object.entries(products).forEach(([k, v]) => {
            this.results.push(v);
            this.results = this.results.flat();
          });
          this.results = this.results.filter((x: any) => {
            return (
              x.href != undefined &&
              x.title != undefined &&
              x.site != undefined &&
              x.price != undefined &&
              x.link != undefined
            );
          });
          this.results = this.shuffleArray(this.results);
          this.isLoading = false;
        },
        error: (error) => {
          console.log('oops: ', error);
          this.gotError = true;
          return;
        },
      });
    }
    this.sharingService.setproductArray(this.results);
    this.showFilters = false;
  }

  // filter products
  filterResults({
    byPriceLowToHigh,
    byPriceHighToLow,
    byMinimumPrice,
    byMaximumPrice,
    price,
  }: iFilter) {
    if (byPriceLowToHigh) {
      const checkbox = <HTMLInputElement>(
        document.getElementById('low_to_high_filter')
      );
      checkbox.checked = !checkbox.checked;
      if (checkbox.checked) {
        const checkbox2 = <HTMLInputElement>(
          document.getElementById('high_to_low_filter')
        );
        if (checkbox2.checked) checkbox2.checked = false;
        this.results = this.results.sort((a: any, b: any) =>
          this.compare(a, b)
        );
        this.resetFilters = true;
      } else this.results = this.shuffleArrayOfProducts(this.results);
    }
    if (byPriceHighToLow) {
      const checkbox = <HTMLInputElement>(
        document.getElementById('high_to_low_filter')
      );
      checkbox.checked = !checkbox.checked;
      if (checkbox.checked) {
        const checkbox2 = <HTMLInputElement>(
          document.getElementById('low_to_high_filter')
        );
        if (checkbox2.checked) checkbox2.checked = false;
        this.results = this.results.sort((a: any, b: any) =>
          this.compare(b, a)
        );
        this.resetFilters = true;
      } else this.results = this.shuffleArrayOfProducts(this.results);
    }
    if (byMinimumPrice) {
      const checkbox = <HTMLInputElement>document.getElementById('min_filter');
      if (checkbox.checked) {
        if (Number(price) > 0) {
          this.results = this.results.filter((x: any) => {
            let a = Number(x.price.replace(',', ''));
            let b = Number(price);
            console.log(a, b);
            return a > b;
          });
        } else {
          this.showPopUp = true;
          this.message = 'Invalid price';
        }
        this.resetFilters = true;
      } else this.results = this.sharingService.getproductArray();
    }
    if (byMaximumPrice) {
      const checkbox = <HTMLInputElement>document.getElementById('max_filter');
      if (checkbox.checked) {
        if (Number(price) > 0) {
          this.results = this.results.filter((x: any) => {
            let a = Number(x.price.replace(',', ''));
            let b = Number(price);
            console.log(a, b);
            return a < b;
          });
        } else {
          this.showPopUp = true;
          this.message = 'Invalid price';
        }
        this.resetFilters = true;
      } else this.results = this.sharingService.getproductArray();
    }
  }

  reloadPage() {
    window.location.reload();
  }

  compare(a: any, b: any) {
    a = parseFloat(a.price.replace(',', ''));
    b = parseFloat(b.price.replace(',', ''));
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
    return 0;
  }

  // filter by product brand
  filterByBrand({
    byAmazon,
    byFlipkart,
    byReliance,
    byShopClues,
  }: iFilterByBrand) {
    if (byAmazon) {
      this.results = this.sharingService.getproductArray();
      const checkbox = <HTMLInputElement>(
        document.getElementById('amazon_filter')
      );
      checkbox.checked = !checkbox.checked;
      if (checkbox.checked) {
        this.results = this.results.filter((x: any) => {
          return x.site === 'Amazon';
        });
        this.resetFilters = true;
      }
    }
    if (byReliance) {
      this.results = this.sharingService.getproductArray();
      const checkbox = <HTMLInputElement>(
        document.getElementById('reliance_filter')
      );
      checkbox.checked = !checkbox.checked;
      if (checkbox.checked) {
        this.results = this.results.filter((x: any) => {
          return x.site === 'Reliance';
        });
        this.resetFilters = true;
      }
    }
    if (byFlipkart) {
      this.results = this.sharingService.getproductArray();
      const checkbox = <HTMLInputElement>(
        document.getElementById('flipkart_filter')
      );
      checkbox.checked = !checkbox.checked;
      if (checkbox.checked) {
        this.results = this.results.filter((x: any) => {
          return x.site === 'Flipkart';
        });
        this.resetFilters = true;
      }
    }
    if (byShopClues) {
      this.results = this.sharingService.getproductArray();
      const checkbox = <HTMLInputElement>(
        document.getElementById('shopclues_filter')
      );
      checkbox.checked = !checkbox.checked;
      if (checkbox.checked) {
        this.results = this.results.filter((x: any) => {
          return x.site === 'ShopClues';
        });
        this.resetFilters = true;
      }
    }
  }
  filterByBrand2({
    byAmazon,
    byFlipkart,
    byReliance,
    byShopClues,
  }: iFilterByBrand) {
    const checkboxAmazon = <HTMLInputElement>(
      document.getElementById('amazon_filter')
    );
    const checkboxFlipkart = <HTMLInputElement>(
      document.getElementById('flipkart_filter')
    );
    const checkboxReliance = <HTMLInputElement>(
      document.getElementById('reliance_filter')
    );
    const checkboxShopClues = <HTMLInputElement>(
      document.getElementById('shopclues_filter')
    );

    let filter = {
      amazon: checkboxAmazon.checked,
      flipkart: checkboxFlipkart.checked,
      reliance: checkboxReliance.checked,
      shopclues: checkboxShopClues.checked,
    };

    this.results = this.sharingService.getproductArray();

    this.results = this.results.filter((x: any) => {
      let y: any = [];
      if (byAmazon) {
        y.push('Amazon');
      }
      if (byFlipkart) {
        y.push('Flipkart');
      }
      if (byReliance) {
        y.push('Reliance');
      }
      if (byShopClues) {
        y.push('ShopClues');
      }
      console.log(y);
      return y.includes(x.site);
    });
    this.resetFilters = true;
  }
}

interface iFilterByBrand {
  byAmazon?: boolean;
  byFlipkart?: boolean;
  byShopClues?: boolean;
  byReliance?: boolean;
}
interface iFilter {
  byPriceLowToHigh?: boolean;
  byPriceHighToLow?: boolean;
  byMinimumPrice?: boolean;
  byMaximumPrice?: boolean;
  price?: string;
}
