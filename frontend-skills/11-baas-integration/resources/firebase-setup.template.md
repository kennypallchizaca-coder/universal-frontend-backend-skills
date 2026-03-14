# Firebase & Firestore Matrix

Use the official SDK and keep privileged logic behind security rules or server-side functions.

Security rules:
- Client config values can be public.
- Service-account credentials and admin SDK usage must stay server-side.
- Sensitive writes should be protected by Firestore Rules, App Check, Cloud Functions, or equivalent server controls.

---

## AngularFire

Filename: `src/app/app.config.ts`
```typescript
import { ApplicationConfig } from '@angular/core';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
};
```

Filename: `src/app/core/services/firebase/auth.service.ts`
```typescript
import { Injectable, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, user } from '@angular/fire/auth';
import { from } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);

  user$ = user(this.auth);

  login(email: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  logout() {
    return from(signOut(this.auth));
  }
}
```

---

## React / Vue / Astro (Firebase SDK v9+)

Filename: `src/shared/baas/firebase.ts`
```typescript
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
```

Filename: `src/features/favorites/services/favorites.repository.ts`
```typescript
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '@/shared/baas/firebase';

interface FavoriteInput {
  productId: string;
  name: string;
}

const favoritesCollection = collection(db, 'favorites');

export const FavoritesRepository = {
  async findAll() {
    const snapshot = await getDocs(favoritesCollection);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  },

  async create(data: FavoriteInput) {
    return addDoc(favoritesCollection, data);
  },
};
```

Client-side warning:
- Do not put admin logic in this repository.
- Use Cloud Functions or your own backend for privileged operations.
