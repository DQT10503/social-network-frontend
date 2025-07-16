import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { User } from '../../models/user.interface';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false
};

export const AuthStore = signalStore(
  { providedIn: 'root' },

  withState(initialState),
  
  withComputed(({ user, token }) => ({
    isLoggedIn: computed(() => !!token()),
    currentUser: computed(() => user())
  })),
  
  withMethods((store) => ({
    setUser(user: User | null) {
      patchState(store, { user });
    },
    setToken(token: string | null) {
      patchState(store, { token, isAuthenticated: !!token });
    },
    logout() {
      patchState(store, initialState);
    }
  }))
);

export type AuthStore = InstanceType<typeof AuthStore>;