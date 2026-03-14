# Global Stores Matrix

Use global stores for client-owned state such as session status, theme, filters, and temporary UI workflows.

Security note:
- Prefer `httpOnly` secure cookies for session transport.
- Keep the frontend store focused on `user` and `sessionStatus`.
- If your backend truly requires bearer tokens in the browser, isolate that logic in a dedicated auth service and document the risk explicitly.

## React (Zustand)

Filename: `src/shared/stores/auth.store.ts`
```typescript
import { create } from 'zustand';

type SessionStatus = 'unknown' | 'authenticated' | 'guest';

interface User {
  id: number;
  email: string;
  role: string;
}

interface AuthState {
  status: SessionStatus;
  user: User | null;
  setAuthenticated: (user: User) => void;
  setGuest: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  status: 'unknown',
  user: null,
  setAuthenticated: (user) => set({ status: 'authenticated', user }),
  setGuest: () => set({ status: 'guest', user: null }),
}));
```

## Vue (Pinia)

Filename: `src/shared/stores/auth.store.ts`
```typescript
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

type SessionStatus = 'unknown' | 'authenticated' | 'guest';

export const useAuthStore = defineStore('auth', () => {
  const status = ref<SessionStatus>('unknown');
  const user = ref<User | null>(null);

  const isAuthenticated = computed(() => status.value === 'authenticated');
  const isBootstrapping = computed(() => status.value === 'unknown');

  function setAuthenticated(nextUser: User) {
    status.value = 'authenticated';
    user.value = nextUser;
  }

  function setGuest() {
    status.value = 'guest';
    user.value = null;
  }

  return { status, user, isAuthenticated, isBootstrapping, setAuthenticated, setGuest };
});
```

## Angular (Signals / Services)

Filename: `src/shared/stores/auth.store.ts`
```typescript
import { Injectable, computed, signal } from '@angular/core';

type SessionStatus = 'unknown' | 'authenticated' | 'guest';

@Injectable({ providedIn: 'root' })
export class AuthStore {
  status = signal<SessionStatus>('unknown');
  user = signal<User | null>(null);

  isAuthenticated = computed(() => this.status() === 'authenticated');
  isBootstrapping = computed(() => this.status() === 'unknown');

  setAuthenticated(user: User) {
    this.status.set('authenticated');
    this.user.set(user);
  }

  setGuest() {
    this.status.set('guest');
    this.user.set(null);
  }
}
```

## Astro (Nano Stores)

Filename: `src/shared/stores/auth.store.ts`
```typescript
import { atom, computed } from 'nanostores';

type SessionStatus = 'unknown' | 'authenticated' | 'guest';

export const $sessionStatus = atom<SessionStatus>('unknown');
export const $user = atom<User | null>(null);

export const $isAuthenticated = computed(
  $sessionStatus,
  (status) => status === 'authenticated'
);

export function setAuthenticated(user: User) {
  $sessionStatus.set('authenticated');
  $user.set(user);
}

export function setGuest() {
  $sessionStatus.set('guest');
  $user.set(null);
}
```
