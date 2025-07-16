import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'newsfeed',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: 'newsfeed',
    loadChildren: () => import('./features/newsfeed/newsfeed.routes').then(m => m.NEWSFEED_ROUTES)
  },
  {
    path: 'messages',
    loadChildren: () => import('./features/message/message.routes').then(m => m.MESSAGE_ROUTES)
  },
  {
    path: 'profile',
    loadChildren: () => import('./features/profile/profile.routes').then(m => m.PROFILE_ROUTES)
  },
  {
    path: '**',
    redirectTo: 'newsfeed'
  }
];
