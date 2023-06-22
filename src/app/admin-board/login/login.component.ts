import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private adminService: AdminService, private fb: UntypedFormBuilder, private router: Router) { }

  loginForm = new UntypedFormGroup({
    email: new UntypedFormControl('', Validators.required),
    password: new UntypedFormControl('', Validators.required)
  })

  ngOnInit(): void {

  }

  submitForm(){
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    this.adminService.adminLogin(email, password).then(() => {
      this.router.navigateByUrl('/admin');
    })
  }

}
