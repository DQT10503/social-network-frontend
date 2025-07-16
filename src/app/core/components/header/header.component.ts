import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AuthStore } from '../../store/auth/auth.store';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    RouterLink
  ],
  template: `
    <mat-toolbar color="primary" class="header">
      <span routerLink="/" class="logo">Social Network</span>
      <span class="spacer"></span>
      
      @if (authStore.isLoggedIn()) {
        <button mat-icon-button [matMenuTriggerFor]="menu">
          <mat-icon>account_circle</mat-icon>
        </button>
        <mat-menu #menu="matMenu">
          <button mat-menu-item routerLink="/profile">
            <mat-icon>person</mat-icon>
            <span>Hồ sơ</span>
          </button>
          <button mat-menu-item routerLink="/messages">
            <mat-icon>message</mat-icon>
            <span>Tin nhắn</span>
          </button>
          <button mat-menu-item (click)="logout()">
            <mat-icon>exit_to_app</mat-icon>
            <span>Đăng xuất</span>
          </button>
        </mat-menu>
      } @else {
        <button mat-button routerLink="/auth/login">Đăng nhập</button>
        <button mat-button routerLink="/auth/register">Đăng ký</button>
      }
    </mat-toolbar>
  `,
  styles: [`
    .spacer {
      flex: 1 1 auto;
    }
    .logo {
      cursor: pointer;
      font-size: 1.2em;
      font-weight: 500;
    }
  `]
})
export class HeaderComponent {
  private router = inject(Router);
  public authStore: AuthStore = inject(AuthStore);
  private authService = inject(AuthService);

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/auth/login']);
      }
    }); 
  }
} 