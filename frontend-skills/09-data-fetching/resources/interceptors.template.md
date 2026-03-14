# HTTP Interceptors Matrix

Interceptors are the professional place to centralize credentials, retries, normalization, and shared error handling.

Security preference:
- Prefer `httpOnly` secure cookies and `withCredentials` over tokens persisted in `localStorage`.
- If bearer tokens are required, keep them in controlled memory or a dedicated auth service, not ad-hoc component code.

---

## Axios (React, Vue, Astro, Node-compatible frontends)

Filename: `src/shared/api/api-client.ts`
```typescript
import axios from 'axios';
import { sessionController } from '@/shared/auth/session-controller';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  timeout: 10000,
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      sessionController.markGuest();
      window.location.assign('/auth/login');
    }

    return Promise.reject(error);
  }
);
```

Optional bearer-token request hook:
```typescript
apiClient.interceptors.request.use((config) => {
  const accessToken = authService.getAccessToken();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});
```

Usage in a repository:
```typescript
import { apiClient } from '@/shared/api/api-client';

export const UsersRepository = {
  async findAll() {
    const { data } = await apiClient.get('/users');
    return data;
  },
};
```

---

## Angular (Native HttpClient)

Filename: `src/shared/api/auth.interceptor.ts`
```typescript
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthStore } from '@/shared/stores/auth.store';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authStore = inject(AuthStore);

  const authReq = req.clone({
    withCredentials: true,
  });

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        authStore.setGuest();
        router.navigate(['/auth/login']);
      }

      return throwError(() => error);
    })
  );
};
```

Optional bearer-token variant:
```typescript
const accessToken = authService.getAccessToken();

const authReq = accessToken
  ? req.clone({
      withCredentials: true,
      setHeaders: { Authorization: `Bearer ${accessToken}` },
    })
  : req.clone({ withCredentials: true });
```

Activation:
Filename: `src/app/app.config.ts`
```typescript
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from '@/shared/api/auth.interceptor';

export const appConfig = {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
};
```
