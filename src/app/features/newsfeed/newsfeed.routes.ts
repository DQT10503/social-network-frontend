import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';

export const NEWSFEED_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./newsfeed/newsfeed.component').then(m => m.NewsfeedComponent),
    canActivate: [authGuard]
  }
]; 