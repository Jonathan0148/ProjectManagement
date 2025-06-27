import { Routes } from '@angular/router';
import { CommonLayoutComponent } from '../../layouts/common-layout/common-layout.component';
import { authGuard } from '../../core/guards/auth.guard';

export const BOARD_ROUTES: Routes = [
  {
    path: '',
    component: CommonLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./components/board/board.component').then(m => m.BoardComponent)
      }
    ]
  }
];
