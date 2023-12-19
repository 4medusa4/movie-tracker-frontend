import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import AuthService from 'src/app/service/auth-service/auth-service.service';
import { MovieApiServiceService } from 'src/app/service/movie-api-service/movie-api-service.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  [x: string]: any;
  frmPayLater: FormGroup<any>;
  frmPayNow: FormGroup<any> = new FormGroup<any>({});
  constructor(private service: MovieApiServiceService, private formBuilder: FormBuilder, private authService: AuthService, private http: HttpClient) {
    this.frmPayLater = this.formBuilder.group({
      customerName: ['', {
        validators: [Validators.required, Validators.maxLength(50)],
        asyncValidators: [],
        updateOn: 'blur'
      }],
      loginPassword: ['', {
        validators: [Validators.required],
        asyncValidators: [],
        updateOn: 'blur'
      }]
    });
    this.frmPayNow = new FormGroup<any>({});
    this.authService.isAuthenticatedSubject$.subscribe((isAuthenticated: boolean) => {
      if (isAuthenticated) {
        this.frmPayLater.controls['btnPayNow']?.disable();
        this.frmPayLater.controls['btnPayLater']?.disable();
      } else {
        this.frmPayLater.controls['btnPayNow']?.enable();
        this.frmPayLater.controls['btnPayLater']?.enable();
      }
    });
  }

  handleOnSubmitPayNow = () => {
    console.log('Pay now clicked')
  }

  handleOnSubmitPayLater = () => {
    console.log('pay later clicked')
  }

  selectedPaymentOption: string = 'payNow';
  selectPaymentOption(option: string): void {
    this.selectedPaymentOption = option;
  }
}
