import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl="http://localhost:3000/users";
  constructor(private http:HttpClient) { }
  

  login(username: string, password: string): Observable<any> {
    const credentials = { username, password };

    return this.http.post<any>(`${this.apiUrl}/login`, credentials)
      .pipe(
        map(response => {
          // Lưu mã xác thực vào local storage
          localStorage.setItem('authToken', response.token);
          return response;
        }),
        catchError(error => of(error))
      );
  }
}
