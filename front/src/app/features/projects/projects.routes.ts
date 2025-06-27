import { Routes } from '@angular/router';
import { CommonLayoutComponent } from '../../layouts/common-layout/common-layout.component';
import { authGuard } from '../../core/guards/auth.guard';

export const PROJECTS_ROUTES: Routes = [
  {
    path: '',
    component: CommonLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./components/projects-list/projects-list.component').then(m => m.ProjectsListComponent)
      },
      {
        path: 'form',
        loadComponent: () => import('./components/projects-form/projects-form.component').then(m => m.ProjectFormComponent)
      },
      {
        path: 'form/view/:id',
        loadComponent: () => import('./components/projects-form/projects-form.component').then(m => m.ProjectFormComponent)
      },
      {
        path: 'form/edit/:id',
        loadComponent: () => import('./components/projects-form/projects-form.component').then(m => m.ProjectFormComponent)
      }
    ]
  }
];

