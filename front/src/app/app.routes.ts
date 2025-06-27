import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const appRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES),
  },
  {
    path: 'users',
    canActivate: [authGuard],
    loadChildren: () => import('./features/users/users.routes').then(m => m.USERS_ROUTES)
  }
];
