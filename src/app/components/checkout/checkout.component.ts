import { Component } from '@angular/core';
import { MovieApiServiceService } from 'src/app/service/movie-api-service/movie-api-service.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  constructor(private service: MovieApiServiceService) { }

  handleOnSubmit() {
    console.log('checkout')
  }

  selectedPaymentOption: string = 'payNow';
  selectPaymentOption(option: string): void {
    this.selectedPaymentOption = option;
  }
}
