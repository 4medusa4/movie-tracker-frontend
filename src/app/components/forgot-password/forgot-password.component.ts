import { Component, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  email: string = '';
  code: string = '';
  newPassword: string = '';
  step: number = 1;

  constructor(private cdr: ChangeDetectorRef) {}

  sendMail(): void {
  }

  verifyAndSetPassword(): void {
    alert('Password verified and set successfully!');
  }
}

