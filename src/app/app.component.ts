import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { HeaderComponent } from './core/components/header/header.component';
import { Utilities } from './core/utils/utilities';
import { AuthStore } from './core/store/auth/auth.store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private authStore = inject(AuthStore);
  isLoggedIn = this.authStore.isLoggedIn;

  ngOnInit() {
    Utilities.initializeTheme();
    
    // Khôi phục trạng thái đăng nhập từ localStorage
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    if (token && userStr) {
      const user = JSON.parse(userStr);
      this.authStore.setToken(token);
      this.authStore.setUser(user);
    }
  }
}
