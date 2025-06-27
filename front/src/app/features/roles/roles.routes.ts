import { Routes } from '@angular/router';
import { CommonLayoutComponent } from '../../layouts/common-layout/common-layout.component';
import { authGuard } from '../../core/guards/auth.guard';

export const ROLES_ROUTES: Routes = [
  {
    path: '',
    component: CommonLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./components/role-list/roles-list.component').then(m => m.RoleListComponent)
      },
      {
        path: 'form',
        loadComponent: () => import('./components/role-form/roles-form.component').then(m => m.RoleFormComponent)
      },
      {
        path: 'form/view/:id',
        loadComponent: () => import('./components/role-form/roles-form.component').then(m => m.RoleFormComponent)
      },
      {
        path: 'form/edit/:id',
        loadComponent: () => import('./components/role-form/roles-form.component').then(m => m.RoleFormComponent)
      }
    ]
  }
];

