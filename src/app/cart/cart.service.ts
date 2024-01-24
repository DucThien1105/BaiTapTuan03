import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CurrencyPipe } from '@angular/common';

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
  addToCart(product : any){
    const existingItem = this.cartItemList.find((item: any) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity++;
      existingItem.extort = existingItem.quantity * existingItem.total;
    } else {
      const newItem = { ...product, quantity: 1, extort: product.total };
      this.cartItemList.push(newItem);
    }
    
    // this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
    console.log(this.cartItemList)
  }
  getTotalPrice() : number{
    let grandTotal = 0;
    this.cartItemList.map((a:any)=>{
      grandTotal += a.total;
    })
    return grandTotal;
  }
  removeCartItem(product: any){
    this.cartItemList.map((a:any, index:any)=>{
      if(product.id=== a.id){
        this.cartItemList.splice(index,1);
      }
    })
    this.productList.next(this.cartItemList);
  }
  removeAllCart(){
    this.cartItemList = []
    this.productList.next(this.cartItemList);
  }
}
