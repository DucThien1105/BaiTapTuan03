import { Component, OnInit } from '@angular/core';
import { Items } from '../shared/models/cart-item';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'cover_image',
    'product_code',
    'total',
    'quantity',
    'extort',
    'delete'
  ];

  public products: any = [];
  public grandTotal!: number;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getProducts().subscribe((res) => {
      this.products = res;
      this.grandTotal = this.cartService.getTotalPrice();
    });
  }
  removeItem(item: any) {
    this.cartService.removeCartItem(item);
    console.log("removeItem");
    
  }
  emptycart() {
    this.cartService.removeAllCart();
  }
}
