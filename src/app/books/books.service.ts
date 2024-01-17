import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from './shared/models/book';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private _books: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>([]);

  constructor(private http: HttpClient) {}

  getbook() {
    return this.http.get<Book[]>('http://localhost:3000/book')
      .subscribe((e: Book[]) =>{
        this._books.next(e); 
      });
  }
  getBookById(id: any) {
    return this.http.get('http://localhost:3000/book/' + id).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  get books(): Observable<Book[]>{
    return this._books.asObservable();
  }

  updateBooks(books: Book[]){
    this._books.next(books);
  }
}