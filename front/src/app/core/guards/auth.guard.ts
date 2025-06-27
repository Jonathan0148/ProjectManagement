import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { NzMessageService } from 'ng-zorro-antd/message';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const cookieService = inject(CookieService);
  const message = inject(NzMessageService);

  const token = cookieService.get('token');

  if (token) {
    return true;
  } else {
    message.error('Acceso denegado. Inicia sesión primero.');
    router.navigate(['/']);
    return false;
  }
};
