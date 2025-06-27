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
import { tokenInterceptor } from './app/core/interceptors/auth.interceptor';
import { CookieService } from 'ngx-cookie-service';
import { USERS_CONFIG } from './app/features/users/users.config';
import { SHARED_CONFIG } from './app/shared/shared.config';
import { PROJECTS_CONFIG } from './app/features/projects/projects.config';
import { BOARD_CONFIG } from './app/features/board/board.config';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([responseInterceptor, tokenInterceptor])),
    provideAnimations(),
    provideRouter(appRoutes),
    provideNgxTranslate(),
    { provide: NZ_ICONS, useValue: icons },
    CookieService,
    ...AUTH_CONFIG,
    ...USERS_CONFIG,
    ...SHARED_CONFIG,
    ...PROJECTS_CONFIG,
    ...BOARD_CONFIG
  ]
});
