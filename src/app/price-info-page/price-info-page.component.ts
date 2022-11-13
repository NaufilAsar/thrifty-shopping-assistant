import { Component, OnInit } from '@angular/core';
import { GetProductsService } from '../services/get-products.service';
import { SharingService } from '../services/sharing.service';
import { Title } from '@angular/platform-browser';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
import { FormControl } from '@angular/forms';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-price-info-page',
  templateUrl: './price-info-page.component.html',
  styleUrls: ['./price-info-page.component.css'],
})
export class PriceInfoPageComponent implements OnInit {
  product: any = JSON.parse(localStorage.getItem('product') as string);

  // apiUrl: string = 'http://localhost:8080/specs?link=';
  apiUrl: string = 'https://thrifty-api.herokuapp.com/specs?link=';
  productArray: any;

  email = new FormControl('');
  arrow_icon = faArrowRight;
  displayStyle = 'none';
  suggestions: any = [];
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
        data: Array(this.months.length).fill(this.product.price),
        label: 'Price',

        fill: true,
        tension: 0,
        borderColor: 'black',

        backgroundColor: 'rgba(219,243,235,0.5)',
        borderWidth: 2,
      },
      {
        data: Array(this.months.length).fill(this.product.mrp),
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
    private sharingService: SharingService,
    private api: GetProductsService,
    private title: Title
  ) {
    title.setTitle('Product - Thrifty');
  }

  ngOnInit(): void {
    this.productArray = this.sharingService.getproductArray();
    console.log(this.productArray);
    this.product = JSON.parse(localStorage.getItem('product') as string);
    console.log(this.product);
    if (this.product != undefined) {
      this.fetchSpecfications();
      this.product.price = parseInt(
        this.product.price.toLocaleString().replace('₹', '').replace(',', '')
      );
      this.product.mrp = parseInt(
        this.product.mrp.toLocaleString().replace('₹', '').replace(',', '')
      );
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
    let url = this.apiUrl + this.product.link;
    this.api.getProducts(url).subscribe({
      next: (specs: any) => {
        console.log(specs);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
