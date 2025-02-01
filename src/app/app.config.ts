import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { providePrimeNG } from 'primeng/config';

import { routes } from './app.routes';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { environment } from '../environments/environment';
import CustomTheme from './customeTheme';

export const appConfig: ApplicationConfig = {
  providers: [{ provide: LocationStrategy, useClass: PathLocationStrategy },
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: CustomTheme,
        options: {
          darkModeSelector: false || 'none',
        },
      },
    }),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideDatabase(() => getDatabase()),
    provideAuth(() => getAuth()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
  ],
};
