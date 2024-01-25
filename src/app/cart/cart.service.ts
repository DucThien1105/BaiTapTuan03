import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CurrencyPipe } from '@angular/common';
import { isNgTemplate } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartItemList : any = []
  public productList = new BehaviorSubject<any>([]);

  constructor() { }
  getProducts() {
    return this.productList.asObservable();
  }
  setProduct (product : any) {
    this.cartItemList.push(...product);
    this.productList.next(product);
  }
  addToCart(product: any): void {
    // Tạo mảng mới là existingItem từ mảng cũ cartItemList với điều kiện là trùng id thì công cộng dồn 
    const existingItem = this.cartItemList.find((item: any) => item.id === product.id);
  
    if (existingItem) {
      // Cộng dồn
      existingItem.quantity++;
      // Tính tổng giá của 1 sản phẩm được thêm 
      const price = parseFloat(product.price.replace('.', '').replace(',', '.'));
      existingItem.extort = price * existingItem.quantity;
    } else {
      const newItem = { ...product, quantity: 1, extort: product.total };
      this.cartItemList.push(newItem);
    }
  
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
    console.log(this.cartItemList);
  }
  
  getTotalPrice() : number{
    let grandTotal = 0;
    this.cartItemList.map((a:any)=>{
      grandTotal += a.extort;
    })
    return grandTotal;
  }
  removeCartItem(element: any) {
    this.cartItemList = this.cartItemList.filter((item: any) => item.id !== element.id);
    this.productList.next(this.cartItemList);
  }
  removeAllCart(){
    this.cartItemList = []
    this.productList.next(this.cartItemList);
  }
}
