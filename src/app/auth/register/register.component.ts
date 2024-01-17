import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup , Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registerForm !: FormGroup;

  // Config Form Reg
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private http: HttpClient,
    private router: Router,
    private service: AuthService,

  ) { }

  ngOnInit(): void {
      this.registerForm = this.formBuilder.group ({
        username:['', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(/^[a-zA-Z0-9]+$/)]],
        password:['', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(32),
          Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/)
        ]],
        name:['', [Validators.required, Validators.maxLength(50)]],
        email:['', [Validators.required, Validators.email]],
        address:['', [Validators.required, Validators.maxLength(100)]],
        phone:['', [Validators.required, Validators.pattern(/^[0-9]{10}$/), Validators.minLength(10)]],
      })
  }

  registration() {
    // Nếu form có giá trị, thực hiện phương thức post lên json server,
    // Thông báo reg thành công
    // Reset giá trị form
    // Chuyển hướng
    if (this.registerForm.valid) {
      this.http.post<any>("http://localhost:3000/users",this.registerForm.value)
      .subscribe(res=>{
        this.toastr.success('Register Successful')
        this.registerForm.reset();
        this.router.navigate(['login']);
      })
    }else {
      this.toastr.warning('Please Enter Valid Data')
    }
  }
}
