import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    NgIf
  ],
  template: `
    <div class="forgot-password-container">
      <mat-card class="forgot-password-card">
        <mat-card-header>
          <mat-card-title>Quên mật khẩu</mat-card-title>
          <mat-card-subtitle>Nhập email của bạn để nhận hướng dẫn đặt lại mật khẩu</mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          <form [formGroup]="forgotPasswordForm" (ngSubmit)="onSubmit()">
            <mat-form-field class="full-width">
              <mat-label>Email</mat-label>
              <input matInput type="email" formControlName="email" required>
              <mat-error *ngIf="forgotPasswordForm.get('email')?.hasError('required')">
                Email là bắt buộc
              </mat-error>
              <mat-error *ngIf="forgotPasswordForm.get('email')?.hasError('email')">
                Email không hợp lệ
              </mat-error>
            </mat-form-field>

            <div class="form-actions">
              <button mat-raised-button color="primary" type="submit" [disabled]="forgotPasswordForm.invalid">
                Gửi yêu cầu
              </button>
            </div>
          </form>
        </mat-card-content>

        <mat-card-footer>
          <p class="text-center">
            <a routerLink="/auth/login">Quay lại đăng nhập</a>
          </p>
        </mat-card-footer>
      </mat-card>
    </div>
  `,
  styles: [`
    .forgot-password-container {
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .forgot-password-card {
      width: 100%;
      max-width: 400px;
      margin: 16px;
      padding: 16px;
    }

    mat-card-header {
      margin-bottom: 16px;
    }

    mat-form-field {
      margin-bottom: 16px;
    }

    .form-actions {
      display: flex;
      justify-content: center;
      margin-top: 24px;
    }

    mat-card-footer {
      margin: 16px -16px -16px;
      padding: 16px;
      background: #f5f5f5;
      border-radius: 0 0 4px 4px;

      p {
        margin: 0;
      }
    }

    @media (max-width: 600px) {
      .forgot-password-card {
        margin: 0;
        border-radius: 0;
        box-shadow: none;
      }
    }
  `]
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.forgotPasswordForm.valid) {
      // TODO: Implement forgot password logic
      console.log('Forgot password request:', this.forgotPasswordForm.value);
      
      // Show success message or redirect
      this.forgotPasswordForm.reset();
      alert('Hướng dẫn đặt lại mật khẩu đã được gửi đến email của bạn.');
    }
  }
}
