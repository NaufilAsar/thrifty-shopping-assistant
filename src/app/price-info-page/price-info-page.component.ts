import { Component, OnInit } from '@angular/core';
import { GetProductsService } from '../services/get-products.service';
import { SharingService } from '../services/sharing.service';
import { Title } from '@angular/platform-browser';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
import { FormControl } from '@angular/forms';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-price-info-page',
  templateUrl: './price-info-page.component.html',
  styleUrls: ['./price-info-page.component.css'],
})
export class PriceInfoPageComponent implements OnInit {
  product: any = JSON.parse(localStorage.getItem('product') as string);

  showPopUp = false;
  message = '';
  email = new FormControl('');
  arrow_icon = faArrowRight;
  displayStyle = 'none';
  suggestions: any = [];
  specs = {};
  priceData: number[] = [];
  mrpData: number[] = [];
  months = [
    'January 2022',
    'February 2022',
    'March 2022',
    'April 2022',
    'May 2022',
    'June 2022',
    'July 2022',
    'August 2022',
    'September 2022',
    'October 2022',
    'November 2022',
    'December 2022',
  ];

  // Chart configuration

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: this.months,
    datasets: [
      {
        data: this.priceData,
        label: 'Price',
        fill: true,
        tension: 0,
        borderColor: 'black',
        backgroundColor: 'rgba(219,243,235,0.5)',
        borderWidth: 2,
      },
      {
        data: this.mrpData,
        label: 'Mrp',
        fill: true,
        tension: 0,
        borderColor: 'black',
        backgroundColor: 'rgba(52, 58, 64, 0.2)',
        borderWidth: 2,
      },
    ],
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          // This more specific font property overrides the global property
          font: {
            size: 14,
            family: 'Ubuntu',
          },
          boxPadding: 40,
        },
      },
    },
    scales: {
      y: {
        weight: -1,
        ticks: {
          color: 'gray',
          font: { family: 'Ubuntu' },
          maxRotation: 20,
        },
      },
      x: {
        weight: -1,
        ticks: {
          color: 'gray',
          font: { family: 'Ubuntu' },
          maxRotation: 20,
          stepSize: 1,
        },
      },
    },
  };
  public lineChartLegend = true;

  constructor(
    public authService: AuthService,
    private sharingService: SharingService,
    private api: GetProductsService,
    private title: Title
  ) {
    title.setTitle('Product - Thrifty');
  }

  ngOnInit(): void {
    console.log(this.authService.userEmail);
    this.product = JSON.parse(localStorage.getItem('product') as string);
    if (this.product != undefined) {
      this.fetchSpecfications();
      this.product.price = parseInt(
        this.product.price.toLocaleString().replace('₹', '').replace(',', '')
      );
      this.product.mrp = parseInt(
        this.product.mrp.toLocaleString().replace('₹', '').replace(',', '')
      );
      // console.log(this.product);
      for (let i = 0; i < this.months.length; i++) {
        this.priceData.push(this.product.price);
        this.mrpData.push(this.product.mrp);
      }
    }
    //
    let currentMonth = new Date().toLocaleString('en-us', { month: 'long' });
    let currentMonthNumber = new Date().getMonth() + 1;
    // get current month and display prices till the current month
    this.months.splice(currentMonthNumber);
    if (this.months.length > 6) {
      this.months.splice(0, 4);
    }
  }

  fetchSpecfications(): void {
    this.api.getSpecfications(this.product.link).subscribe({
      next: (specs: any) => {
        console.log(specs);
        this.specs = specs;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  subscribe() {
    if (this.product != undefined) {
      let url =
        '/wishlist?act=i&id=' +
        this.authService.authState.email +
        '&title=' +
        this.product.title +
        '&link=' +
        this.product.link +
        '&price=' +
        this.product.price +
        '&search=' +
        localStorage.getItem('search');
      this.api.getProducts(url).subscribe({
        next: (result) => {
          this.message =
            'Done! we will notify you whenever the product is price is updated.';
          this.showPopUp = true;
        },
        error: (error) => {
          console.log(error);
          this.message = 'Something went wrong.. Please try again later.';
          this.showPopUp = true;
        },
      });
    }
  }
}
