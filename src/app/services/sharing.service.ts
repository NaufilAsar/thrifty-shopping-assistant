import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharingService {
  public email: string = '';
  getEmail(): string {
    return this.email;
  }
  setEmail(email: string) {
    this.email = email;
  }
  private productArray: any = undefined;

  setproductArray(productArray: any) {
    this.productArray = productArray;
  }

  getproductArray(): any {
    return this.productArray;
  }
}
