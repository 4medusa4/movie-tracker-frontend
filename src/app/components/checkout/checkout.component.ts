import { Component } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  selectedPaymentOption: string = 'payNow'; 
  selectPaymentOption(option: string): void {
    this.selectedPaymentOption = option;
  }
}
