import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import AuthService from 'src/app/service/auth-service/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  loginForm: FormGroup;
  serverError: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService) {
    this.loginForm = this.formBuilder.group({
      loginEmail: ['', {
        validators: [Validators.required, Validators.email],
        asyncValidators: [],
        updateOn: 'blur'
      }],
      loginPassword: ['', {
        validators: [Validators.required],
        asyncValidators: [],
        updateOn: 'blur'
      }]
    });
  }

  get loginEmail() {
    return this.loginForm.get('loginEmail');
  }

  get loginPassword() {
    return this.loginForm.get('loginPassword');
  }

  onSuccessHandler = (response: any) => {
    this.router.navigate(['/home'], { queryParams: { success: true } })
  }

  onErrorHandler = (e: Error) => {
    this.toastr.error(e.message, 'Sign In Error');

  }

  onLoginHandler = () => {
    if (this.loginForm.valid) {
      const _data = {
        'email': this.loginEmail?.value.trim().toLowerCase(),
        'password': this.loginPassword?.value.trim()
      };

      this.authService.newUserLogin(
        _data,
        this.onSuccessHandler,
        this.onErrorHandler
      ).subscribe();
    } else {
      if (this.loginEmail?.invalid) {
        if (this.loginEmail?.errors?.['required']) {
          this.loginEmail?.setErrors({ required: true });
        } else if (this.loginEmail?.errors?.['email']) {
          this.loginEmail?.setErrors({ email: true });
        }
      }
      if (this.loginPassword?.invalid) {
        this.loginPassword?.setErrors({ required: true });
      }
      this.loginForm.markAllAsTouched();
    }
  }
}

