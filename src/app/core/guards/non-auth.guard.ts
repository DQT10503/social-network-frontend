import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStore } from '../store/auth/auth.store';

export const nonAuthGuard = () => {
  const router = inject(Router);
  const authStore = inject(AuthStore);

  if (!authStore.isLoggedIn()) {
    return true;
  }
  
  router.navigate(['/newsfeed']);
  return false;
};
