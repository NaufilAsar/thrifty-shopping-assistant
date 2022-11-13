import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharingService {
  private productArray: any = undefined;

  setproductArray(productArray: any) {
    this.productArray = productArray;
  }

  getproductArray(): any {
    return this.productArray;
  }
}
