import { Component, OnInit } from '@angular/core';
import { ApiService } from '../books.service';
import { CartService } from 'src/app/cart/cart.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit {
  booklist: any[] = [];
  isLoggedIn: boolean = false;
  public totalItem : number = 0;

  constructor(private api: ApiService, private cartService: CartService) {}
  
  ngOnInit(): void {
    this.HandleGetBook();
    this.api.books.subscribe((res: any) => {
      this.booklist = res;

      this.booklist.forEach((a:any) => {
        Object.assign(a, {quantity:1, total: a.price});
      })
    });

    this.cartService.getProducts().subscribe((res : any) => {
      this.totalItem = res.length;
    })
  }
  HandleGetBook(): void {
    this.api.getbook();
  }
  addToCart(item: any) {
    this.cartService.addToCart(item);
  } 
}
