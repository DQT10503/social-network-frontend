import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgIf } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    NgIf
  ],
  template: `
    <div class="register-container">
      <mat-card class="register-card">
        <mat-card-header>
          <mat-card-title>Đăng ký</mat-card-title>
          <mat-card-subtitle>Tạo tài khoản mới</mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
            <mat-form-field class="full-width">
              <mat-label>Họ và tên</mat-label>
              <input matInput formControlName="fullName" required>
              <mat-error *ngIf="registerForm.get('fullName')?.hasError('required')">
                Họ và tên là bắt buộc
              </mat-error>
            </mat-form-field>

            <mat-form-field class="full-width">
              <mat-label>Email</mat-label>
              <input matInput type="email" formControlName="email" required>
              <mat-error *ngIf="registerForm.get('email')?.hasError('required')">
                Email là bắt buộc
              </mat-error>
              <mat-error *ngIf="registerForm.get('email')?.hasError('email')">
                Email không hợp lệ
              </mat-error>
            </mat-form-field>

            <mat-form-field class="full-width">
              <mat-label>Số điện thoại</mat-label>
              <input matInput type="tel" formControlName="phone" required>
              <mat-error *ngIf="registerForm.get('phone')?.hasError('required')">
                Số điện thoại là bắt buộc
              </mat-error>
              <mat-error *ngIf="registerForm.get('phone')?.hasError('pattern')">
                Số điện thoại không hợp lệ
              </mat-error>
            </mat-form-field>

            <mat-form-field class="full-width">
              <mat-label>Mật khẩu</mat-label>
              <input matInput [type]="hidePassword ? 'password' : 'text'" formControlName="password" required>
              <button mat-icon-button matSuffix (click)="hidePassword = !hidePassword" type="button">
                <mat-icon>{{hidePassword ? 'visibility_off' : 'visibility'}}</mat-icon>
              </button>
              <mat-error *ngIf="registerForm.get('password')?.hasError('required')">
                Mật khẩu là bắt buộc
              </mat-error>
              <mat-error *ngIf="registerForm.get('password')?.hasError('minlength')">
                Mật khẩu phải có ít nhất 6 ký tự
              </mat-error>
            </mat-form-field>

            <mat-form-field class="full-width">
              <mat-label>Xác nhận mật khẩu</mat-label>
              <input matInput [type]="hidePassword ? 'password' : 'text'" formControlName="passwordConfirm" required>
              <button mat-icon-button matSuffix (click)="hidePassword = !hidePassword" type="button">
                <mat-icon>{{hidePassword ? 'visibility_off' : 'visibility'}}</mat-icon>
              </button>
              <mat-error *ngIf="registerForm.get('passwordConfirm')?.hasError('required')">
                Xác nhận mật khẩu là bắt buộc
              </mat-error>
            </mat-form-field>

            <div class="form-actions">
              <button mat-raised-button color="primary" type="submit" [disabled]="registerForm.invalid || isLoading">
                <mat-spinner diameter="20" *ngIf="isLoading"></mat-spinner>
                <span *ngIf="!isLoading">Đăng ký</span>
              </button>
            </div>
          </form>
        </mat-card-content>

        <mat-card-footer>
          <p class="text-center">
            Đã có tài khoản? 
            <a routerLink="/auth/login">Đăng nhập</a>
          </p>
        </mat-card-footer>
      </mat-card>
    </div>
  `,
  styles: [`
    .register-container {
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px 0 20px 0;
    }

    .register-card {
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
      .register-card {
        margin: 0;
        border-radius: 0;
        box-shadow: none;
      }
    }

    button[type="submit"] {
      min-width: 120px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    mat-spinner {
      margin: 0 auto;
    }
  `]
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private fb = inject(FormBuilder);

  registerForm: FormGroup = this.fb.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required]],
    phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    passwordConfirm: ['', [Validators.required]]
  });

  hidePassword = true;
  isLoading = false;

  onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.authService.register(this.registerForm.value).subscribe({
        next: () => {
          this.router.navigate(['/newsfeed']);
        },
        error: (error) => {
          this.snackBar.open(error.error[0]?.message || 'Đăng ký thất bại', 'Đóng', {
            duration: 3000
          });
          this.isLoading = false;
          console.error('Registration error:', error.error);
        }
      });
    }
  }
}
