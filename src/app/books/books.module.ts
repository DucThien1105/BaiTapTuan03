import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookRoutingModule } from './book-routing.module';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';


@NgModule({
  declarations: [
    BookListComponent,
    BookDetailComponent
  ],
  imports: [
    CommonModule,
    BookRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule
  ]
})
export class BooksModule { }
