import { Route } from '@angular/router';
import { authGuard, roleGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login';
import { NxWelcome } from './nx-welcome';

export const appRoutes: Route[] = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'admin',
    loadChildren: () => import('admin/Routes').then((m) => m!.remoteRoutes),
    canActivate: [roleGuard('admin')],
  },
  {
    path: 'profile',
    loadChildren: () => import('profile/Routes').then((m) => m!.remoteRoutes),
    canActivate: [authGuard],
  },
  {
    path: 'shop',
    loadChildren: () => import('shop/Routes').then((m) => m!.remoteRoutes),
    canActivate: [authGuard],
  },
  {
    path: 'mf_activity',
    loadChildren: () => import('mf_activity/Routes').then((m) => m!.remoteRoutes),
    canActivate: [authGuard],
  },
  {
    path: '',
    component: NxWelcome,
  },
];
