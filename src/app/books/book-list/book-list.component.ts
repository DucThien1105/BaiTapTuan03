import { Component, OnInit } from '@angular/core';
import { ApiService } from '../books.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  booklist: any[] = [];
    isLoggedIn: boolean = false; 

    constructor(private api: ApiService) { }

    ngOnInit(): void {
        this.HandleGetBook();
        this.api.books.subscribe((res: any) => {
            this.booklist = res;
        });
    }
    HandleGetBook() :void {
        this.api.getbook();
    }

}
