import { Routes } from '@angular/router';
import { CommonLayoutComponent } from '../../layouts/common-layout/common-layout.component';
import { authGuard } from '../../core/guards/auth.guard';

export const USERS_ROUTES: Routes = [
  {
    path: '',
    component: CommonLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./components/user-list/user-list.component').then(m => m.UserListComponent)
      },
      {
        path: 'form',
        loadComponent: () => import('./components/user-form/user-form.component').then(m => m.UserFormComponent)
      },
      {
        path: 'form/view/:id',
        loadComponent: () => import('./components/user-form/user-form.component').then(m => m.UserFormComponent)
      },
      {
        path: 'form/edit/:id',
        loadComponent: () => import('./components/user-form/user-form.component').then(m => m.UserFormComponent)
      }
    ]
  }
];

