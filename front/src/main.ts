import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { appRoutes } from './app/app.routes';
import { provideNgxTranslate } from './app/core/translate/translate.providers';

import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { icons } from './app/icons';
import { responseInterceptor } from './app/core/interceptors/response.interceptor';
import { AUTH_CONFIG } from './app/features/auth/auth.config';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([responseInterceptor])),
    provideAnimations(),
    provideRouter(appRoutes),
    provideNgxTranslate(),
    { provide: NZ_ICONS, useValue: icons },
    ...AUTH_CONFIG
  ]
});
