import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm !: FormGroup
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
      this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
      })
  }
  login() {
    this.http.get<any>("http://localhost:3000/users")
      .subscribe(
        (res: any[]) => {
          const user = res.find((a: any) => {
            return a.username === this.loginForm.value.username &&
                   a.password === this.loginForm.value.password;
          });
  
          if (user) {
            this.toastr.success('Login Successful');
            this.loginForm.reset();
            this.router.navigate(['']);
          } else {
            this.toastr.error('Users not found!');
          }
        },
        err => {
          this.toastr.error('Something went wrong!');
        }
      );
  }
}
