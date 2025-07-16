import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';

export const PROFILE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent),
    canActivate: [authGuard]
  },
  {
    path: ':id',
    loadComponent: () => import('./user-profile/user-profile.component').then(m => m.UserProfileComponent),
    canActivate: [authGuard]
  }
]; 